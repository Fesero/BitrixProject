<?php

namespace Local\Application\DTO;

class RequestDTO
{
    public function __construct(
        public readonly string $name,
        public readonly string $phone,
        public readonly ?string $comment
    ) {
        if (empty($this->name)) {
            throw new \InvalidArgumentException('Name cannot be empty');
        }

        if (empty($this->phone)) {
            throw new \InvalidArgumentException('Phone cannot be empty');
        }
    }
}
