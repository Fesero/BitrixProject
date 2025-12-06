<?php
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/header.php");

use Bitrix\Main\Loader;
use Bitrix\Main\Application;
use Bitrix\Main\Engine\CurrentUser;

Loader::includeModule('iblock');

$application = Application::getInstance();

$request = $application->getContext()->getRequest();

echo htmlspecialchars($request->get('hello'));

$user = CurrentUser::get();

?>
ID: <?= $user->getId();?>
Login: <?= $user->getLogin();?>
<?php

require($_SERVER["DOCUMENT_ROOT"]."/bitrix/footer.php");
