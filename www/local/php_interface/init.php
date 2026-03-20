<?php

/**
 * @var string $docRoot
 */
$docRoot = $_SERVER['DOCUMENT_ROOT'] ?? '';
if ($docRoot !== '' && file_exists("$docRoot/vendor/autoload.php")) {
    require_once "$docRoot/vendor/autoload.php";
}

use Bitrix\Main\EventManager;

$eventManager = EventManager::getInstance();

$eventManager->addEventHandler(
    'iblock',
    'OnAfterIBlockElementAdd',
    [Local\Infrastructure\EventHandler\LogsElementAdd::class, 'handleNews'],
);

$eventManager->addEventHandler(
    'local',
    'OnAfterRequestAdd',
    [Local\Infrastructure\EventHandler\RequestEventHandler::class, 'onAdd']
);
