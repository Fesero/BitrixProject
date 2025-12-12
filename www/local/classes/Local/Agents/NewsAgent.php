<?php

namespace Local\Agents;

use Bitrix\Iblock\Elements\ElementNewsTable;
use Bitrix\Main\Loader;
use Bitrix\Main\Type\DateTime;

class NewsAgent
{
    public static function deactivateOldNews()
    {
        if (!Loader::IncludeModule('iblock')) {
            return;
        }

        $date = new DateTime();
        $date->add('-30 day');

        $news = ElementNewsTable::getList([
            'select' => ['ID'],
            'filter' => [
                'ACTIVE' => 'Y',
                '<=ACTIVE_FROM' => $date,
            ]
            ]);

        while ($item = $news->fetchObject()) {
            $item->setActive('N');

            $result = $item->save();

            if ($result->isSuccess()) {
                echo "Объект успешно сохранен!";
            } else {
                print_r($result->getErrorMessages());
            }
        }

        return "\Local\Agents\NewsAgent::deactivateOldNews();";
    }
}
