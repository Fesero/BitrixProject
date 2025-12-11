<?php
use Bitrix\Main\Localization\Loc;
use Bitrix\Main\ModuleManager;

class my_api extends CModule
{
    public $MODULE_ID = 'my.api';
    public $MODULE_VERSION;
    public $MODULE_VERSION_DATE;
    public $MODULE_NAME;
    public $MODULE_DESCRIPTION;

    public function __construct()
    {
        $this->MODULE_VERSION = '1.0.0';
        $this->MODULE_VERSION_DATE = '2023-10-10';
        $this->MODULE_NAME = "Мой API модуль";
        $this->MODULE_DESCRIPTION = "Модуль для REST API контроллеров";
    }

    public function DoInstall()
    {
        ModuleManager::registerModule($this->MODULE_ID);
    }

    public function DoUninstall()
    {
        ModuleManager::unRegisterModule($this->MODULE_ID);
    }
}