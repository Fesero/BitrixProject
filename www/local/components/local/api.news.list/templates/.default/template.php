<?php
if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) die();

/** @var array $arResult */
/** @var CBitrixComponentTemplate $this */

use \Bitrix\Main\Type\DateTime;
?>

<div class="api-news-list">
    <h3>Последние новости</h3>
    
    <?php if (empty($arResult['ITEMS'])): ?>
        <p>Новостей пока нет.</p>
    <?php else: ?>
        
        <ul class="news-items">
            <?php foreach ($arResult['ITEMS'] as $item): ?>
                <li style="margin-bottom: 20px;">
                    <div class="news-date" style="color: #888; font-size: 0.9em;">
                        <?php 
                        if ($item['DATE_OBJ'] instanceof DateTime) {
                            echo $item['DATE_OBJ']->format('d.m.Y'); 
                        } else {
                            echo "Дата не установлена";
                        }
                        ?>
                    </div>
                    
                    <div class="news-title">
                        <strong><?= htmlspecialcharsbx($item['NAME']) ?></strong>
                    </div>

                    <?php if ($item['PREVIEW_TEXT']): ?>
                        <div class="news-preview">
                            <?= htmlspecialcharsbx($item['PREVIEW_TEXT']) ?>
                        </div>
                    <?php endif; ?>
                </li>
            <?php endforeach; ?>
        </ul>

    <?php endif; ?>
</div>