<?php

declare(strict_types=1);

namespace Local\Infrastructure\DI;

use DI\ContainerBuilder;
use Psr\Container\ContainerInterface;

final class Container
{
    private static ?ContainerInterface $instance = null;

    public static function getInstance(): ContainerInterface
    {
        if (self::$instance === null) {
            self::$instance = self::build();
        }

        return self::$instance;
    }

    private static function build(): ContainerInterface
    {
        $builder = new ContainerBuilder();

        $builder->useAutowiring(true);

        $builder->useAttributes(false);

        $builder->addDefinitions(Bindings::get());

        return $builder->build();
    }

    private function __construct()
    {
    }
    private function __clone()
    {
    }
}
