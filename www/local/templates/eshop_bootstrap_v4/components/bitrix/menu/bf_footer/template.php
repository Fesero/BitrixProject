<?php
if (!defined('B_PROLOG_INCLUDED') || B_PROLOG_INCLUDED !== true) {
    die();
}

if (empty($arResult)) {
    return;
}
?>
<ul class="bf-menu bf-menu--footer">
    <?php foreach ($arResult as $item) { ?>
        <li class="bf-menu__item<?= !empty($item['SELECTED']) ? ' is-active' : '' ?>">
            <a class="bf-menu__link" href="<?= htmlspecialcharsbx($item['LINK']) ?>">
                <?= htmlspecialcharsbx($item['TEXT']) ?>
            </a>
        </li>
    <?php } ?>
</ul>
