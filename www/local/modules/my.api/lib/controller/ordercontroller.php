<?php

declare(strict_types=1);

namespace My\Api\Controller;

use Bitrix\Main\Context;
use Bitrix\Main\DI\ServiceLocator;
use Bitrix\Main\Engine\ActionFilter;
use Bitrix\Main\Engine\Controller;
use Bitrix\Main\Error;
use Bitrix\Main\HttpRequest;
use Local\DTO\OrderCreateDTO;
use Local\Service\OrderService;
use Bitrix\Main\Engine\CurrentUser;

class OrderController extends Controller
{
    /**
     * @return array<string, array<string, array<int, ActionFilter\Base|string>>>
     */
    public function configureActions(): array
    {
        return [
            'create' => [
                'prefilters' => [
                    new ActionFilter\HttpMethod([ActionFilter\HttpMethod::METHOD_POST]),
                ],
                '-prefilters' => [
                    ActionFilter\Csrf::class,
                ],
            ],
        ];
    }

    /**
     * Summary of createAction
     * @return array{order: array<string, mixed>, status: string|null}|null
     */
    public function createAction(): ?array
    {
        /**
         * @var HttpRequest $request
         */
        $request = Context::getCurrent()->getRequest();
        $rawBody = (string)$request->getInput();
        $payload = json_decode($rawBody, true);

        if (!\is_array($payload)) {
            $this->addError(new Error('Invalid JSON payload', 'INVALID_JSON'));
            return null;
        }

        /** @var array<string, array<string|mixed>|string|int|null> $payload */

        try {
            $dto = OrderCreateDTO::fromArray($payload);
        } catch (\InvalidArgumentException $e) {
            $this->addError(new Error($e->getMessage(), 'INVALID_PAYLOAD'));
            return null;
        }

        $userId = (int) CurrentUser::get()->getId();
        $siteId = Context::getCurrent()->getSite();

        $service = $this->getOrderService();
        $result = $service->createFromBasket($dto, $userId, $siteId);

        if (!$result->isSuccess()) {
            $this->addErrors($result->getErrors());
            return null;
        }

        return [
            'status' => 'success',
            'order'  => $result->getData(),
        ];
    }

    private function getOrderService(): OrderService
    {
        $service = ServiceLocator::getInstance()->get(OrderService::class);

        if (!$service instanceof OrderService) {
            throw new \RuntimeException('OrderService not found in ServiceLocator');
        }

        return $service;
    }
}
