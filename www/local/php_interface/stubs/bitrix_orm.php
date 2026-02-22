<?php

declare(strict_types=1);

namespace Bitrix\Main\ORM\Query {

    class Result
    {
        /**
         * @return array<string, mixed>|false
         */
        public function fetch(): array|false
        {
            return false;
        }

        /**
         * @return array<int, array<string, mixed>>
         */
        public function fetchAll(): array
        {
            return [];
        }

        public function fetchObject(): object|null
        {
            return null;
        }

        public function fetchCollection(): \Bitrix\Iblock\Elements\ElementNewsCollection
        {
            return new \Bitrix\Iblock\Elements\ElementNewsCollection();
        }

        public function getSelectedRowsCount(): int
        {
            return 0;
        }
    }

    final class Query
    {
        /** @param array<int, string> $select @return $this */
        public function setSelect(array $select): self
        {
            return $this;
        }

        /** @param array<string, mixed> $filter @return $this */
        public function setFilter(array $filter): self
        {
            return $this;
        }

        /** @param array<string, string> $order @return $this */
        public function setOrder(array $order): self
        {
            return $this;
        }

        /** @return $this */
        public function setLimit(int $limit): self
        {
            return $this;
        }

        /** @return $this */
        public function setCacheTtl(int $ttl): self
        {
            return $this;
        }

        public function exec(): \Bitrix\Main\ORM\Query\Result
        {
            return new \Bitrix\Main\ORM\Query\Result();
        }
    }
}

namespace Bitrix\Main\ORM\Data {

    final class UpdateResult
    {
        public function isSuccess(): bool
        {
            return true;
        }

        /** @return string[] */
        public function getErrorMessages(): array
        {
            return [];
        }
    }
}

namespace Bitrix\Iblock\Elements {

    use Bitrix\Main\ORM\Query\Query;
    use Bitrix\Main\ORM\Entity;
    use Bitrix\Main\ORM\Query\Result;
    use Bitrix\Main\ORM\Data\UpdateResult;

    final class ElementNewsTable
    {
        /** @param array<string, mixed> $parameters */
        public static function getList(array $parameters = []): Result
        {
            return new Result();
        }

        public static function query(): Query
        {
            return new Query();
        }

        public static function getEntity(): Entity
        {
            return new Entity();
        }
    }

    final class ElementNews
    {
        public function setActive(string $value): void
        {
        }

        public function save(): UpdateResult
        {
            return new UpdateResult();
        }

        public function getId(): int
        {
            return 0;
        }

        public function getName(): string
        {
            return '';
        }

        public function getActiveFrom(): \DateTimeInterface|null
        {
            return null;
        }

        public function getPreviewText(): string|null
        {
            return null;
        }
    }

    /** @implements \IteratorAggregate<int, ElementNews> */
    final class ElementNewsCollection implements \IteratorAggregate
    {
        public function getIterator(): \Traversable
        {
            return new \ArrayIterator([]);
        }
    }
}

namespace Bitrix\Main\ORM {

    class Entity
    {
        public function getIblockId(): int
        {
            return 0;
        }
    }
}
