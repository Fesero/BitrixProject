<?php
declare(strict_types=1);

namespace Local\Message;

class SendWebhook
{
    public function __construct(
        public int $requestId
    ) {}
}