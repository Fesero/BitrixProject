<?php

define("NO_KEEP_STATISTIC", true);
define("NOT_CHECK_PERMISSIONS", true);
define("BX_WITH_ON_AFTER_EPILOG", true);
define("BX_NO_ACCELERATOR_RESET", true);
define("CLI_MODE", true);
define("BX_BUFFER_USED", true);

if (file_exists(__DIR__ . '/../../vendor/autoload.php')) {
    require_once __DIR__ . '/../../vendor/autoload.php';
}

$_SERVER["DOCUMENT_ROOT"] = realpath(__DIR__ . '/../../');

require($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/main/include/prolog_before.php");
