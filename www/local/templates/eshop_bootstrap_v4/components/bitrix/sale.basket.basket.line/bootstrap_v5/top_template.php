<?if (!defined('B_PROLOG_INCLUDED') || B_PROLOG_INCLUDED!==true) die();
/**
 * @global array $arParams
 * @global CUser $USER
 * @global CMain $APPLICATION
 * @global string $cartId
 */
$compositeStub = (isset($arResult['COMPOSITE_STUB']) && $arResult['COMPOSITE_STUB'] == 'Y');

\Bitrix\Main\UI\Extension::load("fesero.basket");

\Bitrix\Main\Loader::includeModule('sale');

$basket = Bitrix\Sale\Basket::loadItemsForFuser(\Bitrix\Sale\Fuser::getId(), Bitrix\Main\Context::getCurrent()->getSite());
$initialData = [
    'totalPrice' => $basket->getPrice(),
    'totalCount' => count($basket->getQuantityList()),
];

?>
<div class="basket-line">
	<div 
		id="basket-widget-root" 
		data-component="basket-widget" 
		data-initial='<?= \Bitrix\Main\Web\Json::encode($initialData) ?>'
	></div>
</div>