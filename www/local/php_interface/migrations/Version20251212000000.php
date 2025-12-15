<?php

namespace Sprint\Migration;

use Bitrix\Main\Application;
use Local\Model\RequestTable;

class Version20251212000000 extends Version
{
    protected $description = "Добавление USER_ID и Индекса в local_requests";

    protected $moduleVersion = "5.6.0";

    /**
     * @throws \Bitrix\Main\Db\SqlQueryException
     * @return bool|void
     */
    public function up()
    {
        $connection = Application::getConnection();
        $tableName = RequestTable::getTableName();

        if (!$connection->isTableExists($tableName)) {
            $this->outError("Таблица $tableName не найдена!");
            return false;
        }

        $sql = "ALTER TABLE `{$tableName}` ADD COLUMN `USER_ID` INT(11) NULL AFTER `ID`";
        $connection->queryExecute($sql);

        $indexSql = "CREATE INDEX `IX_LOCAL_REQUESTS_USER_ID` ON `{$tableName}` (`USER_ID`)";
        $connection->queryExecute($indexSql);

        $this->outSuccess("Поле USER_ID добавлено. Индекс создан.");
    }

    public function down()
    {
        $connection = Application::getConnection();
        $tableName = RequestTable::getTableName();

        $connection->queryExecute("DROP INDEX `IX_LOCAL_REQUESTS_USER_ID` ON `{$tableName}`");
        $connection->queryExecute("ALTER TABLE `{$tableName}` DROP COLUMN `USER_ID`");

        $this->outSuccess("Откат выполнен.");
    }
}