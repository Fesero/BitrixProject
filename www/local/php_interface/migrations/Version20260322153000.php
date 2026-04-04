<?php

namespace Sprint\Migration;

use Bitrix\Catalog\GroupTable;
use Bitrix\Main\Config\Option;
use Bitrix\Main\Loader;
use CIBlock;
use CIBlockElement;
use CIBlockProperty;
use CIBlockPropertyEnum;
use CIBlockSection;
use CPrice;
use CCatalogProduct;
use CCatalogStore;
use CCatalogStoreProduct;

class Version20260322153000 extends Version
{
    protected $author = "Fesero";

    private const OPTION_MODULE = 'main';
    private const OPTION_KEY = 'fes24_catalog_seed_v1';

    private const CATALOG_IBLOCK_ID = 2;
    private const CATALOG_IBLOCK_TYPE = 'catalog';
    private const CATALOG_IBLOCK_CODE = 'catalog';

    private const DEFAULT_STORE_TITLE = 'Основной склад FES-24';
    private const DEFAULT_CURRENCY = 'RUB';

    public function getDescription(): string
    {
        return 'FES-24: заполнение каталога тестовыми данными для smart filter / facet index / benchmark';
    }

    public function up(): void
    {
        $this->includeModules();

        $iblockId = $this->resolveCatalogIblockId();

        if ($iblockId <= 0) {
            throw new \RuntimeException('Не удалось определить ID каталожного инфоблока. Заполни CATALOG_IBLOCK_ID или CATALOG_IBLOCK_CODE/CATALOG_IBLOCK_TYPE.');
        }

        $state = [
            'iblock_id' => $iblockId,
            'created_section_ids' => [],
            'created_property_ids' => [],
            'created_element_ids' => [],
            'created_store_id' => null,
        ];

        $priceTypeId = $this->resolveBasePriceTypeId();
        $storeId = $this->ensureStore();
        if ($storeId > 0) {
            $state['created_store_id'] = $this->wasStoreCreated ? $storeId : null;
        }

        $properties = $this->ensureProperties($iblockId, $state);
        $sections = $this->ensureSections($iblockId, $state);

        $catalogBlueprint = $this->getCatalogBlueprint();

        foreach ($catalogBlueprint as $sectionName => $sectionConfig) {
            if (!isset($sections[$sectionName])) {
                continue;
            }

            $sectionId = (int)$sections[$sectionName]['ID'];

            foreach ($sectionConfig['items'] as $index => $itemName) {
                $xmlId = $this->buildElementXmlId($sectionName, $itemName, $index);

                $price = $this->buildPrice(
                    (float)$sectionConfig['price_min'],
                    (float)$sectionConfig['price_max'],
                    $index
                );

                $quantity = $this->buildQuantity($index);

                $propertyValues = $this->buildPropertyValues(
                    $properties,
                    $sectionConfig,
                    $index
                );

                $elementId = $this->upsertProduct(
                    iblockId: $iblockId,
                    sectionId: $sectionId,
                    xmlId: $xmlId,
                    name: $itemName,
                    sectionName: $sectionName,
                    price: $price,
                    quantity: $quantity,
                    propertyValues: $propertyValues
                );

                if ($elementId <= 0) {
                    throw new \RuntimeException('Не удалось создать товар: ' . $itemName);
                }

                if (!in_array($elementId, $state['created_element_ids'], true)) {
                    $state['created_element_ids'][] = $elementId;
                }

                $this->upsertCatalogProduct($elementId, $quantity);
                $this->upsertBasePrice($elementId, $priceTypeId, $price);

                if ($storeId > 0) {
                    $this->upsertStoreAmount($elementId, $storeId, $quantity);
                }
            }
        }

        $this->saveState($state);
    }

    public function down(): void
    {
        $this->includeModules();

        $state = $this->loadState();

        if (empty($state)) {
            $this->out('State не найден. Откатывать нечего.');
            return;
        }

        if (!empty($state['created_element_ids'])) {
            foreach (array_reverse($state['created_element_ids']) as $elementId) {
                \CIBlockElement::Delete((int)$elementId);
            }
        }

        if (!empty($state['created_property_ids'])) {
            foreach (array_reverse($state['created_property_ids']) as $propertyId) {
                $property = new \CIBlockProperty();
                $property->Delete((int)$propertyId);
            }
        }

        if (!empty($state['created_section_ids'])) {
            foreach (array_reverse($state['created_section_ids']) as $sectionId) {
                \CIBlockSection::Delete((int)$sectionId);
            }
        }

        if (!empty($state['created_store_id']) && class_exists(CCatalogStore::class)) {
            CCatalogStore::Delete((int)$state['created_store_id']);
        }

        Option::delete(self::OPTION_MODULE, ['name' => self::OPTION_KEY]);
    }

    private bool $wasStoreCreated = false;

    private function includeModules(): void
    {
        if (!Loader::includeModule('iblock')) {
            throw new \RuntimeException('Не подключен модуль iblock');
        }

        if (!Loader::includeModule('catalog')) {
            throw new \RuntimeException('Не подключен модуль catalog');
        }
    }

    private function resolveCatalogIblockId(): int
    {
        if (self::CATALOG_IBLOCK_ID > 0) {
            return self::CATALOG_IBLOCK_ID;
        }

        $res = CIBlock::GetList(
            [],
            [
                'TYPE' => self::CATALOG_IBLOCK_TYPE,
                'CODE' => self::CATALOG_IBLOCK_CODE,
                'CHECK_PERMISSIONS' => 'N',
            ]
        );

        $row = $res->Fetch();

        return $row ? (int)$row['ID'] : 0;
    }

    private function resolveBasePriceTypeId(): int
    {
        $row = GroupTable::getList([
            'filter' => ['=BASE' => 'Y'],
            'select' => ['ID'],
            'limit' => 1,
        ])->fetch();

        if (!$row) {
            throw new \RuntimeException('Не найден базовый тип цены');
        }

        return (int)$row['ID'];
    }

    private function ensureStore(): int
    {
        if (!class_exists(CCatalogStore::class)) {
            return 0;
        }

        $res = CCatalogStore::GetList(
            ['ID' => 'ASC'],
            ['TITLE' => self::DEFAULT_STORE_TITLE],
            false,
            false,
            ['ID', 'TITLE']
        );

        if ($row = $res->Fetch()) {
            $this->wasStoreCreated = false;
            return (int)$row['ID'];
        }

        $store = new CCatalogStore();
        $storeId = (int)$store->Add([
            'TITLE' => self::DEFAULT_STORE_TITLE,
            'ACTIVE' => 'Y',
            'ADDRESS' => 'Тестовый склад для FES-24',
            'GPS_N' => '',
            'GPS_S' => '',
            'DESCRIPTION' => 'Создано миграцией для наполнения каталога данными под smart filter / facet index',
        ]);

        if ($storeId > 0) {
            $this->wasStoreCreated = true;
        }

        return $storeId;
    }

    private function ensureProperties(int $iblockId, array &$state): array
    {
        $definitions = [
            'BRAND' => [
                'NAME' => 'Бренд',
                'PROPERTY_TYPE' => 'L',
                'VALUES' => ['Urban Pulse', 'Nordline', 'Mono Studio', 'Street Loom', 'Aster Wear', 'Silk Route'],
                'DISPLAY_TYPE' => 'F',
            ],
            'MANUFACTURER' => [
                'NAME' => 'Производитель',
                'PROPERTY_TYPE' => 'L',
                'VALUES' => ['Россия', 'Турция', 'Китай', 'Индия', 'Узбекистан', 'Беларусь'],
                'DISPLAY_TYPE' => 'F',
            ],
            'MATERIAL' => [
                'NAME' => 'Материал',
                'PROPERTY_TYPE' => 'L',
                'VALUES' => ['Хлопок', 'Полиэстер', 'Лён', 'Вискоза', 'Шерсть', 'Эластан', 'Искусственная кожа'],
                'DISPLAY_TYPE' => 'F',
            ],
            'COLOR' => [
                'NAME' => 'Цвет',
                'PROPERTY_TYPE' => 'L',
                'VALUES' => ['Черный', 'Белый', 'Синий', 'Красный', 'Зеленый', 'Серый', 'Бежевый', 'Фиолетовый'],
                'DISPLAY_TYPE' => 'F',
            ],
            'SIZE' => [
                'NAME' => 'Размер',
                'PROPERTY_TYPE' => 'L',
                'VALUES' => ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
                'DISPLAY_TYPE' => 'F',
            ],
            'SEASON' => [
                'NAME' => 'Сезон',
                'PROPERTY_TYPE' => 'L',
                'VALUES' => ['Лето', 'Осень', 'Зима', 'Весна', 'Демисезон'],
                'DISPLAY_TYPE' => 'F',
            ],
            'GENDER' => [
                'NAME' => 'Пол',
                'PROPERTY_TYPE' => 'L',
                'VALUES' => ['Женский', 'Мужской', 'Унисекс'],
                'DISPLAY_TYPE' => 'F',
            ],
        ];

        $result = [];

        foreach ($definitions as $code => $definition) {
            $property = $this->findProperty($iblockId, $code);

            if (!$property) {
                $propertyObject = new CIBlockProperty();

                $propertyId = (int)$propertyObject->Add([
                    'IBLOCK_ID' => $iblockId,
                    'NAME' => $definition['NAME'],
                    'ACTIVE' => 'Y',
                    'SORT' => 100,
                    'CODE' => $code,
                    'PROPERTY_TYPE' => $definition['PROPERTY_TYPE'],
                    'MULTIPLE' => 'N',
                    'FILTRABLE' => 'Y',
                    'SMART_FILTER' => 'Y',
                    'DISPLAY_TYPE' => $definition['DISPLAY_TYPE'],
                    'DISPLAY_EXPANDED' => 'N',
                    'IS_REQUIRED' => 'N',
                    'WITH_DESCRIPTION' => 'N',
                ]);

                if ($propertyId <= 0) {
                    throw new \RuntimeException('Не удалось создать свойство ' . $code . ': ' . $propertyObject->LAST_ERROR);
                }

                $state['created_property_ids'][] = $propertyId;
                $property = $this->findProperty($iblockId, $code);
            } else {
                $propertyObject = new CIBlockProperty();
                $propertyObject->Update((int)$property['ID'], [
                    'FILTRABLE' => 'Y',
                    'SMART_FILTER' => 'Y',
                    'DISPLAY_TYPE' => $definition['DISPLAY_TYPE'],
                ]);
            }

            $enumMap = [];
            if ($definition['PROPERTY_TYPE'] === 'L') {
                $enumMap = $this->ensurePropertyEnums((int)$property['ID'], $definition['VALUES']);
            }

            $result[$code] = [
                'ID' => (int)$property['ID'],
                'CODE' => $code,
                'ENUM_MAP' => $enumMap,
            ];
        }

        return $result;
    }

    private function findProperty(int $iblockId, string $code): ?array
    {
        $res = CIBlockProperty::GetList(
            ['SORT' => 'ASC', 'ID' => 'ASC'],
            [
                'IBLOCK_ID' => $iblockId,
                'CODE' => $code,
                'CHECK_PERMISSIONS' => 'N',
            ]
        );

        $row = $res->Fetch();

        return $row ?: null;
    }

    private function ensurePropertyEnums(int $propertyId, array $values): array
    {
        $current = [];
        $enumRes = CIBlockPropertyEnum::GetList(
            ['SORT' => 'ASC', 'ID' => 'ASC'],
            ['PROPERTY_ID' => $propertyId]
        );

        while ($enum = $enumRes->Fetch()) {
            $current[$enum['VALUE']] = (int)$enum['ID'];
        }

        $enumObject = new CIBlockPropertyEnum();

        foreach ($values as $sort => $value) {
            if (!isset($current[$value])) {
                $enumId = (int)$enumObject->Add([
                    'PROPERTY_ID' => $propertyId,
                    'VALUE' => $value,
                    'DEF' => 'N',
                    'SORT' => ($sort + 1) * 100,
                ]);

                if ($enumId <= 0) {
                    throw new \RuntimeException('Не удалось создать enum "' . $value . '" для свойства ID=' . $propertyId);
                }

                $current[$value] = $enumId;
            }
        }

        return $current;
    }

    private function ensureSections(int $iblockId, array &$state): array
    {
        $sectionNames = [
            'Обувь',
            'Платья',
            'Штаны',
            'Нижнее белье',
            'Футболки',
            'Спортивная одежда',
            'Аксессуары',
        ];

        $result = [];

        foreach ($sectionNames as $index => $sectionName) {
            $section = $this->findSectionByName($iblockId, $sectionName);

            if (!$section) {
                $sectionObject = new CIBlockSection();

                $sectionId = (int)$sectionObject->Add([
                    'IBLOCK_ID' => $iblockId,
                    'NAME' => $sectionName,
                    'ACTIVE' => 'Y',
                    'SORT' => ($index + 1) * 100,
                    'CODE' => $this->slugify($sectionName),
                    'XML_ID' => 'fes24_section_' . $this->slugify($sectionName),
                ]);

                if ($sectionId <= 0) {
                    throw new \RuntimeException('Не удалось создать раздел "' . $sectionName . '": ' . $sectionObject->LAST_ERROR);
                }

                $state['created_section_ids'][] = $sectionId;
                $section = $this->findSectionById($sectionId);
            }

            if ($section) {
                $result[$sectionName] = $section;
            }
        }

        return $result;
    }

    private function findSectionByName(int $iblockId, string $name): ?array
    {
        $res = CIBlockSection::GetList(
            ['SORT' => 'ASC', 'ID' => 'ASC'],
            [
                'IBLOCK_ID' => $iblockId,
                '=NAME' => $name,
                'GLOBAL_ACTIVE' => 'Y',
            ],
            false,
            ['ID', 'IBLOCK_ID', 'NAME', 'CODE', 'XML_ID']
        );

        $row = $res->Fetch();

        return $row ?: null;
    }

    private function findSectionById(int $sectionId): ?array
    {
        $res = CIBlockSection::GetList(
            [],
            ['ID' => $sectionId],
            false,
            ['ID', 'IBLOCK_ID', 'NAME', 'CODE', 'XML_ID']
        );

        $row = $res->Fetch();

        return $row ?: null;
    }

    private function getCatalogBlueprint(): array
    {
        return [
            'Платья' => [
                'price_min' => 1900,
                'price_max' => 11900,
                'colors' => ['Черный', 'Белый', 'Синий', 'Красный', 'Бежевый', 'Фиолетовый'],
                'materials' => ['Хлопок', 'Вискоза', 'Полиэстер', 'Лён'],
                'brands' => ['Urban Pulse', 'Aster Wear', 'Mono Studio'],
                'manufacturers' => ['Россия', 'Турция', 'Китай'],
                'sizes' => ['XS', 'S', 'M', 'L', 'XL'],
                'seasons' => ['Лето', 'Весна', 'Демисезон'],
                'gender' => ['Женский'],
                'items' => [
                    'Платье Городской Ритм',
                    'Платье Весенняя Легкость',
                    'Платье Ночная Жизнь',
                    'Платье Речной Бриз',
                    'Платье Лавандовый Свет',
                    'Платье Модница на Прогулке',
                    'Платье Северное Сияние',
                    'Платье Мягкий Контур',
                    'Платье Солнечный Полдень',
                    'Платье Вечерний Акцент',
                    'Платье Тихий Бульвар',
                    'Платье Летний Импульс',
                    'Платье Глубокий Индиго',
                    'Платье Акварель',
                    'Платье Форма Движения',
                    'Платье Бархатный Ритм',
                ],
            ],
            'Штаны' => [
                'price_min' => 123,
                'price_max' => 4900,
                'colors' => ['Черный', 'Синий', 'Красный', 'Зеленый', 'Серый', 'Бежевый'],
                'materials' => ['Хлопок', 'Лён', 'Вискоза', 'Полиэстер', 'Эластан'],
                'brands' => ['Street Loom', 'Nordline', 'Silk Route'],
                'manufacturers' => ['Индия', 'Китай', 'Турция', 'Россия'],
                'sizes' => ['S', 'M', 'L', 'XL', 'XXL'],
                'seasons' => ['Лето', 'Весна', 'Осень', 'Демисезон'],
                'gender' => ['Женский', 'Унисекс'],
                'items' => [
                    'Штаны Полосатый Рейс',
                    'Штаны Жизнь в Абстракции',
                    'Штаны Цветочная Поляна',
                    'Штаны Морская Волна',
                    'Штаны Восточный Сад',
                    'Штаны Свободный Контур',
                    'Штаны Городской Поток',
                    'Штаны Красный Ритм',
                    'Штаны Синий Шторм',
                    'Штаны Песочный Берег',
                    'Штаны Пульс Движения',
                    'Штаны Яркий Акцент',
                    'Штаны Пространство Танца',
                    'Штаны Этно Вектор',
                    'Штаны Свежий Ветер',
                    'Штаны Теплый Закат',
                ],
            ],
            'Футболки' => [
                'price_min' => 790,
                'price_max' => 3990,
                'colors' => ['Черный', 'Белый', 'Синий', 'Красный', 'Зеленый', 'Серый'],
                'materials' => ['Хлопок', 'Полиэстер', 'Эластан'],
                'brands' => ['Urban Pulse', 'Street Loom', 'Mono Studio'],
                'manufacturers' => ['Россия', 'Китай', 'Узбекистан'],
                'sizes' => ['S', 'M', 'L', 'XL', 'XXL'],
                'seasons' => ['Лето', 'Весна'],
                'gender' => ['Мужской', 'Женский', 'Унисекс'],
                'items' => [
                    'Футболка Базовый Ритм',
                    'Футболка Светлый Контур',
                    'Футболка Город без Паузы',
                    'Футболка Точка Фокуса',
                    'Футболка Дневной Маршрут',
                    'Футболка Белый Шум',
                    'Футболка Графитовый Тон',
                    'Футболка Красный Импульс',
                    'Футболка Линия Горизонта',
                    'Футболка Чистая Форма',
                    'Футболка Спокойный Темп',
                    'Футболка Теплый Контраст',
                    'Футболка Mono Everyday',
                    'Футболка Urban Frame',
                ],
            ],
            'Спортивная одежда' => [
                'price_min' => 1490,
                'price_max' => 8990,
                'colors' => ['Черный', 'Синий', 'Красный', 'Серый', 'Зеленый'],
                'materials' => ['Полиэстер', 'Эластан', 'Хлопок'],
                'brands' => ['Nordline', 'Urban Pulse', 'Aster Wear'],
                'manufacturers' => ['Китай', 'Турция', 'Россия'],
                'sizes' => ['S', 'M', 'L', 'XL'],
                'seasons' => ['Зима', 'Осень', 'Весна', 'Демисезон'],
                'gender' => ['Мужской', 'Женский', 'Унисекс'],
                'items' => [
                    'Худи Северный Темп',
                    'Олимпийка Вектор Скорости',
                    'Леггинсы Пульс Формы',
                    'Спортивные Брюки Trail Motion',
                    'Толстовка Core Move',
                    'Джоггеры Active Frame',
                    'Куртка Dynamic Layer',
                    'Свитшот Gravity Run',
                    'Комплект Sprint Focus',
                    'Анорак Wind Track',
                    'Майка Fit Line',
                    'Шорты Quick Step',
                ],
            ],
            'Обувь' => [
                'price_min' => 2190,
                'price_max' => 13990,
                'colors' => ['Черный', 'Белый', 'Синий', 'Красный', 'Бежевый', 'Серый'],
                'materials' => ['Искусственная кожа', 'Полиэстер', 'Хлопок', 'Эластан'],
                'brands' => ['Nordline', 'Street Loom', 'Urban Pulse'],
                'manufacturers' => ['Китай', 'Россия', 'Турция'],
                'sizes' => ['S', 'M', 'L', 'XL'],
                'seasons' => ['Лето', 'Осень', 'Зима', 'Весна'],
                'gender' => ['Мужской', 'Женский', 'Унисекс'],
                'items' => [
                    'Кроссовки Day Runner',
                    'Кеды Street Habit',
                    'Кроссовки Air Motion',
                    'Слипоны Easy Step',
                    'Ботинки North Gate',
                    'Кроссовки Pulse Ride',
                    'Кеды Mono Walk',
                    'Ботинки Urban Edge',
                    'Кроссовки Red Shift',
                    'Кеды Clean Tone',
                ],
            ],
            'Нижнее белье' => [
                'price_min' => 490,
                'price_max' => 3490,
                'colors' => ['Черный', 'Белый', 'Красный', 'Бежевый', 'Серый'],
                'materials' => ['Хлопок', 'Полиэстер', 'Эластан', 'Вискоза'],
                'brands' => ['Aster Wear', 'Mono Studio', 'Silk Route'],
                'manufacturers' => ['Китай', 'Турция', 'Беларусь'],
                'sizes' => ['XS', 'S', 'M', 'L', 'XL'],
                'seasons' => ['Лето', 'Весна', 'Осень', 'Зима'],
                'gender' => ['Женский', 'Мужской'],
                'items' => [
                    'Комплект Soft Balance',
                    'Топ Second Skin',
                    'Бралетт Velvet Touch',
                    'Боксеры Daily Fit',
                    'Трусы Cotton Base',
                    'Комплект Evening Silence',
                    'Бюстье Light Shape',
                    'Трусы Minimal Form',
                    'Боксеры Mono Core',
                    'Комплект Soft Motion',
                ],
            ],
            'Аксессуары' => [
                'price_min' => 390,
                'price_max' => 5990,
                'colors' => ['Черный', 'Белый', 'Синий', 'Красный', 'Зеленый', 'Бежевый', 'Серый'],
                'materials' => ['Хлопок', 'Полиэстер', 'Лён', 'Искусственная кожа'],
                'brands' => ['Mono Studio', 'Urban Pulse', 'Silk Route'],
                'manufacturers' => ['Китай', 'Индия', 'Россия', 'Турция'],
                'sizes' => ['S', 'M', 'L'],
                'seasons' => ['Лето', 'Осень', 'Зима', 'Весна', 'Демисезон'],
                'gender' => ['Унисекс'],
                'items' => [
                    'Рюкзак Daily Grid',
                    'Сумка City Fold',
                    'Ремень Urban Accent',
                    'Панама Summer Shade',
                    'Шарф Northern Air',
                    'Кепка Mono Cap',
                    'Сумка Soft Form',
                    'Рюкзак Track Pack',
                    'Ремень Line Detail',
                    'Шапка Cold Layer',
                ],
            ],
        ];
    }

    private function buildElementXmlId(string $sectionName, string $itemName, int $index): string
    {
        return 'fes24_' . $this->slugify($sectionName) . '_' . $this->slugify($itemName) . '_' . $index;
    }

    private function buildPrice(float $min, float $max, int $index): float
    {
        if ($max <= $min) {
            return $min;
        }

        $steps = 11;
        $step = ($max - $min) / $steps;
        $price = $min + ($step * ($index % ($steps + 1)));

        return round($price, 2);
    }

    private function buildQuantity(int $index): float
    {
        return match ($index % 8) {
            0 => 0,
            1 => 1,
            2 => 2,
            3 => 4,
            4 => 7,
            5 => 11,
            6 => 15,
            default => 23,
        };
    }

    private function buildPropertyValues(array $properties, array $sectionConfig, int $index): array
    {
        $brand = $sectionConfig['brands'][$index % count($sectionConfig['brands'])];
        $manufacturer = $sectionConfig['manufacturers'][$index % count($sectionConfig['manufacturers'])];
        $material = $sectionConfig['materials'][$index % count($sectionConfig['materials'])];
        $color = $sectionConfig['colors'][$index % count($sectionConfig['colors'])];
        $size = $sectionConfig['sizes'][$index % count($sectionConfig['sizes'])];
        $season = $sectionConfig['seasons'][$index % count($sectionConfig['seasons'])];
        $gender = $sectionConfig['gender'][$index % count($sectionConfig['gender'])];

        return [
            'BRAND' => $properties['BRAND']['ENUM_MAP'][$brand] ?? null,
            'MANUFACTURER' => $properties['MANUFACTURER']['ENUM_MAP'][$manufacturer] ?? null,
            'MATERIAL' => $properties['MATERIAL']['ENUM_MAP'][$material] ?? null,
            'COLOR' => $properties['COLOR']['ENUM_MAP'][$color] ?? null,
            'SIZE' => $properties['SIZE']['ENUM_MAP'][$size] ?? null,
            'SEASON' => $properties['SEASON']['ENUM_MAP'][$season] ?? null,
            'GENDER' => $properties['GENDER']['ENUM_MAP'][$gender] ?? null,
        ];
    }

    private function upsertProduct(
        int $iblockId,
        int $sectionId,
        string $xmlId,
        string $name,
        string $sectionName,
        float $price,
        float $quantity,
        array $propertyValues
    ): int {
        $existingId = $this->findElementIdByXmlId($iblockId, $xmlId);

        $article = strtoupper(substr(md5($xmlId), 0, 10));

        $fields = [
            'IBLOCK_ID' => $iblockId,
            'IBLOCK_SECTION_ID' => $sectionId,
            'NAME' => $name,
            'XML_ID' => $xmlId,
            'CODE' => $this->slugify($name . '-' . $article),
            'ACTIVE' => 'Y',
            'SORT' => 100,
            'PREVIEW_TEXT' => $this->buildPreviewText($name, $sectionName),
            'PREVIEW_TEXT_TYPE' => 'text',
            'DETAIL_TEXT' => $this->buildDetailText($name, $sectionName, $price, $quantity),
            'DETAIL_TEXT_TYPE' => 'html',
            'PROPERTY_VALUES' => array_filter($propertyValues, static fn ($value) => $value !== null),
        ];

        $element = new CIBlockElement();

        if ($existingId > 0) {
            $ok = $element->Update($existingId, $fields);
            if (!$ok) {
                throw new \RuntimeException('Ошибка обновления товара "' . $name . '": ' . $element->LAST_ERROR);
            }

            \CIBlockElement::SetPropertyValuesEx($existingId, $iblockId, array_filter($propertyValues, static fn ($value) => $value !== null));

            return $existingId;
        }

        $elementId = (int)$element->Add($fields);

        if ($elementId <= 0) {
            throw new \RuntimeException('Ошибка создания товара "' . $name . '": ' . $element->LAST_ERROR);
        }

        \CIBlockElement::SetPropertyValuesEx($elementId, $iblockId, array_filter($propertyValues, static fn ($value) => $value !== null));

        return $elementId;
    }

    private function findElementIdByXmlId(int $iblockId, string $xmlId): int
    {
        $res = CIBlockElement::GetList(
            [],
            [
                'IBLOCK_ID' => $iblockId,
                '=XML_ID' => $xmlId,
                'CHECK_PERMISSIONS' => 'N',
            ],
            false,
            false,
            ['ID']
        );

        $row = $res->Fetch();

        return $row ? (int)$row['ID'] : 0;
    }

    private function upsertCatalogProduct(int $productId, float $quantity): void
    {
        $fields = [
            'ID' => $productId,
            'QUANTITY' => $quantity,
            'QUANTITY_TRACE' => 'Y',
            'CAN_BUY_ZERO' => 'N',
            'NEGATIVE_AMOUNT_TRACE' => 'N',
            'SUBSCRIBE' => 'N',
            'AVAILABLE' => $quantity > 0 ? 'Y' : 'N',
            'TYPE' => \Bitrix\Catalog\ProductTable::TYPE_PRODUCT,
        ];

        $existing = CCatalogProduct::GetByID($productId);

        if ($existing) {
            CCatalogProduct::Update($productId, $fields);
            return;
        }

        CCatalogProduct::Add($fields);
    }

    private function upsertBasePrice(int $productId, int $priceTypeId, float $price): void
    {
        $res = CPrice::GetList(
            [],
            [
                'PRODUCT_ID' => $productId,
                'CATALOG_GROUP_ID' => $priceTypeId,
            ]
        );

        if ($row = $res->Fetch()) {
            CPrice::Update((int)$row['ID'], [
                'PRODUCT_ID' => $productId,
                'CATALOG_GROUP_ID' => $priceTypeId,
                'PRICE' => $price,
                'CURRENCY' => self::DEFAULT_CURRENCY,
            ]);
            return;
        }

        CPrice::Add([
            'PRODUCT_ID' => $productId,
            'CATALOG_GROUP_ID' => $priceTypeId,
            'PRICE' => $price,
            'CURRENCY' => self::DEFAULT_CURRENCY,
        ]);
    }

    private function upsertStoreAmount(int $productId, int $storeId, float $quantity): void
    {
        if (!class_exists(CCatalogStoreProduct::class)) {
            return;
        }

        $res = CCatalogStoreProduct::GetList(
            [],
            [
                'PRODUCT_ID' => $productId,
                'STORE_ID' => $storeId,
            ],
            false,
            false,
            ['ID', 'AMOUNT']
        );

        if ($row = $res->Fetch()) {
            CCatalogStoreProduct::Update((int)$row['ID'], [
                'PRODUCT_ID' => $productId,
                'STORE_ID' => $storeId,
                'AMOUNT' => $quantity,
            ]);
            return;
        }

        CCatalogStoreProduct::Add([
            'PRODUCT_ID' => $productId,
            'STORE_ID' => $storeId,
            'AMOUNT' => $quantity,
        ]);
    }

    private function buildPreviewText(string $name, string $sectionName): string
    {
        return sprintf(
            '%s из раздела "%s". Тестовый товар для FES-24: фасетный индекс, smart filter, benchmark, остатки и цены.',
            $name,
            $sectionName
        );
    }

    private function buildDetailText(string $name, string $sectionName, float $price, float $quantity): string
    {
        $availabilityText = $quantity > 0 ? 'В наличии' : 'Нет в наличии';

        return sprintf(
            '<p><strong>%s</strong> — тестовый товар раздела "%s".</p><p>Создан миграцией для обучения работе с каталогом, фильтрацией, фасетными индексами и переиндексацией.</p><p>Текущая цена: <strong>%s ₽</strong>.</p><p>Статус остатков: <strong>%s</strong>.</p>',
            htmlspecialcharsbx($name),
            htmlspecialcharsbx($sectionName),
            number_format($price, 0, '.', ' '),
            $availabilityText
        );
    }

    private function slugify(string $value): string
    {
        $value = trim($value);
        $value = mb_strtolower($value);

        $map = [
            'а' => 'a', 'б' => 'b', 'в' => 'v', 'г' => 'g', 'д' => 'd',
            'е' => 'e', 'ё' => 'e', 'ж' => 'zh', 'з' => 'z', 'и' => 'i',
            'й' => 'y', 'к' => 'k', 'л' => 'l', 'м' => 'm', 'н' => 'n',
            'о' => 'o', 'п' => 'p', 'р' => 'r', 'с' => 's', 'т' => 't',
            'у' => 'u', 'ф' => 'f', 'х' => 'h', 'ц' => 'ts', 'ч' => 'ch',
            'ш' => 'sh', 'щ' => 'sch', 'ъ' => '', 'ы' => 'y', 'ь' => '',
            'э' => 'e', 'ю' => 'yu', 'я' => 'ya',
        ];

        $value = strtr($value, $map);
        $value = preg_replace('/[^a-z0-9]+/u', '-', $value);
        $value = trim((string)$value, '-');

        return $value ?: 'item';
    }

    private function saveState(array $state): void
    {
        Option::set(
            self::OPTION_MODULE,
            self::OPTION_KEY,
            json_encode($state, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES)
        );
    }

    private function loadState(): array
    {
        $raw = Option::get(self::OPTION_MODULE, self::OPTION_KEY, '');

        if ($raw === '') {
            return [];
        }

        $decoded = json_decode($raw, true);

        return is_array($decoded) ? $decoded : [];
    }
}
