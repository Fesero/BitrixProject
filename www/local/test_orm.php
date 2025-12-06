<?php
require($_SERVER['DOCUMENT_ROOT'] . "/bitrix/header.php");

use Bitrix\Main\Loader;
use Bitrix\Iblock\Elements\ElementNewsTable;

Loader::IncludeModule('iblock');

$news = ElementNewsTable::getList([
    'select' => ['ID', 'NAME'],
])->fetchAll();

?>

<ul>
<?
foreach ($news as $newsItem) {
    echo "<li>ID: {$newsItem['ID']}, Name: {$newsItem['NAME']}</li>";
}
?>
</ul>

<?php

require($_SERVER['DOCUMENT_ROOT'] . "/bitrix/footer.php");