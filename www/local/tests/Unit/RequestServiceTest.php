<?

use PHPUnit\Framework\TestCase;
use Local\Service\RequestService;
use Local\Repository\RequestRepositoryInterface;
use Local\Service\Event\EventDispatcherInterface;
use Local\DTO\RequestDTO;

class RequestServiceTest extends TestCase
{
    public function testCreateRequestSavesDataAndReturnsId()
    {
        $dto = new RequestDTO('Test User', '79001112233', 'Comment');

        $repositoryMock = $this->createMock(RequestRepositoryInterface::class);
        $repositoryMock->method('save')->willReturn(555);
        $repositoryMock->expects($this->once())->method('save');

        $eventDispatcherMock = $this->createMock(EventDispatcherInterface::class);
        $eventDispatcherMock
        ->expects($this->once())
        ->method('send')
        ->with(
            'local',
            'OnAfterRequestAdd',
            [
                'id' => 555,
                'fields' => $dto
            ]
            );

        $service = new RequestService($repositoryMock, $eventDispatcherMock);

        $resultId = $service->createRequest($dto);

        $this->assertEquals(555, $resultId);
    }
}