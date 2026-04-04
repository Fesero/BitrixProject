<?php
if (!defined('B_PROLOG_INCLUDED') || B_PROLOG_INCLUDED !== true) {
    die();
}

$this->setFrameMode(true);

if (empty($arResult['ITEMS'])) {
    return;
}

$getImageData = static function (array $item): array {
    $image = null;

    if (!empty($item['PREVIEW_PICTURE']['SRC'])) {
        $image = $item['PREVIEW_PICTURE'];
    } elseif (!empty($item['DETAIL_PICTURE']['SRC'])) {
        $image = $item['DETAIL_PICTURE'];
    }

    if ($image === null && !empty($item['OFFERS'])) {
        foreach ($item['OFFERS'] as $offer) {
            if (!empty($offer['PREVIEW_PICTURE']['SRC'])) {
                $image = $offer['PREVIEW_PICTURE'];
                break;
            }
            if (!empty($offer['DETAIL_PICTURE']['SRC'])) {
                $image = $offer['DETAIL_PICTURE'];
                break;
            }
        }
    }

    if ($image === null) {
        return [
            'SRC' => '',
            'ALT' => $item['NAME'],
            'TITLE' => $item['NAME'],
        ];
    }

    return [
        'SRC' => (string)$image['SRC'],
        'ALT' => (string)($image['ALT'] ?? $item['NAME']),
        'TITLE' => (string)($image['TITLE'] ?? $item['NAME']),
    ];
};

$getPriceData = static function (array $item): string {
    if (!empty($item['ITEM_PRICES']) && is_array($item['ITEM_PRICES'])) {
        $priceRow = reset($item['ITEM_PRICES']);
        if (!empty($priceRow['PRINT_RATIO_PRICE'])) {
            return (string)$priceRow['PRINT_RATIO_PRICE'];
        }
        if (!empty($priceRow['PRINT_PRICE'])) {
            return (string)$priceRow['PRINT_PRICE'];
        }
    }

    if (!empty($item['MIN_PRICE']['PRINT_VALUE'])) {
        return (string)$item['MIN_PRICE']['PRINT_VALUE'];
    }

    if (!empty($item['MIN_PRICE']['PRINT_DISCOUNT_VALUE'])) {
        return (string)$item['MIN_PRICE']['PRINT_DISCOUNT_VALUE'];
    }

    return '—';
};
?>
<div class="bf-detail-related-grid">
	<?php foreach ($arResult['ITEMS'] as $item) {
	    $this->AddEditAction($item['ID'], $item['EDIT_LINK'], CIBlock::GetArrayByID($item['IBLOCK_ID'], 'ELEMENT_EDIT'));
	    $this->AddDeleteAction(
	        $item['ID'],
	        $item['DELETE_LINK'],
	        CIBlock::GetArrayByID($item['IBLOCK_ID'], 'ELEMENT_DELETE'),
	        ['CONFIRM' => GetMessage('CT_BCS_ELEMENT_DELETE_CONFIRM')]
	    );

	    $image = $getImageData($item);
	    $price = $getPriceData($item);
	    ?>
		<article class="bf-detail-related-card" id="<?= $this->GetEditAreaId($item['ID']) ?>">
			<a href="<?= htmlspecialcharsbx($item['DETAIL_PAGE_URL']) ?>" class="bf-detail-related-card__image-wrap">
				<?php if ($image['SRC'] !== '') { ?>
					<img
						src="<?= htmlspecialcharsbx($image['SRC']) ?>"
						alt="<?= htmlspecialcharsbx($image['ALT']) ?>"
						title="<?= htmlspecialcharsbx($image['TITLE']) ?>"
						class="bf-detail-related-card__image"
						loading="lazy"
					>
				<?php } else { ?>
					<div class="bf-detail-related-card__empty">No image</div>
				<?php } ?>
			</a>
			<div class="bf-detail-related-card__price"><?= $price ?></div>
		</article>
	<?php } ?>
</div>