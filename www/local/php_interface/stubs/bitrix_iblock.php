<?php

declare(strict_types=1);

namespace Bitrix\Iblock;

class ElementTable
{
    /**
     * @param array<string, mixed> $parameters
     * @return \Bitrix\Main\ORM\Query\Result
     */
    public static function getList(array $parameters = []): \Bitrix\Main\ORM\Query\Result
    {
        return new \Bitrix\Main\ORM\Query\Result();
    }
}
