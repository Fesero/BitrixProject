<?php

declare(strict_types=1);

namespace Local\Application\Message;

class SendWebhook
{
    public function __construct(
        public int $requestId
    ) {
    }
}
