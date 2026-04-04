<?php
if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) {
    die();
}

$this->setFrameMode(true);

global $APPLICATION;

$sectionListParams = [
    "IBLOCK_TYPE" => $arParams["IBLOCK_TYPE"],
    "IBLOCK_ID" => $arParams["IBLOCK_ID"],
    "CACHE_TYPE" => $arParams["CACHE_TYPE"],
    "CACHE_TIME" => $arParams["CACHE_TIME"],
    "CACHE_GROUPS" => $arParams["CACHE_GROUPS"],
    "COUNT_ELEMENTS" => "N",
    "TOP_DEPTH" => $arParams["SECTION_TOP_DEPTH"],
    "SECTION_URL" => $arResult["FOLDER"] . $arResult["URL_TEMPLATES"]["section"],
    "VIEW_MODE" => "TEXT",
    "SHOW_PARENT_NAME" => "N",
    "HIDE_SECTION_NAME" => "N",
    "ADD_SECTIONS_CHAIN" => ($arParams["ADD_SECTIONS_CHAIN"] ?? ""),
];

$productsCountLabel = (int)($arParams["TOP_ELEMENT_COUNT"] ?? 24);
if ($productsCountLabel <= 0) {
    $productsCountLabel = 24;
}
?>

<section class="bf-catalog-page">
    <aside class="bf-catalog-page__sidebar">
        <div class="bf-catalog-sidebar">
            <h1 class="bf-catalog-sidebar__title">Каталог</h1>

            <div class="bf-catalog-filter">
                <div class="bf-catalog-filter__head">
                    <h2 class="bf-catalog-filter__title">Фильтры</h2>
                </div>

                <div class="bf-catalog-filter__group">
                    <div class="bf-catalog-filter__label">Категории</div>

                    <?php
                    $APPLICATION->IncludeComponent(
                        "bitrix:catalog.section.list",
                        "bf_catalog_sidebar",
                        $sectionListParams,
                        $component,
                        ["HIDE_ICONS" => "Y"]
                    );
?>
                </div>

                <div class="bf-catalog-filter__group">
                    <div class="bf-catalog-filter__label">Цена</div>

                    <div class="bf-filter-range">
                        <div class="bf-filter-range__track">
                            <span class="bf-filter-range__progress"></span>
                            <span class="bf-filter-range__thumb"></span>
                        </div>
                        <div class="bf-filter-range__values">$50 - $500</div>
                    </div>
                </div>

                <div class="bf-catalog-filter__group">
                    <div class="bf-catalog-filter__label">Размер</div>

                    <div class="bf-filter-chips">
                        <button class="bf-filter-chip is-active" type="button">XS</button>
                        <button class="bf-filter-chip" type="button">S</button>
                        <button class="bf-filter-chip" type="button">M</button>
                        <button class="bf-filter-chip" type="button">L</button>
                        <button class="bf-filter-chip" type="button">XL</button>
                    </div>
                </div>

                <div class="bf-catalog-filter__group">
                    <div class="bf-catalog-filter__label">Цвет</div>

                    <div class="bf-filter-colors">
                        <button class="bf-filter-color is-beige is-active" type="button" aria-label="Beige"></button>
                        <button class="bf-filter-color is-blue" type="button" aria-label="Blue"></button>
                        <button class="bf-filter-color is-black" type="button" aria-label="Black"></button>
                        <button class="bf-filter-color is-white" type="button" aria-label="White"></button>
                    </div>
                </div>

                <div class="bf-catalog-filter__actions">
                    <button class="bf-btn bf-btn--light bf-catalog-filter__submit" type="button">
                        Применить
                    </button>
                </div>
            </div>
        </div>
    </aside>

    <div class="bf-catalog-page__content">
        <section class="bf-catalog-products">
            <div class="bf-catalog-products__head">
                <h2 class="bf-catalog-products__title">
                    Товаров: <span><?= $productsCountLabel ?></span>
                </h2>
            </div>

            <div class="bf-catalog-products__body">
			<?php
            $APPLICATION->IncludeComponent(
                "bitrix:catalog.section",
                "bf_catalog_grid",
                [
                    "IBLOCK_TYPE" => $arParams["IBLOCK_TYPE"],
                    "IBLOCK_ID" => $arParams["IBLOCK_ID"],
                    "BASKET_URL" => $arParams["BASKET_URL"],
                    "ACTION_VARIABLE" => $arParams["ACTION_VARIABLE"],
                    "PRODUCT_ID_VARIABLE" => $arParams["PRODUCT_ID_VARIABLE"],
                    "PRODUCT_QUANTITY_VARIABLE" => $arParams["PRODUCT_QUANTITY_VARIABLE"],
                    "PRODUCT_PROPS_VARIABLE" => $arParams["PRODUCT_PROPS_VARIABLE"],

                    "FILTER_NAME" => $arParams["FILTER_NAME"] ?? "",
                    "SECTION_ID" => 0,
                    "SECTION_CODE" => "",
                    "SECTION_ID_VARIABLE" => $arParams["SECTION_ID_VARIABLE"],
                    "SECTION_URL" => $arResult["FOLDER"] . $arResult["URL_TEMPLATES"]["section"],
                    "DETAIL_URL" => $arResult["FOLDER"] . $arResult["URL_TEMPLATES"]["element"],

                    "SHOW_ALL_WO_SECTION" => "Y",
                    "INCLUDE_SUBSECTIONS" => "Y",

                    "ELEMENT_SORT_FIELD" => $arParams["ELEMENT_SORT_FIELD"],
                    "ELEMENT_SORT_ORDER" => $arParams["ELEMENT_SORT_ORDER"],
                    "ELEMENT_SORT_FIELD2" => $arParams["ELEMENT_SORT_FIELD2"],
                    "ELEMENT_SORT_ORDER2" => $arParams["ELEMENT_SORT_ORDER2"],

                    "PAGE_ELEMENT_COUNT" => 8,
                    "LINE_ELEMENT_COUNT" => "4",

                    "PROPERTY_CODE" => $arParams["LIST_PROPERTY_CODE"] ?? $arParams["PROPERTY_CODE"] ?? [],
                    "PROPERTY_CODE_MOBILE" => $arParams["LIST_PROPERTY_CODE_MOBILE"] ?? [],
                    "OFFERS_FIELD_CODE" => $arParams["LIST_OFFERS_FIELD_CODE"] ?? [],
                    "OFFERS_PROPERTY_CODE" => $arParams["LIST_OFFERS_PROPERTY_CODE"] ?? [],

                    "OFFERS_SORT_FIELD" => $arParams["OFFERS_SORT_FIELD"],
                    "OFFERS_SORT_ORDER" => $arParams["OFFERS_SORT_ORDER"],
                    "OFFERS_SORT_FIELD2" => $arParams["OFFERS_SORT_FIELD2"],
                    "OFFERS_SORT_ORDER2" => $arParams["OFFERS_SORT_ORDER2"],
                    "OFFERS_LIMIT" => $arParams["LIST_OFFERS_LIMIT"] ?? $arParams["OFFERS_LIMIT"] ?? 0,

                    "PRICE_CODE" => $arParams["~PRICE_CODE"],
                    "USE_PRICE_COUNT" => $arParams["USE_PRICE_COUNT"],
                    "SHOW_PRICE_COUNT" => $arParams["SHOW_PRICE_COUNT"],
                    "PRICE_VAT_INCLUDE" => $arParams["PRICE_VAT_INCLUDE"],
                    "PRICE_VAT_SHOW_VALUE" => $arParams["PRICE_VAT_SHOW_VALUE"],

                    "USE_PRODUCT_QUANTITY" => $arParams["USE_PRODUCT_QUANTITY"],
                    "ADD_PROPERTIES_TO_BASKET" => $arParams["ADD_PROPERTIES_TO_BASKET"] ?? "",
                    "PARTIAL_PRODUCT_PROPERTIES" => $arParams["PARTIAL_PRODUCT_PROPERTIES"] ?? "",
                    "PRODUCT_PROPERTIES" => $arParams["PRODUCT_PROPERTIES"] ?? [],
                    "OFFERS_CART_PROPERTIES" => $arParams["OFFERS_CART_PROPERTIES"] ?? [],

                    "DISPLAY_COMPARE" => $arParams["USE_COMPARE"],
                    "COMPARE_PATH" => $arResult["FOLDER"] . $arResult["URL_TEMPLATES"]["compare"],

                    "ADD_PICT_PROP" => $arParams["ADD_PICT_PROP"] ?? "",
                    "LABEL_PROP" => $arParams["LABEL_PROP"] ?? [],
                    "LABEL_PROP_MOBILE" => $arParams["LABEL_PROP_MOBILE"] ?? [],
                    "LABEL_PROP_POSITION" => $arParams["LABEL_PROP_POSITION"] ?? "",
                    "OFFER_ADD_PICT_PROP" => $arParams["OFFER_ADD_PICT_PROP"] ?? "",
                    "OFFER_TREE_PROPS" => $arParams["OFFER_TREE_PROPS"] ?? [],

                    "PRODUCT_SUBSCRIPTION" => $arParams["PRODUCT_SUBSCRIPTION"],
                    "SHOW_DISCOUNT_PERCENT" => $arParams["SHOW_DISCOUNT_PERCENT"],
                    "DISCOUNT_PERCENT_POSITION" => $arParams["DISCOUNT_PERCENT_POSITION"],
                    "SHOW_OLD_PRICE" => $arParams["SHOW_OLD_PRICE"],

                    "MESS_BTN_BUY" => $arParams["~MESS_BTN_BUY"],
                    "MESS_BTN_ADD_TO_BASKET" => $arParams["~MESS_BTN_ADD_TO_BASKET"],
                    "MESS_BTN_SUBSCRIBE" => $arParams["~MESS_BTN_SUBSCRIBE"],
                    "MESS_BTN_DETAIL" => $arParams["~MESS_BTN_DETAIL"],
                    "MESS_NOT_AVAILABLE" => $arParams["~MESS_NOT_AVAILABLE"] ?? "",
                    "MESS_NOT_AVAILABLE_SERVICE" => $arParams["~MESS_NOT_AVAILABLE_SERVICE"] ?? "",

                    "ADD_TO_BASKET_ACTION" => $arParams["ADD_TO_BASKET_ACTION"] ?? "ADD",
                    "SHOW_CLOSE_POPUP" => $arParams["COMMON_SHOW_CLOSE_POPUP"] ?? "",

                    "CACHE_TYPE" => $arParams["CACHE_TYPE"],
                    "CACHE_TIME" => $arParams["CACHE_TIME"],
                    "CACHE_GROUPS" => $arParams["CACHE_GROUPS"],

                    "DISPLAY_TOP_PAGER" => "N",
                    "DISPLAY_BOTTOM_PAGER" => "Y",
                    "PAGER_TEMPLATE" => $arParams["PAGER_TEMPLATE"],
                    "PAGER_TITLE" => $arParams["PAGER_TITLE"] ?? "Товары",
                    "PAGER_SHOW_ALWAYS" => $arParams["PAGER_SHOW_ALWAYS"],
                    "PAGER_DESC_NUMBERING" => $arParams["PAGER_DESC_NUMBERING"],
                    "PAGER_DESC_NUMBERING_CACHE_TIME" => $arParams["PAGER_DESC_NUMBERING_CACHE_TIME"],
                    "PAGER_SHOW_ALL" => $arParams["PAGER_SHOW_ALL"],

                    "SET_TITLE" => "N",
                    "SET_BROWSER_TITLE" => "N",
                    "SET_META_KEYWORDS" => "N",
                    "SET_META_DESCRIPTION" => "N",
                    "SET_LAST_MODIFIED" => "N",
                    "ADD_SECTIONS_CHAIN" => "N",

                    "USE_MAIN_ELEMENT_SECTION" => $arParams["USE_MAIN_ELEMENT_SECTION"] ?? "N",
                    "HIDE_NOT_AVAILABLE" => $arParams["HIDE_NOT_AVAILABLE"],
                    "HIDE_NOT_AVAILABLE_OFFERS" => $arParams["HIDE_NOT_AVAILABLE_OFFERS"] ?? "N",

                    "TEMPLATE_THEME" => $arParams["TEMPLATE_THEME"] ?? "",
                    "PRODUCT_BLOCKS_ORDER" => $arParams["LIST_PRODUCT_BLOCKS_ORDER"] ?? "",
                    "PRODUCT_ROW_VARIANTS" => $arParams["LIST_PRODUCT_ROW_VARIANTS"] ?? "",
                    "ENLARGE_PRODUCT" => $arParams["LIST_ENLARGE_PRODUCT"] ?? "",
                    "ENLARGE_PROP" => $arParams["LIST_ENLARGE_PROP"] ?? "",
                    "SHOW_SLIDER" => $arParams["LIST_SHOW_SLIDER"] ?? "",
                    "SLIDER_INTERVAL" => $arParams["LIST_SLIDER_INTERVAL"] ?? "",
                    "SLIDER_PROGRESS" => $arParams["LIST_SLIDER_PROGRESS"] ?? "",

                    "CONVERT_CURRENCY" => $arParams["CONVERT_CURRENCY"],
                    "CURRENCY_ID" => $arParams["CURRENCY_ID"],

                    "COMPATIBLE_MODE" => $arParams["COMPATIBLE_MODE"] ?? ""
                ],
                $component
            );
?>
		</div>
        </section>
    </div>
</section>

<?php
if ($arParams["USE_COMPARE"] === "Y") {
    $APPLICATION->IncludeComponent(
        "bitrix:catalog.compare.list",
        "",
        [
            "IBLOCK_TYPE" => $arParams["IBLOCK_TYPE"],
            "IBLOCK_ID" => $arParams["IBLOCK_ID"],
            "NAME" => $arParams["COMPARE_NAME"],
            "DETAIL_URL" => $arResult["FOLDER"] . $arResult["URL_TEMPLATES"]["element"],
            "COMPARE_URL" => $arResult["FOLDER"] . $arResult["URL_TEMPLATES"]["compare"],
            "ACTION_VARIABLE" => (!empty($arParams["ACTION_VARIABLE"]) ? $arParams["ACTION_VARIABLE"] : "action"),
            "PRODUCT_ID_VARIABLE" => $arParams["PRODUCT_ID_VARIABLE"],
            "POSITION_FIXED" => $arParams["COMPARE_POSITION_FIXED"] ?? "",
            "POSITION" => $arParams["COMPARE_POSITION"] ?? "",
        ],
        $component,
        ["HIDE_ICONS" => "Y"]
    );
}
?>