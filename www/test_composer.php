<?php
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/header.php");

// Функция dd() доступна благодаря Composer
$user = ['id' => 1, 'name' => 'Admin', 'skills' => ['php', 'docker', 'bitrix']];
dd($user); 

require($_SERVER["DOCUMENT_ROOT"]."/bitrix/footer.php");