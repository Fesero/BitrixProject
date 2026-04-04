<?php
if (!defined('B_PROLOG_INCLUDED') || B_PROLOG_INCLUDED !== true) {
    die();
}

$this->setFrameMode(true);

global $APPLICATION;

$item = $arResult['ITEM'] ?? $arResult;
$offers = $item['OFFERS'] ?? ($arResult['OFFERS'] ?? []);

$selectedOffer = null;
if (!empty($offers) && is_array($offers)) {
    foreach ($offers as $offer) {
        if (!empty($offer['CAN_BUY'])) {
            $selectedOffer = $offer;
            break;
        }
    }
    if ($selectedOffer === null) {
        $selectedOffer = reset($offers);
    }
}

$activeItem = $selectedOffer ?: $item;

$getFileSrc = static function ($file): string {
    if (empty($file)) {
        return '';
    }

    if (is_array($file)) {
        if (!empty($file['SRC'])) {
            return (string)$file['SRC'];
        }
        if (!empty($file['ID'])) {
            return (string)\CFile::GetPath((int)$file['ID']);
        }
    }

    if (is_numeric($file)) {
        return (string)\CFile::GetPath((int)$file);
    }

    return '';
};

$normalizeValues = static function ($value): array {
    if ($value === null || $value === '' || $value === false) {
        return [];
    }

    if (!is_array($value)) {
        return [trim((string)$value)];
    }

    $result = [];
    foreach ($value as $v) {
        if (is_array($v)) {
            foreach ($v as $inner) {
                $inner = trim((string)$inner);
                if ($inner !== '') {
                    $result[] = $inner;
                }
            }
        } else {
            $v = trim((string)$v);
            if ($v !== '') {
                $result[] = $v;
            }
        }
    }

    return $result;
};

$getPropertyValues = static function (array $sources, array $codes) use ($normalizeValues): array {
    $result = [];

    foreach ($codes as $code) {
        foreach ($sources as $source) {
            if (empty($source) || !is_array($source)) {
                continue;
            }

            if (isset($source['PROPERTIES'][$code])) {
                $prop = $source['PROPERTIES'][$code];

                if (isset($prop['VALUE'])) {
                    foreach ($normalizeValues($prop['VALUE']) as $value) {
                        $result[] = $value;
                    }
                }

                if (isset($prop['DISPLAY_VALUE'])) {
                    foreach ($normalizeValues($prop['DISPLAY_VALUE']) as $value) {
                        $result[] = $value;
                    }
                }
            }

            if (isset($source['DISPLAY_PROPERTIES'][$code])) {
                $prop = $source['DISPLAY_PROPERTIES'][$code];

                if (isset($prop['DISPLAY_VALUE'])) {
                    foreach ($normalizeValues($prop['DISPLAY_VALUE']) as $value) {
                        $result[] = strip_tags((string)$value);
                    }
                }

                if (isset($prop['VALUE'])) {
                    foreach ($normalizeValues($prop['VALUE']) as $value) {
                        $result[] = strip_tags((string)$value);
                    }
                }
            }
        }
    }

    $result = array_values(array_unique(array_filter(array_map(
        static fn ($v) => trim((string)$v),
        $result
    ))));

    return $result;
};

$getFirstPropertyValue = static function (array $sources, array $codes) use ($getPropertyValues): string {
    $values = $getPropertyValues($sources, $codes);
    return $values[0] ?? '';
};

$getPriceData = static function (array $source): array {
    $priceRow = null;

    if (!empty($source['ITEM_PRICES']) && is_array($source['ITEM_PRICES'])) {
        $priceRow = reset($source['ITEM_PRICES']);
    } elseif (!empty($source['MIN_PRICE']) && is_array($source['MIN_PRICE'])) {
        $priceRow = $source['MIN_PRICE'];
    }

    if (!$priceRow) {
        return [
            'CURRENT' => '',
            'OLD' => '',
            'HAS_OLD' => false,
            'DISCOUNT_PERCENT' => 0,
        ];
    }

    $current = '';
    $old = '';
    $discountPercent = 0;

    if (isset($priceRow['PRINT_RATIO_PRICE'])) {
        $current = (string)$priceRow['PRINT_RATIO_PRICE'];
    } elseif (isset($priceRow['PRINT_PRICE'])) {
        $current = (string)$priceRow['PRINT_PRICE'];
    }

    $basePrice = null;
    $actualPrice = null;

    if (isset($priceRow['RATIO_BASE_PRICE'])) {
        $basePrice = (float)$priceRow['RATIO_BASE_PRICE'];
    } elseif (isset($priceRow['BASE_PRICE'])) {
        $basePrice = (float)$priceRow['BASE_PRICE'];
    }

    if (isset($priceRow['RATIO_PRICE'])) {
        $actualPrice = (float)$priceRow['RATIO_PRICE'];
    } elseif (isset($priceRow['PRICE'])) {
        $actualPrice = (float)$priceRow['PRICE'];
    }

    if ($basePrice !== null && $actualPrice !== null && $basePrice > $actualPrice) {
        if (isset($priceRow['PRINT_RATIO_BASE_PRICE'])) {
            $old = (string)$priceRow['PRINT_RATIO_BASE_PRICE'];
        } elseif (isset($priceRow['PRINT_BASE_PRICE'])) {
            $old = (string)$priceRow['PRINT_BASE_PRICE'];
        }

        if (!empty($priceRow['PERCENT'])) {
            $discountPercent = (int)$priceRow['PERCENT'];
        } elseif ($basePrice > 0) {
            $discountPercent = (int)round((($basePrice - $actualPrice) / $basePrice) * 100);
        }
    }

    return [
        'CURRENT' => $current,
        'OLD' => $old,
        'HAS_OLD' => $old !== '',
        'DISCOUNT_PERCENT' => $discountPercent,
    ];
};

$getRating = static function (array $sources) use ($getFirstPropertyValue): float {
    $value = $getFirstPropertyValue($sources, ['RATING', 'RATE', 'REVIEWS_RATING', 'AVERAGE_RATING']);
    if ($value === '') {
        return 0;
    }

    $rating = (float)str_replace(',', '.', $value);
    return max(0, min(5, $rating));
};

$renderStars = static function (float $rating): string {
    $full = (int)floor($rating);
    $html = '<div class="bf-detail-stars" aria-hidden="true">';

    for ($i = 1; $i <= 5; $i++) {
        $html .= '<span class="bf-detail-stars__item' . ($i <= $full ? ' is-filled' : '') . '">★</span>';
    }

    $html .= '</div>';

    return $html;
};

$colorToHex = static function (string $value): string {
    $value = mb_strtolower(trim($value));

    $map = [
        'black' => '#111111',
        'черный' => '#111111',
        'чёрный' => '#111111',
        'white' => '#f3f3f3',
        'белый' => '#f3f3f3',
        'blue' => '#274b77',
        'синий' => '#274b77',
        'navy' => '#172a49',
        'темно-синий' => '#172a49',
        'тёмно-синий' => '#172a49',
        'beige' => '#c5b08f',
        'бежевый' => '#c5b08f',
        'beige / brown' => '#c5b08f',
        'brown' => '#8a5b3d',
        'коричневый' => '#8a5b3d',
        'grey' => '#909090',
        'gray' => '#909090',
        'серый' => '#909090',
        'red' => '#b82828',
        'красный' => '#b82828',
        'green' => '#4a6d4f',
        'зеленый' => '#4a6d4f',
        'зелёный' => '#4a6d4f',
    ];

    return $map[$value] ?? '#2d3f58';
};

$sources = [$activeItem, $item];

$detailUrl = (string)($item['DETAIL_PAGE_URL'] ?? $arResult['DETAIL_PAGE_URL'] ?? '');
$name = (string)($item['NAME'] ?? $arResult['NAME'] ?? 'Product');
$sku = $getFirstPropertyValue($sources, ['CML2_ARTICLE', 'ARTICLE', 'ARTNUMBER', 'SKU']);

$gallery = [];
$gallerySeen = [];

$appendImage = static function ($file, string $alt, string $title) use (&$gallery, &$gallerySeen, $getFileSrc): void {
    $src = $getFileSrc($file);

    if ($src === '' || isset($gallerySeen[$src])) {
        return;
    }

    $gallerySeen[$src] = true;
    $gallery[] = [
        'SRC' => $src,
        'ALT' => $alt !== '' ? $alt : $title,
        'TITLE' => $title !== '' ? $title : $alt,
    ];
};

$appendImage($activeItem['DETAIL_PICTURE'] ?? null, $name, $name);
$appendImage($activeItem['PREVIEW_PICTURE'] ?? null, $name, $name);
$appendImage($item['DETAIL_PICTURE'] ?? null, $name, $name);
$appendImage($item['PREVIEW_PICTURE'] ?? null, $name, $name);

$morePhotos = [];
if (!empty($activeItem['PROPERTIES']['MORE_PHOTO']['VALUE'])) {
    $morePhotos = array_merge($morePhotos, (array)$activeItem['PROPERTIES']['MORE_PHOTO']['VALUE']);
}
if (!empty($item['PROPERTIES']['MORE_PHOTO']['VALUE'])) {
    $morePhotos = array_merge($morePhotos, (array)$item['PROPERTIES']['MORE_PHOTO']['VALUE']);
}

foreach ($morePhotos as $photoId) {
    $appendImage($photoId, $name, $name);
}

if (empty($gallery) && !empty($offers)) {
    foreach ($offers as $offer) {
        $appendImage($offer['DETAIL_PICTURE'] ?? null, $name, $name);
        $appendImage($offer['PREVIEW_PICTURE'] ?? null, $name, $name);
    }
}

$mainImage = $gallery[0] ?? [
    'SRC' => '',
    'ALT' => $name,
    'TITLE' => $name,
];

$price = $getPriceData($activeItem);
if ($price['CURRENT'] === '') {
    $price = $getPriceData($item);
}

$rating = $getRating($sources);

$description = '';
if (!empty($activeItem['DETAIL_TEXT'])) {
    $description = trim(strip_tags((string)$activeItem['DETAIL_TEXT']));
} elseif (!empty($item['DETAIL_TEXT'])) {
    $description = trim(strip_tags((string)$item['DETAIL_TEXT']));
} elseif (!empty($activeItem['PREVIEW_TEXT'])) {
    $description = trim(strip_tags((string)$activeItem['PREVIEW_TEXT']));
} elseif (!empty($item['PREVIEW_TEXT'])) {
    $description = trim(strip_tags((string)$item['PREVIEW_TEXT']));
}

$sizeValues = $getPropertyValues($sources, ['SIZES_CLOTHES', 'SIZES_SHOES', 'SIZE', 'RAZMER']);
$colorValues = $getPropertyValues($sources, ['COLOR_REF', 'COLOR', 'COLOUR']);

$detailRows = [];

$preferredDetails = [
    'Material' => ['MATERIAL', 'MATERIALS', 'COMPOSITION', 'SOSTAV'],
    'Care' => ['CARE', 'CARE_INSTRUCTIONS'],
    'Fit' => ['FIT'],
    'Origin' => ['COUNTRY', 'COUNTRY_OF_ORIGIN', 'ORIGIN'],
];

foreach ($preferredDetails as $label => $codes) {
    $value = $getFirstPropertyValue($sources, $codes);
    if ($value !== '') {
        $detailRows[] = [$label, $value];
    }
}

if (empty($detailRows)) {
    $skipCodes = [
        'MORE_PHOTO',
        'CML2_ARTICLE',
        'ARTICLE',
        'ARTNUMBER',
        'SKU',
        'SIZES_CLOTHES',
        'SIZES_SHOES',
        'SIZE',
        'RAZMER',
        'COLOR_REF',
        'COLOR',
        'COLOUR',
    ];

    if (!empty($item['DISPLAY_PROPERTIES']) && is_array($item['DISPLAY_PROPERTIES'])) {
        foreach ($item['DISPLAY_PROPERTIES'] as $code => $prop) {
            if (in_array($code, $skipCodes, true)) {
                continue;
            }

            $value = '';
            if (isset($prop['DISPLAY_VALUE'])) {
                $value = is_array($prop['DISPLAY_VALUE'])
                    ? implode(', ', array_map('strip_tags', $prop['DISPLAY_VALUE']))
                    : strip_tags((string)$prop['DISPLAY_VALUE']);
            } elseif (isset($prop['VALUE'])) {
                $value = is_array($prop['VALUE'])
                    ? implode(', ', array_map('strip_tags', $prop['VALUE']))
                    : strip_tags((string)$prop['VALUE']);
            }

            $value = trim($value);
            if ($value === '') {
                continue;
            }

            $detailRows[] = [$prop['NAME'] ?? $code, $value];

            if (count($detailRows) >= 4) {
                break;
            }
        }
    }
}

$canBuy = !empty($activeItem['CAN_BUY']) || !empty($item['CAN_BUY']);
$addUrl = (string)($activeItem['ADD_URL'] ?? $item['ADD_URL'] ?? $arResult['ADD_URL'] ?? $detailUrl);
$addUrlWithQty = $addUrl !== '' ? $addUrl . (strpos($addUrl, '?') === false ? '?' : '&') . 'quantity=1' : $detailUrl;

$currentSectionId = (int)($item['IBLOCK_SECTION_ID'] ?? $arResult['IBLOCK_SECTION_ID'] ?? 0);
$filterName = 'bfDetailRelatedFilter_' . (int)$item['ID'];
$GLOBALS[$filterName] = [
    '!ID' => (int)$item['ID'],
    'ACTIVE' => 'Y',
    'ACTIVE_DATE' => 'Y',
];
if ($currentSectionId > 0) {
    $GLOBALS[$filterName]['SECTION_ID'] = $currentSectionId;
}

$rootId = 'bf-detail-' . (int)$item['ID'];
?>
<section class="bf-product-detail" id="<?= htmlspecialcharsbx($rootId) ?>" data-detail-root>
	<div class="bf-product-detail__left">
		<div class="bf-detail-gallery">
			<div class="bf-detail-gallery__main">
				<?php if ($mainImage['SRC'] !== '') { ?>
					<img
						src="<?= htmlspecialcharsbx($mainImage['SRC']) ?>"
						alt="<?= htmlspecialcharsbx($mainImage['ALT']) ?>"
						title="<?= htmlspecialcharsbx($mainImage['TITLE']) ?>"
						class="bf-detail-gallery__main-image"
						data-detail-main-image
					>
				<?php } else { ?>
					<div class="bf-detail-gallery__main-empty">No image</div>
				<?php } ?>
			</div>

			<?php if (count($gallery) > 1) { ?>
				<div class="bf-detail-gallery__thumbs">
					<?php foreach ($gallery as $index => $image) { ?>
						<button
							type="button"
							class="bf-detail-gallery__thumb<?= $index === 0 ? ' is-active' : '' ?>"
							data-detail-thumb
							data-src="<?= htmlspecialcharsbx($image['SRC']) ?>"
							data-alt="<?= htmlspecialcharsbx($image['ALT']) ?>"
							data-title="<?= htmlspecialcharsbx($image['TITLE']) ?>"
							aria-label="Show product image <?= $index + 1 ?>"
						>
							<img
								src="<?= htmlspecialcharsbx($image['SRC']) ?>"
								alt="<?= htmlspecialcharsbx($image['ALT']) ?>"
								title="<?= htmlspecialcharsbx($image['TITLE']) ?>"
								class="bf-detail-gallery__thumb-image"
							>
						</button>
					<?php } ?>
				</div>
			<?php } ?>

			<?php if (!empty($detailRows)) { ?>
				<div class="bf-detail-specs">
					<h2 class="bf-detail-specs__title">Детальное описание</h2>
					<ul class="bf-detail-specs__list">
                        <?php if ($description !== '') { ?>
                            <div class="bf-detail-summary__description">
                                <?= nl2br(htmlspecialcharsbx($description)) ?>
                            </div>
                        <?php } ?>
					</ul>
				</div>
			<?php } ?>

			<div class="bf-detail-socials">
				<a href="#" class="bf-detail-socials__item" aria-label="Instagram">
					<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
						<rect x="2.25" y="2.25" width="13.5" height="13.5" rx="4" stroke="currentColor" stroke-width="1.4"/>
						<circle cx="9" cy="9" r="3.15" stroke="currentColor" stroke-width="1.4"/>
						<circle cx="13.3" cy="4.7" r="0.9" fill="currentColor"/>
					</svg>
				</a>
				<a href="#" class="bf-detail-socials__item" aria-label="Facebook">
					<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M10.1 15.75V9.72H12.13L12.44 7.38H10.1V5.88C10.1 5.2 10.29 4.74 11.27 4.74H12.52V2.65C12.3 2.62 11.55 2.55 10.68 2.55C8.86 2.55 7.62 3.66 7.62 5.71V7.38H5.57V9.72H7.62V15.75H10.1Z" fill="currentColor"/>
					</svg>
				</a>
				<a href="#" class="bf-detail-socials__item" aria-label="Twitter">
					<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M14.98 5.2C14.56 5.39 14.11 5.52 13.63 5.58C14.13 5.28 14.51 4.81 14.69 4.24C14.22 4.52 13.71 4.72 13.16 4.82C12.72 4.35 12.09 4.06 11.39 4.06C10.05 4.06 8.98 5.21 8.98 6.61C8.98 6.8 9 6.98 9.05 7.16C7.03 7.05 5.24 6.04 4.03 4.5C3.82 4.88 3.7 5.31 3.7 5.78C3.7 6.66 4.12 7.43 4.77 7.88C4.39 7.87 4.03 7.76 3.72 7.58V7.61C3.72 8.84 4.55 9.86 5.66 10.1C5.46 10.16 5.25 10.19 5.03 10.19C4.88 10.19 4.73 10.18 4.59 10.15C4.89 11.15 5.82 11.88 6.91 11.9C6.05 12.6 4.97 13.01 3.79 13.01C3.58 13.01 3.37 13 3.17 12.98C4.27 13.72 5.57 14.14 6.97 14.14C11.38 14.14 13.8 10.33 13.8 7.03C13.8 6.92 13.8 6.81 13.79 6.7C14.25 6.35 14.67 5.92 14.98 5.2Z" fill="currentColor"/>
					</svg>
				</a>
			</div>
		</div>
	</div>

	<div class="bf-product-detail__right">
		<div class="bf-detail-summary">
			<h1 class="bf-detail-summary__title"><?= htmlspecialcharsbx($name) ?></h1>

			<?php if ($sku !== '') { ?>
				<div class="bf-detail-summary__sku">SKU: <?= htmlspecialcharsbx($sku) ?></div>
			<?php } ?>

			<div class="bf-detail-summary__top-meta">
				<?php if ($rating > 0) { ?>
					<div class="bf-detail-summary__rating">
						<?= $renderStars($rating) ?>
					</div>
				<?php } ?>

				<?php if ($price['HAS_OLD']) { ?>
					<div class="bf-detail-summary__old-price"><?= $price['OLD'] ?></div>
				<?php } ?>
			</div>

			<div class="bf-detail-summary__price-row">
				<div class="bf-detail-summary__price">
					<?= $price['CURRENT'] !== '' ? $price['CURRENT'] : '—' ?>
				</div>

				<?php if ($price['DISCOUNT_PERCENT'] > 0) { ?>
					<div class="bf-detail-summary__discount"><?= $price['DISCOUNT_PERCENT'] ?>% OFF</div>
				<?php } ?>
			</div>

			<?php if (!empty($sizeValues)) { ?>
				<div class="bf-detail-summary__group">
					<div class="bf-detail-summary__group-title">SIZE</div>
					<div class="bf-detail-size-list">
						<?php foreach ($sizeValues as $index => $size) { ?>
							<button type="button" class="bf-detail-size-list__item<?= $index === 0 ? ' is-active' : '' ?>">
								<?= htmlspecialcharsbx($size) ?>
							</button>
						<?php } ?>
					</div>
				</div>
			<?php } ?>

			<?php if (!empty($colorValues)) { ?>
				<div class="bf-detail-summary__group">
					<div class="bf-detail-summary__group-title">COLOR</div>
					<div class="bf-detail-color-list">
						<?php foreach ($colorValues as $index => $color) { ?>
							<button
								type="button"
								class="bf-detail-color-list__item<?= $index === 0 ? ' is-active' : '' ?>"
								title="<?= htmlspecialcharsbx($color) ?>"
								aria-label="<?= htmlspecialcharsbx($color) ?>"
								style="--bf-color: <?= htmlspecialcharsbx($colorToHex($color)) ?>;"
							></button>
						<?php } ?>
					</div>
				</div>
			<?php } ?>

			<div class="bf-detail-summary__qty-row">
				<div class="bf-detail-qty" data-detail-qty>
					<button type="button" class="bf-detail-qty__button" data-qty-minus>−</button>
					<input type="text" class="bf-detail-qty__input" value="1" readonly data-qty-input>
					<button type="button" class="bf-detail-qty__button" data-qty-plus>+</button>
				</div>
			</div>

			<div class="bf-detail-summary__actions">
				<a
					href="<?= htmlspecialcharsbx($addUrlWithQty) ?>"
					class="bf-detail-summary__cart<?= !$canBuy ? ' is-disabled' : '' ?>"
					data-add-to-cart
					data-base-url="<?= htmlspecialcharsbx($addUrl) ?>"
					<?= !$canBuy ? 'aria-disabled="true"' : '' ?>
				>
					<?= htmlspecialcharsbx($canBuy ? ($arParams['MESS_BTN_ADD_TO_BASKET'] ?: 'ADD TO CART') : ($arParams['MESS_NOT_AVAILABLE'] ?: 'NOT AVAILABLE')) ?>
				</a>

				<a href="#" class="bf-detail-summary__wishlist">
					<span class="bf-detail-summary__wishlist-icon">◔</span>
					<span>WISHLIST</span>
				</a>
			</div>

			<div class="bf-detail-summary__delivery">
				<h2 class="bf-detail-summary__delivery-title">DELIVERY & RETURNS</h2>
				<div class="bf-detail-summary__delivery-text">
					Free shipping on orders over $150. Returns accepted within 30 days.
				</div>
			</div>
		</div>

		<div class="bf-detail-related">
			<h2 class="bf-detail-related__title">YOU MAY ALSO LIKE</h2>

			<?php
            $APPLICATION->IncludeComponent(
                'bitrix:catalog.section',
                'bf_detail_related',
                [
                    'IBLOCK_TYPE' => $arParams['IBLOCK_TYPE'],
                    'IBLOCK_ID' => $arParams['IBLOCK_ID'],
                    'BASKET_URL' => $arParams['BASKET_URL'],
                    'ACTION_VARIABLE' => $arParams['ACTION_VARIABLE'],
                    'PRODUCT_ID_VARIABLE' => $arParams['PRODUCT_ID_VARIABLE'],
                    'PRODUCT_QUANTITY_VARIABLE' => $arParams['PRODUCT_QUANTITY_VARIABLE'],
                    'PRODUCT_PROPS_VARIABLE' => $arParams['PRODUCT_PROPS_VARIABLE'],
                    'FILTER_NAME' => $filterName,
                    'SECTION_ID' => $currentSectionId,
                    'SECTION_CODE' => '',
                    'SECTION_ID_VARIABLE' => $arParams['SECTION_ID_VARIABLE'],
                    'SECTION_URL' => $arParams['SECTION_URL'],
                    'DETAIL_URL' => $arParams['DETAIL_URL'],
                    'SHOW_ALL_WO_SECTION' => $currentSectionId > 0 ? 'N' : 'Y',
                    'INCLUDE_SUBSECTIONS' => 'Y',
                    'ELEMENT_SORT_FIELD' => 'rand',
                    'ELEMENT_SORT_ORDER' => 'asc',
                    'ELEMENT_SORT_FIELD2' => 'id',
                    'ELEMENT_SORT_ORDER2' => 'desc',
                    'PAGE_ELEMENT_COUNT' => 3,
                    'LINE_ELEMENT_COUNT' => 3,
                    'PROPERTY_CODE' => $arParams['PROPERTY_CODE'] ?? [],
                    'PROPERTY_CODE_MOBILE' => [],
                    'OFFERS_FIELD_CODE' => $arParams['OFFERS_FIELD_CODE'] ?? [],
                    'OFFERS_PROPERTY_CODE' => $arParams['OFFERS_PROPERTY_CODE'] ?? [],
                    'OFFERS_SORT_FIELD' => $arParams['OFFERS_SORT_FIELD'],
                    'OFFERS_SORT_ORDER' => $arParams['OFFERS_SORT_ORDER'],
                    'OFFERS_SORT_FIELD2' => $arParams['OFFERS_SORT_FIELD2'],
                    'OFFERS_SORT_ORDER2' => $arParams['OFFERS_SORT_ORDER2'],
                    'OFFERS_LIMIT' => 0,
                    'PRICE_CODE' => $arParams['PRICE_CODE'],
                    'USE_PRICE_COUNT' => $arParams['USE_PRICE_COUNT'],
                    'SHOW_PRICE_COUNT' => $arParams['SHOW_PRICE_COUNT'],
                    'PRICE_VAT_INCLUDE' => $arParams['PRICE_VAT_INCLUDE'],
                    'PRICE_VAT_SHOW_VALUE' => $arParams['PRICE_VAT_SHOW_VALUE'],
                    'USE_PRODUCT_QUANTITY' => 'N',
                    'ADD_PROPERTIES_TO_BASKET' => 'N',
                    'PARTIAL_PRODUCT_PROPERTIES' => 'N',
                    'PRODUCT_PROPERTIES' => [],
                    'OFFERS_CART_PROPERTIES' => [],
                    'DISPLAY_COMPARE' => 'N',
                    'ADD_PICT_PROP' => $arParams['ADD_PICT_PROP'] ?? '',
                    'LABEL_PROP' => $arParams['LABEL_PROP'] ?? [],
                    'LABEL_PROP_MOBILE' => $arParams['LABEL_PROP_MOBILE'] ?? [],
                    'LABEL_PROP_POSITION' => $arParams['LABEL_PROP_POSITION'] ?? '',
                    'OFFER_ADD_PICT_PROP' => $arParams['OFFER_ADD_PICT_PROP'] ?? '',
                    'OFFER_TREE_PROPS' => $arParams['OFFER_TREE_PROPS'] ?? [],
                    'PRODUCT_SUBSCRIPTION' => 'N',
                    'SHOW_DISCOUNT_PERCENT' => 'N',
                    'DISCOUNT_PERCENT_POSITION' => '',
                    'SHOW_OLD_PRICE' => 'N',
                    'MESS_BTN_BUY' => $arParams['MESS_BTN_BUY'] ?? '',
                    'MESS_BTN_ADD_TO_BASKET' => $arParams['MESS_BTN_ADD_TO_BASKET'] ?? '',
                    'MESS_BTN_SUBSCRIBE' => $arParams['MESS_BTN_SUBSCRIBE'] ?? '',
                    'MESS_BTN_DETAIL' => $arParams['MESS_BTN_DETAIL'] ?? '',
                    'MESS_NOT_AVAILABLE' => $arParams['MESS_NOT_AVAILABLE'] ?? '',
                    'MESS_NOT_AVAILABLE_SERVICE' => $arParams['MESS_NOT_AVAILABLE_SERVICE'] ?? '',
                    'ADD_TO_BASKET_ACTION' => 'ADD',
                    'SHOW_CLOSE_POPUP' => 'N',
                    'CACHE_TYPE' => $arParams['CACHE_TYPE'],
                    'CACHE_TIME' => $arParams['CACHE_TIME'],
                    'CACHE_GROUPS' => $arParams['CACHE_GROUPS'],
                    'DISPLAY_TOP_PAGER' => 'N',
                    'DISPLAY_BOTTOM_PAGER' => 'N',
                    'PAGER_SHOW_ALWAYS' => 'N',
                    'PAGER_TEMPLATE' => '',
                    'PAGER_TITLE' => '',
                    'SET_TITLE' => 'N',
                    'SET_BROWSER_TITLE' => 'N',
                    'SET_META_KEYWORDS' => 'N',
                    'SET_META_DESCRIPTION' => 'N',
                    'SET_LAST_MODIFIED' => 'N',
                    'ADD_SECTIONS_CHAIN' => 'N',
                    'USE_MAIN_ELEMENT_SECTION' => 'N',
                    'HIDE_NOT_AVAILABLE' => $arParams['HIDE_NOT_AVAILABLE'],
                    'HIDE_NOT_AVAILABLE_OFFERS' => $arParams['HIDE_NOT_AVAILABLE_OFFERS'],
                    'TEMPLATE_THEME' => $arParams['TEMPLATE_THEME'] ?? '',
                    'PRODUCT_BLOCKS_ORDER' => '',
                    'PRODUCT_ROW_VARIANTS' => '',
                    'ENLARGE_PRODUCT' => 'N',
                    'ENLARGE_PROP' => '',
                    'SHOW_SLIDER' => 'N',
                    'SLIDER_INTERVAL' => '',
                    'SLIDER_PROGRESS' => '',
                    'CONVERT_CURRENCY' => $arParams['CONVERT_CURRENCY'],
                    'CURRENCY_ID' => $arParams['CURRENCY_ID'],
                    'COMPATIBLE_MODE' => $arParams['COMPATIBLE_MODE'] ?? '',
                ],
                $component,
                ['HIDE_ICONS' => 'Y']
            );
?>
		</div>
	</div>
</section>

<script>
(function () {
	document.addEventListener('click', function (event) {
		var root = event.target.closest('[data-detail-root]');
		if (!root) {
			root = document.querySelector('[data-detail-root]');
		}
		if (!root) {
			return;
		}

		var thumb = event.target.closest('[data-detail-thumb]');
		if (thumb && root.contains(thumb)) {
			var mainImage = root.querySelector('[data-detail-main-image]');
			if (mainImage) {
				mainImage.src = thumb.getAttribute('data-src') || '';
				mainImage.alt = thumb.getAttribute('data-alt') || '';
				mainImage.title = thumb.getAttribute('data-title') || '';
			}

			root.querySelectorAll('[data-detail-thumb]').forEach(function (node) {
				node.classList.remove('is-active');
			});
			thumb.classList.add('is-active');
			return;
		}

		var qtyWrap = event.target.closest('[data-detail-qty]');
		if (qtyWrap && root.contains(qtyWrap)) {
			var input = qtyWrap.querySelector('[data-qty-input]');
			if (!input) {
				return;
			}

			var value = parseInt(input.value, 10);
			if (isNaN(value) || value < 1) {
				value = 1;
			}

			if (event.target.closest('[data-qty-minus]')) {
				value = Math.max(1, value - 1);
				input.value = value;
			}

			if (event.target.closest('[data-qty-plus]')) {
				value += 1;
				input.value = value;
			}

			var addBtn = root.querySelector('[data-add-to-cart]');
			if (addBtn) {
				var baseUrl = addBtn.getAttribute('data-base-url') || addBtn.getAttribute('href') || '';
				if (baseUrl) {
					try {
						var url = new URL(baseUrl, window.location.origin);
						url.searchParams.set('quantity', value);
						addBtn.setAttribute('href', url.pathname + url.search + url.hash);
					} catch (e) {
					}
				}
			}
		}
	});
})();
</script>