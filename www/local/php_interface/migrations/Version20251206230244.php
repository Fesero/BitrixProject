<?php

namespace Sprint\Migration;

class Version20251206230244 extends Version
{
    protected $author = "admin";

    protected $description = "";

    protected $moduleVersion = "5.6.0";

    public function up()
    {
        $helper = $this->getHelperManager();

        $iblockCode = 'news';

        $iblockId = $helper->Iblock()->getIblockIdIfExists($iblockCode, 'news');

        if (!$iblockId) {
            $this->outError('Инфоблок с кодом ' . $iblockCode . ' не найден!');
            return false;
        }

        for ($i = 1; $i <= 50; $i++) {
            $uniqString = uniqid();
            $name = "Новость №{$i} - [{$uniqString}]";
            $code = "news_{$i}";

            $fields = [
                'IBLOCK_ID'     => $iblockId,
                'NAME'          => $name,
                'CODE'          => $code,
                'ACTIVE'        => 'Y',
                'ACTIVE_FROM'   => date('d.m.Y H:i:s'),
                'PREVIEW_TEXT'  => "Это автоматически сгенерированное описание для новости №{$i}",
                'DETAIL_TEXT'   => "Детальный текст новости с уникальным ID {$uniqString}. Создано через sprint.migration.",
            ];

            try {
                $elementId = $helper->Iblock()->addElement($iblockId, $fields);

                if ($elementId) {
                    $this->out('Добавлена новость: ' . $name . ' (ID: ' . $elementId . ')');
                } else {
                    $this->outError('Ошибка добавления новости: ' . $name);
                }

            } catch (\Exception $e) {
                $this->outError('Исключение: ' . $e->getMessage());
            }
        }

        return true;
    }

    public function down()
    {
        $helper = $this->getHelperManager();
        $iblockCode = 'news';
        $iblockId = $helper->Iblock()->getIblockIdIfExists($iblockCode, 'news');

        if ($iblockId) {
            for ($i = 1; $i <= 50; $i++) {
                $code = "news_{$i}";

                $res = \CIBlockElement::GetList([], ['IBLOCK_ID' => $iblockId, '=CODE' => $code], false, false, ['ID']);
                while ($row = $res->Fetch()) {
                    \CIBlockElement::Delete($row['ID']);
                    $this->out('Удалена новость с кодом: ' . $code);
                }
            }
        }
    }
}
