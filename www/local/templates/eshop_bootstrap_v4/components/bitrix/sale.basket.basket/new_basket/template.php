<?php if (!defined('B_PROLOG_INCLUDED') || B_PROLOG_INCLUDED !== true) {
    die();
}

use Bitrix\Main;
use Bitrix\Main\Localization\Loc;

\Bitrix\Main\UI\Extension::load(["ui.fonts.ruble", "ui.fonts.opensans"]);

/**
 * @var array $arParams
 * @var array $arResult
 * @var string $templateFolder
 * @var string $templateName
 * @var CMain $APPLICATION
 * @var CBitrixBasketComponent $component
 * @var CBitrixComponentTemplate $this
 * @var array $giftParameters
 */

if (!isset($arParams['DISPLAY_MODE']) || !in_array($arParams['DISPLAY_MODE'], ['extended', 'compact'])) {
    $arParams['DISPLAY_MODE'] = 'extended';
}

$arParams['USE_DYNAMIC_SCROLL'] = isset($arParams['USE_DYNAMIC_SCROLL']) && $arParams['USE_DYNAMIC_SCROLL'] === 'N' ? 'N' : 'Y';
$arParams['SHOW_FILTER'] = isset($arParams['SHOW_FILTER']) && $arParams['SHOW_FILTER'] === 'N' ? 'N' : 'Y';

$arParams['PRICE_DISPLAY_MODE'] = isset($arParams['PRICE_DISPLAY_MODE']) && $arParams['PRICE_DISPLAY_MODE'] === 'N' ? 'N' : 'Y';

if (!isset($arParams['TOTAL_BLOCK_DISPLAY']) || !is_array($arParams['TOTAL_BLOCK_DISPLAY'])) {
    $arParams['TOTAL_BLOCK_DISPLAY'] = ['top'];
}

if (empty($arParams['PRODUCT_BLOCKS_ORDER'])) {
    $arParams['PRODUCT_BLOCKS_ORDER'] = 'props,sku,columns';
}

if (is_string($arParams['PRODUCT_BLOCKS_ORDER'])) {
    $arParams['PRODUCT_BLOCKS_ORDER'] = explode(',', $arParams['PRODUCT_BLOCKS_ORDER']);
}

$arParams['USE_PRICE_ANIMATION'] = isset($arParams['USE_PRICE_ANIMATION']) && $arParams['USE_PRICE_ANIMATION'] === 'N' ? 'N' : 'Y';
$arParams['EMPTY_BASKET_HINT_PATH'] = isset($arParams['EMPTY_BASKET_HINT_PATH']) ? (string)$arParams['EMPTY_BASKET_HINT_PATH'] : '/';
$arParams['USE_ENHANCED_ECOMMERCE'] = isset($arParams['USE_ENHANCED_ECOMMERCE']) && $arParams['USE_ENHANCED_ECOMMERCE'] === 'Y' ? 'Y' : 'N';
$arParams['DATA_LAYER_NAME'] = isset($arParams['DATA_LAYER_NAME']) ? trim($arParams['DATA_LAYER_NAME']) : 'dataLayer';
$arParams['BRAND_PROPERTY'] = isset($arParams['BRAND_PROPERTY']) ? trim($arParams['BRAND_PROPERTY']) : '';

if ($arParams['USE_GIFTS'] === 'Y') {
    $arParams['GIFTS_BLOCK_TITLE'] = isset($arParams['GIFTS_BLOCK_TITLE']) ? trim((string)$arParams['GIFTS_BLOCK_TITLE']) : Loc::getMessage('SBB_GIFTS_BLOCK_TITLE');

    CBitrixComponent::includeComponentClass('bitrix:sale.products.gift.basket');

    $giftParameters = [
        'SHOW_PRICE_COUNT' => 1,
        'PRODUCT_SUBSCRIPTION' => 'N',
        'PRODUCT_ID_VARIABLE' => 'id',
        'USE_PRODUCT_QUANTITY' => 'N',
        'ACTION_VARIABLE' => 'actionGift',
        'ADD_PROPERTIES_TO_BASKET' => 'Y',
        'PARTIAL_PRODUCT_PROPERTIES' => 'Y',

        'BASKET_URL' => $APPLICATION->GetCurPage(),
        'APPLIED_DISCOUNT_LIST' => $arResult['APPLIED_DISCOUNT_LIST'],
        'FULL_DISCOUNT_LIST' => $arResult['FULL_DISCOUNT_LIST'],

        'TEMPLATE_THEME' => $arParams['TEMPLATE_THEME'],
        'PRICE_VAT_INCLUDE' => $arParams['PRICE_VAT_SHOW_VALUE'],
        'CACHE_GROUPS' => $arParams['CACHE_GROUPS'],

        'BLOCK_TITLE' => $arParams['GIFTS_BLOCK_TITLE'] ?? '',
        'HIDE_BLOCK_TITLE' => $arParams['GIFTS_HIDE_BLOCK_TITLE'] ?? '',
        'TEXT_LABEL_GIFT' => $arParams['GIFTS_TEXT_LABEL_GIFT'] ?? '',

        'DETAIL_URL' => $arParams['GIFTS_DETAIL_URL'] ?? null,
        'PRODUCT_QUANTITY_VARIABLE' => $arParams['GIFTS_PRODUCT_QUANTITY_VARIABLE'] ?? '',
        'PRODUCT_PROPS_VARIABLE' => $arParams['GIFTS_PRODUCT_PROPS_VARIABLE'] ?? '',
        'SHOW_OLD_PRICE' => $arParams['GIFTS_SHOW_OLD_PRICE'] ?? '',
        'SHOW_DISCOUNT_PERCENT' => $arParams['GIFTS_SHOW_DISCOUNT_PERCENT'] ?? '',
        'DISCOUNT_PERCENT_POSITION' => $arParams['DISCOUNT_PERCENT_POSITION'] ?? '',
        'MESS_BTN_BUY' => $arParams['GIFTS_MESS_BTN_BUY'] ?? '',
        'MESS_BTN_DETAIL' => $arParams['GIFTS_MESS_BTN_DETAIL'] ?? '',
        'CONVERT_CURRENCY' => $arParams['GIFTS_CONVERT_CURRENCY'] ?? '',
        'HIDE_NOT_AVAILABLE' => $arParams['GIFTS_HIDE_NOT_AVAILABLE'] ?? '',

        'PRODUCT_ROW_VARIANTS' => '',
        'PAGE_ELEMENT_COUNT' => 0,
        'DEFERRED_PRODUCT_ROW_VARIANTS' => \Bitrix\Main\Web\Json::encode(
            SaleProductsGiftBasketComponent::predictRowVariants(
                $arParams['GIFTS_PAGE_ELEMENT_COUNT'],
                $arParams['GIFTS_PAGE_ELEMENT_COUNT']
            )
        ),
        'DEFERRED_PAGE_ELEMENT_COUNT' => $arParams['GIFTS_PAGE_ELEMENT_COUNT'],

        'ADD_TO_BASKET_ACTION' => 'BUY',
        'PRODUCT_DISPLAY_MODE' => 'Y',
        'PRODUCT_BLOCKS_ORDER' => isset($arParams['GIFTS_PRODUCT_BLOCKS_ORDER']) ? $arParams['GIFTS_PRODUCT_BLOCKS_ORDER'] : '',
        'SHOW_SLIDER' => isset($arParams['GIFTS_SHOW_SLIDER']) ? $arParams['GIFTS_SHOW_SLIDER'] : '',
        'SLIDER_INTERVAL' => isset($arParams['GIFTS_SLIDER_INTERVAL']) ? $arParams['GIFTS_SLIDER_INTERVAL'] : '',
        'SLIDER_PROGRESS' => isset($arParams['GIFTS_SLIDER_PROGRESS']) ? $arParams['GIFTS_SLIDER_PROGRESS'] : '',
        'LABEL_PROP_POSITION' => $arParams['LABEL_PROP_POSITION'],

        'USE_ENHANCED_ECOMMERCE' => $arParams['USE_ENHANCED_ECOMMERCE'],
        'DATA_LAYER_NAME' => $arParams['DATA_LAYER_NAME'],
        'BRAND_PROPERTY' => $arParams['BRAND_PROPERTY']
    ];
}

\CJSCore::Init(['fx', 'popup', 'ajax']);
Main\UI\Extension::load(['ui.mustache']);

//$this->addExternalCss($templateFolder.'/themes/'.$arParams['TEMPLATE_THEME'].'/style.css');

$this->addExternalJs($templateFolder.'/js/action-pool.js');
$this->addExternalJs($templateFolder.'/js/filter.js');
$this->addExternalJs($templateFolder.'/js/component.js');

$mobileColumns = isset($arParams['COLUMNS_LIST_MOBILE'])
    ? $arParams['COLUMNS_LIST_MOBILE']
    : $arParams['COLUMNS_LIST'];
$mobileColumns = array_fill_keys($mobileColumns, true);

$jsTemplates = new Main\IO\Directory(Main\Application::getDocumentRoot().$templateFolder.'/js-templates');
/** @var Main\IO\File $jsTemplate */
foreach ($jsTemplates->getChildren() as $jsTemplate) {
    include($jsTemplate->getPath());
}

$displayModeClass = $arParams['DISPLAY_MODE'] === 'compact' ? ' basket-items-list-wrapper-compact' : '';

global $APPLICATION;

$currentPageClass = trim((string)$APPLICATION->GetPageProperty('bf_page_class'));
$APPLICATION->SetPageProperty('bf_page_class', trim($currentPageClass . ' bf-cart'));

if (!$APPLICATION->GetPageProperty('bf_background')) {
    $APPLICATION->SetPageProperty('bf_background', SITE_TEMPLATE_PATH . '/assets/img/main-bg.jpg');
}

$arParams['SHOW_FILTER'] = 'N';
$arParams['TOTAL_BLOCK_DISPLAY'] = ['bottom'];

$basketRows = array_values($arResult['GRID']['ROWS'] ?? []);

$extractRowImage = static function (array $row): string {
    if (!empty($row['PICTURE']['src'])) {
        return (string)$row['PICTURE']['src'];
    }

    if (!empty($row['PICTURE']['SRC'])) {
        return (string)$row['PICTURE']['SRC'];
    }

    if (!empty($row['PREVIEW_PICTURE_SRC'])) {
        return (string)$row['PREVIEW_PICTURE_SRC'];
    }

    if (!empty($row['DETAIL_PICTURE_SRC'])) {
        return (string)$row['DETAIL_PICTURE_SRC'];
    }

    return '';
};

$extractRowName = static function (array $row): string {
    $value = '';

    if (!empty($row['NAME'])) {
        $value = (string)$row['NAME'];
    } elseif (!empty($row['PRODUCT_NAME'])) {
        $value = (string)$row['PRODUCT_NAME'];
    }

    return trim(html_entity_decode(strip_tags($value)));
};

$extractRowPrice = static function (array $row): string {
    $value = '';

    if (!empty($row['SUM_FORMATED'])) {
        $value = (string)$row['SUM_FORMATED'];
    } elseif (!empty($row['SUM'])) {
        $value = (string)$row['SUM'];
    } elseif (!empty($row['PRICE_FORMATED'])) {
        $value = (string)$row['PRICE_FORMATED'];
    } elseif (!empty($row['PRICE'])) {
        $value = (string)$row['PRICE'];
    }

    return trim(html_entity_decode(strip_tags($value)));
};

$sidebarListRows = array_slice($basketRows, 0, 5);
$sidebarThumbRows = array_slice($basketRows, 0, 6);

while (count($sidebarThumbRows) < 6) {
    $sidebarThumbRows[] = null;
}

$checkoutUrl = !empty($arParams['PATH_TO_ORDER'])
    ? (string)$arParams['PATH_TO_ORDER']
    : SITE_DIR . 'personal/order/make/';

$initialTotal = trim(html_entity_decode(strip_tags((string)($arResult['allSum_FORMATED'] ?? $arResult['TOTAL_RENDER_DATA']['PRICE_WITHOUT_DISCOUNT_FORMATED'] ?? '—'))));

if (empty($arResult['ERROR_MESSAGE'])) {
    /*
    if ($arParams['USE_GIFTS'] === 'Y' && $arParams['GIFTS_PLACE'] === 'TOP')
    {
        ?>
        <div data-entity="parent-container">
            <div class="catalog-block-header"
                    data-entity="header"
                    data-showed="false"
                    style="display: none; opacity: 0;">
                <?=$arParams['GIFTS_BLOCK_TITLE']?>
            </div>
            <?
            $APPLICATION->IncludeComponent(
                'bitrix:sale.products.gift.basket',
                'bootstrap_v4',
                $giftParameters,
                $component
            );
            ?>
        </div>
        <?
    }
        */

    if ($arResult['BASKET_ITEM_MAX_COUNT_EXCEEDED']) {
        ?>
		<div id="basket-item-message">
			<?=Loc::getMessage('SBB_BASKET_ITEM_MAX_COUNT_EXCEEDED', ['#PATH#' => $arParams['PATH_TO_BASKET']])?>
		</div>
		<?php
    }
    ?>
	<section class="bf-cart-page">
		<div class="bf-cart-page__main">
			<h1 class="bf-cart-page__title">YOUR SHOPPING CART</h1>

			<div class="bf-cart-page__head">
				<div class="bf-cart-page__head-col bf-cart-page__head-col--item">Item</div>
				<div class="bf-cart-page__head-col bf-cart-page__head-col--qty">Qty</div>
				<div class="bf-cart-page__head-col bf-cart-page__head-col--price">Price:</div>
				<div class="bf-cart-page__head-col bf-cart-page__head-col--sum">Total:</div>
				<div class="bf-cart-page__head-col bf-cart-page__head-col--remove"></div>
			</div>

			<div id="basket-root" class="bx-basket bx-<?=$arParams['TEMPLATE_THEME']?> bx-step-opacity" style="opacity: 0;">
				<div class="alert alert-warning alert-dismissable" id="basket-warning" style="display: none;">
					<span class="close" data-entity="basket-items-warning-notification-close">&times;</span>
					<div data-entity="basket-general-warnings"></div>
					<div data-entity="basket-item-warnings">
						<?=Loc::getMessage('SBB_BASKET_ITEM_WARNING')?>
					</div>
				</div>

				<div class="bf-cart-table-shell">
					<div class="basket-items-list-wrapper basket-items-list-wrapper-height-fixed basket-items-list-wrapper-light<?=$displayModeClass?>" id="basket-items-list-wrapper">
						<div class="basket-items-list-header" data-entity="basket-items-list-header">
							<div class="basket-items-search-field" data-entity="basket-filter">
								<div class="form input-group">
									<input type="text" class="form-control" placeholder="<?=Loc::getMessage('SBB_BASKET_FILTER')?>" data-entity="basket-filter-input">
								</div>
								<button class="basket-items-search-clear-btn" type="button" data-entity="basket-filter-clear-btn">&times;</button>
							</div>

							<div class="basket-items-list-header-filter">
								<a href="javascript:void(0)" class="basket-items-list-header-filter-item active" data-entity="basket-items-count" data-filter="all" style="display: none;"></a>
								<a href="javascript:void(0)" class="basket-items-list-header-filter-item" data-entity="basket-items-count" data-filter="similar" style="display: none;"></a>
								<a href="javascript:void(0)" class="basket-items-list-header-filter-item" data-entity="basket-items-count" data-filter="warning" style="display: none;"></a>
								<a href="javascript:void(0)" class="basket-items-list-header-filter-item" data-entity="basket-items-count" data-filter="delayed" style="display: none;"></a>
								<a href="javascript:void(0)" class="basket-items-list-header-filter-item" data-entity="basket-items-count" data-filter="not-available" style="display: none;"></a>
							</div>
						</div>

						<div class="basket-items-list-container" id="basket-items-list-container">
							<div class="basket-items-list-overlay" id="basket-items-list-overlay" style="display: none;"></div>
							<div class="basket-items-list" id="basket-item-list">
								<div class="basket-search-not-found" id="basket-item-list-empty-result" style="display: none;">
									<div class="basket-search-not-found-icon"></div>
									<div class="basket-search-not-found-text"><?=Loc::getMessage('SBB_FILTER_EMPTY_RESULT')?></div>
								</div>
								<table class="basket-items-list-table" id="basket-item-table"></table>
							</div>
						</div>
					</div>
				</div>

				<div class="bf-cart-summary-shell">
					<div class="bf-cart-native-total" aria-hidden="true">
						<div data-entity="basket-total-block"></div>
					</div>

					<div class="bf-cart-summary-bar" data-cart-summary>
						<div class="bf-cart-summary-bar__item">
							<div class="bf-cart-summary-bar__label">Subtotal:</div>
							<div class="bf-cart-summary-bar__value" data-cart-subtotal><?= htmlspecialcharsbx($initialTotal) ?></div>
						</div>

						<div class="bf-cart-summary-bar__item">
							<div class="bf-cart-summary-bar__label">Shipping:</div>
							<div class="bf-cart-summary-bar__value" data-cart-shipping>Calculated at checkout</div>
						</div>

						<div class="bf-cart-summary-bar__item">
							<div class="bf-cart-summary-bar__label">Total:</div>
							<div class="bf-cart-summary-bar__value" data-cart-total><?= htmlspecialcharsbx($initialTotal) ?></div>
						</div>

						<div class="bf-cart-summary-bar__action">
							<a href="<?= htmlspecialcharsbx($checkoutUrl) ?>" class="bf-cart-summary-bar__button">
								PROCEED TO CHECKOUT
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>

		<aside class="bf-cart-page__sidebar">
			<div class="bf-cart-side-block">
				<h2 class="bf-cart-side-block__title">YOU MAY ALSO LIKE</h2>

				<?php if (!empty($sidebarListRows)) { ?>
					<ul class="bf-cart-like-list">
						<?php foreach ($sidebarListRows as $row) { ?>
							<li class="bf-cart-like-list__item">
								<span class="bf-cart-like-list__name"><?= htmlspecialcharsbx($extractRowName($row)) ?></span>
								<span class="bf-cart-like-list__price">— <?= htmlspecialcharsbx($extractRowPrice($row)) ?></span>
							</li>
						<?php } ?>
					</ul>
				<?php } ?>
			</div>

			<div class="bf-cart-side-block bf-cart-side-block--viewed">
				<h2 class="bf-cart-side-block__title">RECENTLY VIEWED</h2>

				<?php if (!empty($sidebarThumbRows)) { ?>
					<div class="bf-cart-viewed-grid">
						<?php foreach ($sidebarThumbRows as $index => $row) {
						    $image = is_array($row) ? $extractRowImage($row) : '';
						    $name = is_array($row) ? $extractRowName($row) : '';
						    ?>
							<div class="bf-cart-viewed-grid__item<?= $index === 4 ? ' is-video' : '' ?>">
								<?php if ($image !== '') { ?>
									<img
										src="<?= htmlspecialcharsbx($image) ?>"
										alt="<?= htmlspecialcharsbx($name) ?>"
										class="bf-cart-viewed-grid__image"
										loading="lazy"
									>
								<?php } else { ?>
									<div class="bf-cart-viewed-grid__empty"></div>
								<?php } ?>

								<?php if ($index === 4) { ?>
									<span class="bf-cart-viewed-grid__play">
										<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M6.75 5.625L12.375 9L6.75 12.375V5.625Z" fill="currentColor"/>
										</svg>
									</span>
								<?php } ?>
							</div>
						<?php } ?>
					</div>
				<?php } ?>
			</div>
		</aside>
	</section>
	<?php
    if (!empty($arResult['CURRENCIES']) && Main\Loader::includeModule('currency')) {
        CJSCore::Init('currency');

        ?>
		<script>
			BX.Currency.setCurrencies(<?=CUtil::PhpToJSObject($arResult['CURRENCIES'], false, true, true)?>);
		</script>
		<?php
    }

    $signer = new \Bitrix\Main\Security\Sign\Signer();
    $signedTemplate = $signer->sign($templateName, 'sale.basket.basket');
    $signedParams = $signer->sign(base64_encode(serialize($arParams)), 'sale.basket.basket');
    $messages = Loc::loadLanguageFile(__FILE__);
    ?>
	<script>
		BX.message(<?=CUtil::PhpToJSObject($messages)?>);
		BX.Sale.BasketComponent.init({
			result: <?=CUtil::PhpToJSObject($arResult, false, false, true)?>,
			params: <?=CUtil::PhpToJSObject($arParams)?>,
			template: '<?=CUtil::JSEscape($signedTemplate)?>',
			signedParamsString: '<?=CUtil::JSEscape($signedParams)?>',
			siteId: '<?=CUtil::JSEscape($component->getSiteId())?>',
			siteTemplateId: '<?=CUtil::JSEscape($component->getSiteTemplateId())?>',
			templateFolder: '<?=CUtil::JSEscape($templateFolder)?>'
		});
	</script>

	<script>
	(function () {
		function parseMoney(text) {
			if (!text) {
				return { value: 0, currency: '₽' };
			}

			var cleanedText = String(text).replace(/\u00a0/g, ' ').trim();
			var currency = cleanedText.replace(/[0-9\s.,-]/g, '').trim() || '₽';
			var numeric = cleanedText.replace(/[^0-9,.-]/g, '').replace(',', '.');
			var value = parseFloat(numeric);

			if (isNaN(value)) {
				value = 0;
			}

			return { value: value, currency: currency };
		}

		function formatMoney(value, currency) {
			var formatted = new Intl.NumberFormat('ru-RU', {
				minimumFractionDigits: value % 1 === 0 ? 0 : 2,
				maximumFractionDigits: 2
			}).format(value);

			return formatted + ' ' + currency;
		}

		function syncCartSummary() {
			var root = document.getElementById('basket-item-table');
			if (!root) {
				return;
			}

			var totalNode = document.querySelector('[data-cart-total]');
			var subtotalNode = document.querySelector('[data-cart-subtotal]');
			if (!totalNode || !subtotalNode) {
				return;
			}

			var sum = 0;
			var currency = '₽';

			var rows = root.querySelectorAll('.basket-items-list-item-container');

			rows.forEach(function (row) {
				var priceNode =
					row.querySelector('.basket-item-block-sum .basket-item-price-current-text') ||
					row.querySelector('.basket-item-block-sum .basket-item-price-current') ||
					row.querySelector('.basket-item-block-sum .basket-item-sum-price') ||
					row.querySelector('.basket-item-block-sum');

				if (!priceNode) {
					return;
				}

				var parsed = parseMoney(priceNode.textContent);
				sum += parsed.value;
				if (parsed.currency) {
					currency = parsed.currency;
				}
			});

			var formatted = formatMoney(sum, currency);
			totalNode.textContent = formatted;
			subtotalNode.textContent = formatted;
		}

		document.addEventListener('DOMContentLoaded', function () {
			syncCartSummary();

			var table = document.getElementById('basket-item-table');
			if (table && 'MutationObserver' in window) {
				var observer = new MutationObserver(function () {
					syncCartSummary();
				});

				observer.observe(table, {
					childList: true,
					subtree: true,
					characterData: true
				});
			}
		});

		document.addEventListener('click', function () {
			setTimeout(syncCartSummary, 80);
			setTimeout(syncCartSummary, 300);
		});
	})();
	</script>
	<?php

    /*
    if ($arParams['USE_GIFTS'] === 'Y' && $arParams['GIFTS_PLACE'] === 'BOTTOM')
    {
        ?>
        <div data-entity="parent-container">
            <div class="catalog-block-header"
                    data-entity="header"
                    data-showed="false"
                    style="display: none; opacity: 0;">
                <?=$arParams['GIFTS_BLOCK_TITLE']?>
            </div>
            <?
            $APPLICATION->IncludeComponent(
                'bitrix:sale.products.gift.basket',
                'bootstrap_v4',
                $giftParameters,
                $component
            );
            ?>
        </div>
        <?
    }

    */
} elseif ($arResult['EMPTY_BASKET']) {
    include(Main\Application::getDocumentRoot().$templateFolder.'/empty.php');
} else {
    ShowError($arResult['ERROR_MESSAGE']);
}
