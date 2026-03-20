<?php

namespace My\Api\Controller;

use Bitrix\Main\Engine\Controller;
use Bitrix\Main\Engine\ActionFilter;
use Bitrix\Main\Error;
use Local\Application\DTO\RequestDTO;
use Local\Application\Service\RequestService;
use Local\Infrastructure\DI\Container;

class RequestController extends Controller
{
    /**
     * Настраиваем префильтры (защиту)
     * @return array<string, array<string, array<string>>>
     */
    public function configureActions(): array
    {
        return [
            'add' => [
                '-prefilters' => [
                    ActionFilter\Csrf::class,
                    ActionFilter\Authentication::class,
                ],
            ],
            'list' => [
                '-prefilters' => [
                    ActionFilter\Csrf::class,
                    ActionFilter\Authentication::class,
                ],
            ],
        ];
    }

    /**
     * Summary of addAction
     * @return array{id: mixed, status: string|null}
     */
    public function addAction(): array|null
    {
        $request = $this->getRequest();

        $data = $request->getJsonList()->toArray();

        if (empty($data)) {
            $data = $request->getPostList()->toArray();
        }

        try {
            $service = $this->getRequestService();

            $id = $service->createRequest(new RequestDTO(
                $data['name'] ?? '',
                $data['phone'] ?? '',
                $data['comment'] ?? null
            ));

            return [
                'status' => 'success',
                'id' => $id
            ];
        } catch (\Exception $e) {
            $this->addError(new Error($e->getMessage()));

            return null;
        }
    }

    /**
     * Summary of listAction
     * @return array{data: mixed, status: string|null}
     */
    public function listAction(): array|null
    {
        try {
            $service = $this->getRequestService();

            $list = $service->getAll();

            return [
                'status' => 'success',
                'data' => $list
            ];

        } catch (\Exception $e) {
            $this->addError(new Error($e->getMessage()));

            return null;
        }
    }

    private function getRequestService(): RequestService
    {
        $service = Container::getInstance()->get(RequestService::class);

        if (!$service instanceof RequestService) {
            throw new \RuntimeException('RequestService not found');
        }

        return $service;
    }
}
