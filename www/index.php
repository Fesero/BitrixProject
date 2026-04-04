<?php
require($_SERVER['DOCUMENT_ROOT'] . '/bitrix/header.php');

$APPLICATION->SetTitle('Интернет-магазин "Одежда"');
$APPLICATION->SetPageProperty('bf_page_class', 'bf-home');
$APPLICATION->SetPageProperty('bf_background', SITE_TEMPLATE_PATH . '/assets/img/bg-placeholder.jpg');
$APPLICATION->SetPageProperty('bf_search_url', SITE_DIR . 'catalog/');
$APPLICATION->SetPageProperty('bf_cart_url', SITE_DIR . 'personal/cart/');
?>

<section class="bf-home-hero">
    <div class="bf-home-hero__left">
        <div class="bf-home-hero__headline">
            <div class="bf-home-hero__headline-main">
                <span>SPRING</span>
                <span>COLLECTION</span>
            </div>

            <div class="bf-home-hero__headline-side">
                <span class="bf-home-hero__eyebrow">NEW ARRIVALS</span>
                <span class="bf-home-hero__year">2026</span>
            </div>
        </div>

        <div class="bf-home-hero__about">
            <h1 class="bf-home-hero__about-title">ABOUT THE BRAND</h1>

            <div class="bf-home-hero__about-text">
                <p>
                    Our Spring 2026 Collection features premium streetwear and casual fashion
                    designed for the modern urban lifestyle. Made from sustainable fabrics with a
                    focus on comfort and style.
                </p>
            </div>

            <a href="<?= SITE_DIR ?>catalog/" class="bf-btn bf-btn--light bf-home-hero__cta">
                SHOP NOW
            </a>
        </div>
    </div>

    <div class="bf-home-hero__center"></div>

    <aside class="bf-home-hero__right">
        <section class="bf-home-card bf-home-categories">
            <h2 class="bf-home-card__title">TOP CATEGORIES</h2>

            <ul class="bf-home-categories__list">
                <li class="bf-home-categories__item">
                    <a href="<?= SITE_DIR ?>catalog/womens/" class="bf-home-categories__link">
                        Women’s Wear — Dresses, Blouses
                    </a>
                </li>
                <li class="bf-home-categories__item">
                    <a href="<?= SITE_DIR ?>catalog/mens/" class="bf-home-categories__link">
                        Men’s Wear — Jackets, Shirts
                    </a>
                </li>
                <li class="bf-home-categories__item">
                    <a href="<?= SITE_DIR ?>catalog/accessories/" class="bf-home-categories__link">
                        Accessories — Bags, Jewelry
                    </a>
                </li>
                <li class="bf-home-categories__item">
                    <a href="<?= SITE_DIR ?>catalog/footwear/" class="bf-home-categories__link">
                        Footwear — Sneakers, Boots
                    </a>
                </li>
                <li class="bf-home-categories__item">
                    <a href="<?= SITE_DIR ?>sale/" class="bf-home-categories__link">
                        Sale — Up to 50% Off
                    </a>
                </li>
            </ul>
        </section>

        <section class="bf-home-card bf-home-video">
            <h2 class="bf-home-card__title">FEATURED VIDEO</h2>

            <a href="#" class="bf-home-video__preview" aria-label="Play featured video">
                <span class="bf-home-video__play">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 7.5L16.5 12L9 16.5V7.5Z" fill="currentColor"/>
                    </svg>
                </span>
            </a>
        </section>
    </aside>
</section>

<?php require($_SERVER['DOCUMENT_ROOT'] . '/bitrix/footer.php'); ?>