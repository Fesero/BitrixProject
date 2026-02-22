<?php

namespace Local\Events;

use Bitrix\Main\Diag\FileLogger;
use Bitrix\Main\Application;

const NEWS_IBLOCK_ID = 1;

class LogsElementAdd
{
    /**
     * Summary of handleNews
     * @param array<string, int|string> $fields
     * @return void
     */
    public static function handleNews(array &$fields): void
    {
        if (empty($fields['ID'])) {
            return;
        }

        if ((int)$fields['IBLOCK_ID'] !== NEWS_IBLOCK_ID) {
            return;
        }

        $logDir = Application::getDocumentRoot() . '/local/logs/';
        $logFile = 'news_events.log';
        $fullPath = $logDir . $logFile;

        if (!is_dir($logDir)) {
            mkdir($logDir, 0775, true);
        }

        $logger = new FileLogger($fullPath);

        $date = date('Y-m-d H:i:s');

        $message = sprintf(
            "[%s] Добавлена новость: %s (ID: %d)" . PHP_EOL,
            $date,
            $fields['NAME'],
            $fields['ID']
        );

        $logger->info($message);
    }
}
