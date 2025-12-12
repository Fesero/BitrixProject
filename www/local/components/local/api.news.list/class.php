<?php

if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) {
    die();
}

use Bitrix\Main\Loader;
use Bitrix\Iblock\Elements\ElementNewsTable;

class ApiNewsList extends \CBitrixComponent
{
    public function executeComponent()
    {
        if (!Loader::includeModule('iblock')) {
            ShowError("Модуль Информационных блоков не установлен");
            return;
        }

        if (!class_exists('\Bitrix\Iblock\Elements\ElementNewsTable')) {
            ShowError("Класс ElementNewsTable не найден. Укажите 'News' в поле 'Символьный код API' в настройках инфоблока.");
            return;
        }

        $cacheTime = $this->arParams['CACHE_TIME'] ?? 3600;
        $cacheId = 'api_news_list_v1';
        $cachePath = $this->getCachePath();

        if ($this->startResultCache($cacheTime, $cacheId, $cachePath)) {

            if (!class_exists('\Bitrix\Iblock\Elements\ElementNewsTable')) {
                $this->abortResultCache();
                ShowError("ORM Class not found");
                return;
            }

            $query = ElementNewsTable::query()
                ->setSelect(['ID', 'NAME', 'ACTIVE_FROM', 'PREVIEW_TEXT'])
                ->setOrder(['ACTIVE_FROM' => 'DESC'])
                ->setLimit(10)
                ->setCacheTtl(3600); // Кэшируем запрос на час

            $collection = $query->exec()->fetchCollection();

            $this->arResult['ITEMS'] = [];

            foreach ($collection as $item) {
                $this->arResult['ITEMS'][] = [
                    'ID' => $item->getId(),
                    'NAME' => $item->getName(),
                    'DATE_OBJ' => $item->getActiveFrom(),
                    'PREVIEW_TEXT' => $item->getPreviewText(),
                ];
            }

            $entity = ElementNewsTable::getEntity();
            $iblockId = $entity->getIblockId();

            if (defined('BX_COMP_MANAGED_CACHE')) {
                $taggedCache = \Bitrix\Main\Application::getInstance()->getTaggedCache();
                $taggedCache->startTagCache($this->getCachePath());
                $taggedCache->registerTag('iblock_id_' . $iblockId);
                $taggedCache->endTagCache();
            }

            $this->includeComponentTemplate();
        }
    }
}
