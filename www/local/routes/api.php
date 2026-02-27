<?php

use Bitrix\Main\Routing\RoutingConfigurator;
use My\Api\Controller\RequestController;
use My\Api\Controller\BasketController;
use My\Api\Controller\OrderController;

return function (RoutingConfigurator $routes) {
    $routes->any('/api/test', function () {
        return new \Bitrix\Main\Engine\Response\Json(['status' => 'Router works!']);
    });
    $routes->post('/api/v1/request/add', [RequestController::class, 'addAction']);
    $routes->get('/api/v1/request/list', [RequestController::class, 'listAction']);

    $routes->post('/api/v1/basket/add/{productId}/{quantity}', [BasketController::class, 'addAction']);
    $routes->post('/api/v1/basket/update/{productId}/{quantity}', [BasketController::class, 'updateAction']);
    $routes->post('/api/v1/basket/delete/{productId}', [BasketController::class, 'deleteAction']);
    $routes->get('/api/v1/basket/get', [BasketController::class, 'getAction']);

    $routes->post('/api/v1/order/create', [OrderController::class, 'createAction']);
};
