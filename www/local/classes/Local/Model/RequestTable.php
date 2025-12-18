<?php

namespace Local\Model;

use Bitrix\Main\ORM\Data\DataManager;
use Bitrix\Main\ORM\Fields;
use Bitrix\Main\ORM\Fields\Relations\Reference;
use Bitrix\Main\ORM\Query\Join;
use Bitrix\Main\UserTable;
use Bitrix\Main\ORM\Fields\Validators\RegExpValidator;
use Bitrix\Main\Type\DateTime;
use Bitrix\Main\Localization\Loc;

Loc::loadMessages(__FILE__);

class RequestTable extends DataManager
{
    public static function getTableName()
    {
        return 'local_requests';
    }

    public static function getMap()
    {
        return [
            (new Fields\IntegerField('ID'))
                ->configurePrimary(true)
                ->configureAutocomplete(true)
                ->configureTitle('ID'),

            (new Fields\IntegerField('USER_ID'))
                ->configureNullable(true)
                ->configureTitle('ID Пользователя'),

            (new Reference(
                    'MY_USER',
                    UserTable::class,
                    Join::on('this.USER_ID', 'ref.ID')
                ))->configureJoinType(Join::TYPE_LEFT),

            (new Fields\StringField('USER_NAME'))
                ->configureRequired(true)
                ->configureTitle('Имя пользователя'),

            (new Fields\StringField('PHONE'))
                ->configureRequired(true)
                ->configureTitle('Телефон')
                ->addValidator(
                    new RegExpValidator('/^[0-9]+$/', 'Телефон должен содержать только цифры')
                ),

            (new Fields\TextField('COMMENT'))
                ->configureNullable(true)
                ->configureTitle('Комментарий'),

            (new Fields\DatetimeField('CREATED_AT'))
                ->configureDefaultValue(function () {
                    return new DateTime();
                })
                ->configureTitle('Дата создания'),
            ];
    }
}
