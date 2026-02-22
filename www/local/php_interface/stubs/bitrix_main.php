<?php

declare(strict_types=1);

namespace Bitrix\Main;

class Result
{
    public function isSuccess(): bool
    {
        return true;
    }

    /** @return Error[] */
    public function getErrors(): array
    {
        return [];
    }

    public function addError(Error $error): static
    {
        return $this;
    }

    /** @param Error[] $errors */
    public function addErrors(array $errors): static
    {
        return $this;
    }

    /** @param mixed $data */
    public function setData(mixed $data): static
    {
        return $this;
    }

    /** @return array<string, mixed> */
    public function getData(): array
    {
        return [];
    }
}

class Error
{
    public function __construct(
        private string $message,
        private string $code = ''
    ) {
    }

    public function getMessage(): string
    {
        return $this->message;
    }

    public function getCode(): string
    {
        return $this->code;
    }
}
