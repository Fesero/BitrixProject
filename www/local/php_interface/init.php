<?php

if (file_exists($_SERVER['DOCUMENT_ROOT'] . '/vendor/autoload.php')) {
    require_once $_SERVER['DOCUMENT_ROOT'] . '/vendor/autoload.php';
}

use Bitrix\Main\EventManager;
use Bitrix\Main\Diag\FileLogger;
use Bitrix\Main\Application;

$eventManager = EventManager::getInstance();

$eventManager->addEventHandler(
    'iblock',
    'OnAfterIBlockElementAdd',
    ['Local\Events\LogsElementAdd', 'handleNews'],
);

$eventManager->addEventHandler(
    'local',
    'OnAfterRequestAdd',
    [Local\Events\RequestEventHandler::class, 'onAdd']
);
