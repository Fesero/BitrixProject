#!/usr/bin/env php
<?php

define('NO_KEEP_STATISTIC', true);
define('NOT_CHECK_PERMISSIONS', true);
define('CHK_EVENT', true);

$_SERVER["DOCUMENT_ROOT"] = realpath(__DIR__ . '/../../');

if (!file_exists($_SERVER["DOCUMENT_ROOT"] . "/bitrix/modules/main/include/prolog_before.php")) {
    die("Error: Bitrix prologue not found at " . $_SERVER["DOCUMENT_ROOT"]);
}

require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/modules/main/include/prolog_before.php");
require $_SERVER["DOCUMENT_ROOT"] . '/vendor/autoload.php';

use Symfony\Component\Messenger\Worker;
use Local\Service\BusFactory;

echo "========================================\n";
echo "🚀 WORKER STARTED [Environment: Bitrix]\n";
echo "========================================\n";

[$bus, $transport] = BusFactory::create();

$worker = new Worker(
    ['default' => $transport],
    $bus
);

$worker->run([
    'sleep' => 1000,
]);
