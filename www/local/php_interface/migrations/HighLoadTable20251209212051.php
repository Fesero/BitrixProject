<?php

namespace Sprint\Migration;

use Local\Model\RequestTable;
use Bitrix\Main\Application;
use Bitrix\Main\Entity\Base;

class HighLoadTable20251209212051 extends Version
{
    protected $author = "admin";

    protected $description = "Создание таблицы local_requests через ORM Entity";

    protected $moduleVersion = "5.6.0";

    public function up()
    {
        $helper = $this->getHelperManager();

        $connection = Application::getConnection();
        $tableName = RequestTable::getTableName();

        if (!$connection->isTableExists($tableName)) {
            RequestTable::getEntity()->createDbTable();
            
            $this->outSuccess("Таблица {$tableName} успешно создана через ORM.");
        } else {
            $this->out("Таблица {$tableName} уже существует.");
        }
    }

    public function down()
    {
        $connection = Application::getConnection();
        $tableName = RequestTable::getTableName();

        if ($connection->isTableExists($tableName)) {
            $connection->dropTable($tableName);
            $this->outSuccess("Таблица {$tableName} удалена.");
        }
    }
}
