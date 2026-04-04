<?php
if (!defined('B_PROLOG_INCLUDED') || B_PROLOG_INCLUDED !== true) {
    die();
}

if (empty($arResult)) {
    return;
}
?>
<nav class="bf-nav" aria-label="Main navigation">
    <ul class="bf-nav__list">
        <?php foreach ($arResult as $item) { ?>
            <li class="bf-nav__item">
                <a
                    href="<?= htmlspecialcharsbx($item['LINK']) ?>"
                    class="bf-nav__link<?= $item['SELECTED'] ? ' is-active' : '' ?>"
                >
                    <?= htmlspecialcharsbx($item['TEXT']) ?>
                </a>
            </li>
        <?php } ?>
    </ul>
</nav>