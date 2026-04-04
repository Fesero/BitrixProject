<?php
if (!defined('B_PROLOG_INCLUDED') || B_PROLOG_INCLUDED !== true) {
    die();
}

use Bitrix\Main\Page\Asset;

Asset::getInstance()->addCss(SITE_TEMPLATE_PATH . '/assets/css/styles.css');

$searchUrl = $APPLICATION->GetPageProperty('bf_search_url') ?: SITE_DIR . 'catalog/';
$cartUrl = $APPLICATION->GetPageProperty('bf_cart_url') ?: SITE_DIR . 'personal/cart/';
$pageClass = trim((string)$APPLICATION->GetPageProperty('bf_page_class'));
$background = $APPLICATION->GetPageProperty('bf_background') ?: SITE_TEMPLATE_PATH . '/assets/img/main-bg.jpg';

$bodyClass = 'bf-body';
if ($pageClass !== '') {
    $bodyClass .= ' ' . $pageClass;
}
?>
<!DOCTYPE html>
<html lang="<?= LANGUAGE_ID ?>">
<head>
    <meta charset="<?= LANG_CHARSET ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php $APPLICATION->ShowTitle(); ?></title>
    <?php $APPLICATION->ShowHead(); ?>
</head>
<body class="<?= htmlspecialcharsbx($bodyClass) ?>">
<?php $APPLICATION->ShowPanel(); ?>

<div class="bf-app">
    <div class="bf-page" style="--bf-page-bg: url('<?= htmlspecialcharsbx($background) ?>');">
        <div class="bf-page__bg"></div>
        <div class="bf-page__shade"></div>

        <header class="bf-header">
            <div class="bf-header__logo">
                <a href="<?= SITE_DIR ?>" class="bf-logo" aria-label="Brand Fashion">
                    <span class="bf-logo__line">FESERO</span>
                    <span class="bf-logo__line">SHOP</span>
                </a>
            </div>

            <div class="bf-header__menu">
                <?php
                $APPLICATION->IncludeComponent(
                    'bitrix:menu',
                    'bf_top',
                    [
                        'ALLOW_MULTI_SELECT' => 'N',
                        'CHILD_MENU_TYPE' => 'left',
                        'DELAY' => 'N',
                        'MAX_LEVEL' => '1',
                        'MENU_CACHE_GET_VARS' => [],
                        'MENU_CACHE_TIME' => '36000000',
                        'MENU_CACHE_TYPE' => 'A',
                        'MENU_CACHE_USE_GROUPS' => 'Y',
                        'ROOT_MENU_TYPE' => 'top',
                        'USE_EXT' => 'N',
                    ],
                    false
                );
?>
            </div>

            <div class="bf-header__actions">
                <form class="bf-search" action="<?= htmlspecialcharsbx($searchUrl) ?>" method="get">
                    <label class="bf-search__field">
                        <input
                            type="text"
                            name="q"
                            value="<?= htmlspecialcharsbx((string)($_REQUEST['q'] ?? '')) ?>"
                            placeholder="Search..."
                            autocomplete="off"
                        >
                    </label>

                    <button type="submit" class="bf-search__button" aria-label="Search">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="8" cy="8" r="5.5" stroke="currentColor" stroke-width="1.5"/>
                            <path d="M12.5 12.5L16 16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                        </svg>
                    </button>
                </form>

                <a href="<?= htmlspecialcharsbx($cartUrl) ?>" class="bf-icon-button" aria-label="Cart">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.25 6.25H16.25L15.1 11.95C14.94 12.74 14.25 13.33 13.44 13.33H8.07C7.26 13.33 6.56 12.74 6.41 11.95L5.13 4.93C5.03 4.39 4.56 4 4 4H2.92" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <circle cx="8.33" cy="16.17" r="1.08" fill="currentColor"/>
                        <circle cx="13.75" cy="16.17" r="1.08" fill="currentColor"/>
                    </svg>
                    <span class="bf-icon-button__count">0</span>
                </a>
            </div>
        </header>

        <main class="bf-main">