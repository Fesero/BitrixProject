<?php
namespace My\Api\Controller;

use Bitrix\Main\Engine\Controller;
use Bitrix\Main\Engine\ActionFilter;
use Bitrix\Main\DI\ServiceLocator;
use Bitrix\Main\Error;
use Local\DTO\RequestDTO;

class RequestController extends Controller
{
    /**
     * Настраиваем префильтры (защиту)
     */
    public function configureActions()
    {
        return [
            'add' => [
                '-prefilters' => [
                    ActionFilter\Csrf::class,
                    ActionFilter\Authentication::class,
                ],
            ],
        ];
    }

    public function addAction()
    {
        $request = $this->getRequest();

        $data = $request->getJsonList()->toArray();

        if (empty($data)) {
            $data = $request->getPostList()->toArray();
        }

        try {
            $service = ServiceLocator::getInstance()->get('RequestService');

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
}