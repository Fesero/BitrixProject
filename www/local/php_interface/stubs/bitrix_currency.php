<?php

declare(strict_types=1);

namespace {
    class CCurrencyLang
    {
        public static function CurrencyFormat(float $price, string $currency, bool $useTemplate = true): string
        {
            return '';
        }
    }

    class CFile
    {
        public static function GetPath(int $fileId): string
        {
            return '';
        }
    }
}

namespace Bitrix\Currency {
    final class CurrencyManager
    {
        public static function getBaseCurrency(): string
        {
            return 'RUB';
        }
    }
}
