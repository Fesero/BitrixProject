<?php

use Bitrix\Main\ModuleManager;

class my_api extends CModule
{
    /** @var string */
    public $MODULE_ID = 'my.api';

    /** @var string */
    public $MODULE_VERSION;

    /** @var string */
    public $MODULE_VERSION_DATE;

    /** @var string */
    public $MODULE_NAME;

    /** @var string */
    public $MODULE_DESCRIPTION;

    public function __construct()
    {
        $this->MODULE_VERSION = '1.0.0';
        $this->MODULE_VERSION_DATE = '2023-10-10';
        $this->MODULE_NAME = "Мой API модуль";
        $this->MODULE_DESCRIPTION = "Модуль для REST API контроллеров";
    }

    public function DoInstall(): void
    {
        ModuleManager::registerModule($this->MODULE_ID);
    }

    public function DoUninstall(): void
    {
        ModuleManager::unRegisterModule($this->MODULE_ID);
    }
}
