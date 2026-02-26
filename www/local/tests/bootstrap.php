<?php

declare(strict_types=1);

// корень проекта в контейнере
$root = realpath(__DIR__ . '/../../'); // local/tests -> project root

if ($root === false) {
    throw new RuntimeException('Cannot resolve project root');
}

$_SERVER['DOCUMENT_ROOT'] = $root;
define('B_PROLOG_INCLUDED', true);

// composer autoload
$autoload = $root . '/vendor/autoload.php';
if (file_exists($autoload)) {
    require_once $autoload;
}

// Битрикс
$prolog = $root . '/bitrix/modules/main/include/prolog_before.php';
if (!file_exists($prolog)) {
    throw new RuntimeException('Bitrix prolog not found: ' . $prolog);
}

require_once $prolog;
