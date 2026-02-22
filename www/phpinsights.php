<?php

declare(strict_types=1);

return [
    'preset' => 'default',
    'ide' => 'phpstorm',

    'exclude' => [
        'local/php_interface',
        'local/tests',
        'bitrix',
        'upload',
        'vendor',
    ],

    'add' => [],

    'remove' => [
        \NunoMaduro\PhpInsights\Domain\Insights\ForbiddenNormalClasses::class,
    ],

    'config' => [
        \PHP_CodeSniffer\Standards\Generic\Sniffs\Files\LineLengthSniff::class => [
            'lineLimit' => 120,
            'absoluteLineLimit' => 160,
        ],
        \SlevomatCodingStandard\Sniffs\Functions\FunctionLengthSniff::class => [
            'maxLinesLength' => 40,
        ],
    ],
];
