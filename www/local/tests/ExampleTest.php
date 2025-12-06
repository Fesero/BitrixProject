<?php

use PHPUnit\Framework\TestCase;

class ExampleTest extends TestCase
{
    public function testBitrixIsLoaded(): void
    {
        $this->assertTrue(defined('B_PROLOG_INCLUDED'));
    }

    public function testUserAdminExists(): void
    {
        $user = \CUser::GetByID(1)->Fetch();
        $this->assertEquals('admin', $user['LOGIN']);
    }
}
