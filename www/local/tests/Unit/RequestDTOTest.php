<?php

declare(strict_types=1);

use PHPUnit\Framework\TestCase;
use Local\DTO\RequestDTO;

class RequestDTOTest extends TestCase
{
    public function testConstructorSetsAllFields(): void
    {
        $dto = new RequestDTO(
            name: 'test',
            phone: '89999999999',
            comment: 'test comment'
        );

        $this->assertSame('test', $dto->name);
        $this->assertSame('89999999999', $dto->phone);
        $this->assertSame('test comment', $dto->comment);
    }

    public function testConstructorDefaultValues(): void
    {
        $dto = new RequestDTO(
            name: 'test',
            phone: '89999999999',
        );

        $this->assertNull($dto->comment);
    }

    public function testConstructorNameNull(): void
    {
        $this->expectException(\InvalidArgumentException::class);

        $dto = new RequestDTO('', '89999999999');
    }

    public function testConstructorPhoneNull(): void
    {
        $this->expectException(\InvalidArgumentException::class);

        $dto = new RequestDTO('test', '');
    }

    public function testDtoIsReadonly(): void
    {
        $this->expectException(\Error::class);

        $dto = new RequestDTO('test', '899999999999');

        $dto->name = 'test2';
    }
}
