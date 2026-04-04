<?php
if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) {
    die();
}

$this->setFrameMode(true);

global $APPLICATION;

if (empty($arResult["ITEMS"])) {
    ?>
    <div class="bf-catalog-empty">
        <div class="bf-catalog-empty__title">No products found</div>
        <div class="bf-catalog-empty__text">Try changing filters or come back later.</div>
    </div>
    <?php
    return;
}

$getImageData = static function (array $item): array {
    $image = null;

    if (!empty($item["PREVIEW_PICTURE"]["SRC"])) {
        $image = $item["PREVIEW_PICTURE"];
    } elseif (!empty($item["DETAIL_PICTURE"]["SRC"])) {
        $image = $item["DETAIL_PICTURE"];
    } elseif (!empty($item["SECOND_PICT"]["SRC"])) {
        $image = $item["SECOND_PICT"];
    }

    if ($image === null && !empty($item["OFFERS"])) {
        foreach ($item["OFFERS"] as $offer) {
            if (!empty($offer["PREVIEW_PICTURE"]["SRC"])) {
                $image = $offer["PREVIEW_PICTURE"];
                break;
            }
            if (!empty($offer["DETAIL_PICTURE"]["SRC"])) {
                $image = $offer["DETAIL_PICTURE"];
                break;
            }
        }
    }

    if ($image === null) {
        return [
            "SRC" => "",
            "ALT" => $item["NAME"],
            "TITLE" => $item["NAME"],
        ];
    }

    return [
        "SRC" => (string)$image["SRC"],
        "ALT" => (string)($image["ALT"] ?? $item["NAME"]),
        "TITLE" => (string)($image["TITLE"] ?? $item["NAME"]),
    ];
};

$getPriceData = static function (array $item): array {
    $priceRow = null;

    if (!empty($item["ITEM_PRICES"]) && is_array($item["ITEM_PRICES"])) {
        $priceRow = reset($item["ITEM_PRICES"]);
    } elseif (!empty($item["MIN_PRICE"]) && is_array($item["MIN_PRICE"])) {
        $priceRow = $item["MIN_PRICE"];
    }

    if (!$priceRow) {
        return [
            "CURRENT" => "",
            "OLD" => "",
            "HAS_OLD" => false,
            "DISCOUNT_PERCENT" => 0,
        ];
    }

    $current = "";
    $old = "";
    $discountPercent = 0;

    if (isset($priceRow["PRINT_RATIO_PRICE"])) {
        $current = (string)$priceRow["PRINT_RATIO_PRICE"];
    } elseif (isset($priceRow["PRINT_PRICE"])) {
        $current = (string)$priceRow["PRINT_PRICE"];
    }

    $basePrice = null;
    $actualPrice = null;

    if (isset($priceRow["RATIO_BASE_PRICE"])) {
        $basePrice = (float)$priceRow["RATIO_BASE_PRICE"];
    } elseif (isset($priceRow["BASE_PRICE"])) {
        $basePrice = (float)$priceRow["BASE_PRICE"];
    }

    if (isset($priceRow["RATIO_PRICE"])) {
        $actualPrice = (float)$priceRow["RATIO_PRICE"];
    } elseif (isset($priceRow["PRICE"])) {
        $actualPrice = (float)$priceRow["PRICE"];
    }

    if ($basePrice !== null && $actualPrice !== null && $basePrice > $actualPrice) {
        if (isset($priceRow["PRINT_RATIO_BASE_PRICE"])) {
            $old = (string)$priceRow["PRINT_RATIO_BASE_PRICE"];
        } elseif (isset($priceRow["PRINT_BASE_PRICE"])) {
            $old = (string)$priceRow["PRINT_BASE_PRICE"];
        }

        if (!empty($priceRow["PERCENT"])) {
            $discountPercent = (int)$priceRow["PERCENT"];
        }
    }

    return [
        "CURRENT" => $current,
        "OLD" => $old,
        "HAS_OLD" => $old !== "",
        "DISCOUNT_PERCENT" => $discountPercent,
    ];
};

$getRating = static function (array $item): float {
    $codes = ["RATING", "RATE", "REVIEWS_RATING", "AVERAGE_RATING"];

    foreach ($codes as $code) {
        if (!empty($item["PROPERTIES"][$code]["VALUE"])) {
            return max(0, min(5, (float)$item["PROPERTIES"][$code]["VALUE"]));
        }
    }

    return 0;
};

$renderStars = static function (float $rating): string {
    $full = (int)floor($rating);
    $html = '<div class="bf-product-card__stars" aria-hidden="true">';

    for ($i = 1; $i <= 5; $i++) {
        $html .= '<span class="bf-product-card__star' . ($i <= $full ? ' is-filled' : '') . '">★</span>';
    }

    $html .= '</div>';

    return $html;
};

$navResult = $arResult["NAV_RESULT"] ?? null;
?>
<div class="bf-products-grid">
    <?php foreach ($arResult["ITEMS"] as $item) {
        $this->AddEditAction($item["ID"], $item["EDIT_LINK"], CIBlock::GetArrayByID($item["IBLOCK_ID"], "ELEMENT_EDIT"));
        $this->AddDeleteAction(
            $item["ID"],
            $item["DELETE_LINK"],
            CIBlock::GetArrayByID($item["IBLOCK_ID"], "ELEMENT_DELETE"),
            ["CONFIRM" => GetMessage("CT_BCS_ELEMENT_DELETE_CONFIRM")]
        );

        $itemId = $this->GetEditAreaId($item["ID"]);
        $image = $getImageData($item);
        $price = $getPriceData($item);
        $rating = $getRating($item);
        $detailUrl = (string)$item["DETAIL_PAGE_URL"];
        $title = (string)$item["NAME"];
        $canBuy = (($item["CAN_BUY"] ?? false) === true);

        $buttonText = $canBuy ? ($arParams["MESS_BTN_ADD_TO_BASKET"] ?: "Add to cart") : ($arParams["MESS_NOT_AVAILABLE"] ?: "Not available");
        $buttonUrl = $canBuy && !empty($item["ADD_URL"]) ? (string)$item["ADD_URL"] : $detailUrl;
        ?>
        <article class="bf-product-card" id="<?= $itemId ?>">
            <a href="<?= htmlspecialcharsbx($detailUrl) ?>" class="bf-product-card__image-wrap">
                <?php if ($image["SRC"] !== "") { ?>
                    <img
                        src="<?= htmlspecialcharsbx($image["SRC"]) ?>"
                        alt="<?= htmlspecialcharsbx($image["ALT"]) ?>"
                        title="<?= htmlspecialcharsbx($image["TITLE"]) ?>"
                        class="bf-product-card__image"
                        loading="lazy"
                    >
                <?php } else { ?>
                    <div class="bf-product-card__image-placeholder">
                        <span>No image</span>
                    </div>
                <?php } ?>
            </a>

            <div class="bf-product-card__body">
                <h3 class="bf-product-card__title">
                    <a href="<?= htmlspecialcharsbx($detailUrl) ?>"><?= htmlspecialcharsbx($title) ?></a>
                </h3>

                <div class="bf-product-card__meta">
                    <div class="bf-product-card__prices">
                        <span class="bf-product-card__price-current"><?= $price["CURRENT"] !== "" ? $price["CURRENT"] : "—" ?></span>

                        <?php if ($price["HAS_OLD"]) { ?>
                            <span class="bf-product-card__price-old"><?= $price["OLD"] ?></span>
                        <?php } ?>
                    </div>

                    <?php if ($rating > 0) { ?>
                        <div class="bf-product-card__rating">
                            <?= $renderStars($rating) ?>
                            <span class="bf-product-card__rating-value">(<?= number_format($rating, 1) ?>/5)</span>
                        </div>
                    <?php } ?>
                </div>

                <div class="bf-product-card__actions">
                    <a
                        href="<?= htmlspecialcharsbx($buttonUrl) ?>"
                        class="bf-product-card__button<?= !$canBuy ? ' is-disabled' : '' ?>"
                        <?= !$canBuy ? 'aria-disabled="true"' : '' ?>
                    >
                        <?= htmlspecialcharsbx($buttonText) ?>
                    </a>
                </div>
            </div>
        </article>
    <?php } ?>
</div>

<?php
if ($navResult && (int)$navResult->NavPageCount > 1) {
    $navNum = (int)$navResult->NavNum;
    $currentPage = (int)$navResult->NavPageNomer;
    $pageCount = (int)$navResult->NavPageCount;
    ?>
    <nav class="bf-products-pagination" aria-label="Catalog pagination">
        <div class="bf-products-pagination__list">
            <?php for ($page = 1; $page <= $pageCount; $page++) {
                $url = $APPLICATION->GetCurPageParam(
                    'PAGEN_' . $navNum . '=' . $page,
                    ['PAGEN_' . $navNum]
                );
                ?>
                <a
                    href="<?= htmlspecialcharsbx($url) ?>"
                    class="bf-products-pagination__item<?= $page === $currentPage ? ' is-active' : '' ?>"
                    <?= $page === $currentPage ? 'aria-current="page"' : '' ?>
                >
                    <?= $page ?>
                </a>
            <?php } ?>

            <?php if ($currentPage < $pageCount) {
                $nextUrl = $APPLICATION->GetCurPageParam(
                    'PAGEN_' . $navNum . '=' . ($currentPage + 1),
                    ['PAGEN_' . $navNum]
                );
                ?>
                <a href="<?= htmlspecialcharsbx($nextUrl) ?>" class="bf-products-pagination__next">
                    Next
                </a>
            <?php } ?>
        </div>
    </nav>
<?php } ?>