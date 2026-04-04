<?php
if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) {
    die();
}

$this->setFrameMode(true);

if (empty($arResult["SECTIONS"])) {
    echo '<div class="bf-catalog-debug">Разделы каталога не найдены.</div>';
    return;
}

$strSectionEdit = CIBlock::GetArrayByID($arParams["IBLOCK_ID"], "SECTION_EDIT");
$strSectionDelete = CIBlock::GetArrayByID($arParams["IBLOCK_ID"], "SECTION_DELETE");
$arSectionDeleteParams = ["CONFIRM" => GetMessage("CT_BCSL_ELEMENT_DELETE_CONFIRM")];
?>
<ul class="bf-catalog-categories">
    <?php foreach ($arResult["SECTIONS"] as $arSection) {
        $this->AddEditAction($arSection["ID"], $arSection["EDIT_LINK"], $strSectionEdit);
        $this->AddDeleteAction($arSection["ID"], $arSection["DELETE_LINK"], $strSectionDelete, $arSectionDeleteParams);
        ?>
        <li class="bf-catalog-categories__item" id="<?= $this->GetEditAreaId($arSection["ID"]); ?>">
            <a href="<?= htmlspecialcharsbx($arSection["SECTION_PAGE_URL"]); ?>" class="bf-catalog-categories__link">
                <span class="bf-catalog-categories__check"></span>
                <span class="bf-catalog-categories__text"><?= htmlspecialcharsbx($arSection["NAME"]); ?></span>
            </a>
        </li>
    <?php } ?>
</ul>