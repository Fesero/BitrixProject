<?php

use Bitrix\Main\Routing\RoutingConfigurator;
use My\Api\Controller\RequestController;

return function (RoutingConfigurator $routes) {
    $routes->any('/api/test', function () {
        return new \Bitrix\Main\Engine\Response\Json(['status' => 'Router works!']);
    });
    $routes->post('/api/v1/request/add', [RequestController::class, 'addAction']);
};
