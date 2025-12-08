<?php
if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) die();

use \Bitrix\Main\Loader;
use \Bitrix\Main\Localization\Loc;
use \Bitrix\Iblock\Elements\ElementNewsTable;

class ApiNewsList extends \CBitrixComponent
{
    public function executeComponent() {
        if (!Loader::includeModule('iblock')) {
            ShowError("Модуль Информационных блоков не установлен");
            return;
        }

        if (!class_exists('\Bitrix\Iblock\Elements\ElementNewsTable')) {
            ShowError("Класс ElementNewsTable не найден. Укажите 'News' в поле 'Символьный код API' в настройках инфоблока.");
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

        $this->includeComponentTemplate();
    }
}