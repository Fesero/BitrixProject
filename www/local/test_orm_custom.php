<?php

// Подключаем пролог (консольный режим или браузер)
require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/modules/main/include/prolog_before.php");

use Local\Model\RequestTable;

// Если класс не автозагружается через composer, подключим вручную для теста:
// require_once $_SERVER["DOCUMENT_ROOT"] . '/local/src/Model/RequestTable.php';

global $APPLICATION;

echo "<pre>";

// 1. Успешное добавление
try {
    $result = RequestTable::add([
        'USER_NAME' => 'Иван Иванов',
        'PHONE'     => '79001234567',
        'COMMENT'   => 'Тестовая заявка',
        // CREATED_AT не передаем, он должен заполниться сам
    ]);

    if ($result->isSuccess()) {
        echo "✅ Запись добавлена успешно! ID: " . $result->getId() . "\n";

        // Проверим, что записалось (в т.ч. дату)
        $data = RequestTable::getById($result->getId())->fetch();
        print_r($data);
    } else {
        echo "❌ Ошибка добавления: " . implode(', ', $result->getErrorMessages()) . "\n";
    }

} catch (\Exception $e) {
    echo "❌ Исключение: " . $e->getMessage() . "\n";
}

echo "---------------------------------------------------\n";

// 2. Попытка добавить запись с ошибкой валидации (текст в телефоне)
try {
    echo "Попытка добавить некорректный телефон...\n";

    $resultError = RequestTable::add([
        'USER_NAME' => 'Петр Петров',
        'PHONE'     => 'NOT_A_NUMBER', // Ошибка здесь
        'COMMENT'   => 'Это должно упасть',
    ]);

    if ($resultError->isSuccess()) {
        echo "❌ Ошибка! Запись добавилась, хотя не должна была.\n";
    } else {
        echo "✅ Валидация сработала корректно. Ошибки:\n";
        foreach ($resultError->getErrorMessages() as $message) {
            echo " - " . $message . "\n";
        }
    }

} catch (\Exception $e) {
    echo "❌ Исключение: " . $e->getMessage() . "\n";
}

echo "</pre>";

require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/modules/main/include/epilog_after.php");
