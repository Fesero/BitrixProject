<?php

namespace Sprint\Migration;

class Version20251206225809 extends Version
{
    protected $author = "admin";

    protected $description = "";

    protected $moduleVersion = "5.6.0";

    /**
     * @throws Exceptions\HelperException
     * @return bool|void
     */
    public function up()
    {
        $helper = $this->getHelperManager();
        $helper->Iblock()->saveIblockType([
  'ID' => 'news',
  'SECTIONS' => 'N',
  'EDIT_FILE_BEFORE' => null,
  'EDIT_FILE_AFTER' => null,
  'IN_RSS' => 'Y',
  'SORT' => '200',
  'LANG' =>
   [
    'ru' =>
     [
      'NAME' => 'Новости',
      'SECTION_NAME' => '',
      'ELEMENT_NAME' => 'Новости',
    ],
    'en' =>
     [
      'NAME' => 'News',
      'SECTION_NAME' => '',
      'ELEMENT_NAME' => 'News',
    ],
  ],
]);
        $iblockId = $helper->Iblock()->saveIblock([
  'IBLOCK_TYPE_ID' => 'news',
  'LID' =>
   [
    0 => 's1',
  ],
  'CODE' => 'news',
  'API_CODE' => 'News',
  'REST_ON' => 'N',
  'NAME' => 'Новости',
  'ACTIVE' => 'Y',
  'SORT' => '500',
  'LIST_PAGE_URL' => '#SITE_DIR#/news/',
  'DETAIL_PAGE_URL' => '#SITE_DIR#/news/#ELEMENT_CODE#/',
  'SECTION_PAGE_URL' => null,
  'CANONICAL_PAGE_URL' => '',
  'PICTURE' => null,
  'DESCRIPTION' => '',
  'DESCRIPTION_TYPE' => 'text',
  'RSS_TTL' => '24',
  'RSS_ACTIVE' => 'Y',
  'RSS_FILE_ACTIVE' => 'N',
  'RSS_FILE_LIMIT' => null,
  'RSS_FILE_DAYS' => null,
  'RSS_YANDEX_ACTIVE' => 'N',
  'XML_ID' => 'clothes_news_s1',
  'INDEX_ELEMENT' => 'Y',
  'INDEX_SECTION' => 'N',
  'WORKFLOW' => 'N',
  'BIZPROC' => 'N',
  'SECTION_CHOOSER' => 'L',
  'LIST_MODE' => '',
  'RIGHTS_MODE' => 'S',
  'SECTION_PROPERTY' => 'Y',
  'PROPERTY_INDEX' => 'N',
  'VERSION' => '1',
  'LAST_CONV_ELEMENT' => '0',
  'SOCNET_GROUP_ID' => null,
  'EDIT_FILE_BEFORE' => '',
  'EDIT_FILE_AFTER' => '',
  'SECTIONS_NAME' => 'Разделы',
  'SECTION_NAME' => 'Раздел',
  'ELEMENTS_NAME' => 'Новости',
  'ELEMENT_NAME' => 'Новость',
  'FULLTEXT_INDEX' => 'N',
  'EXTERNAL_ID' => 'clothes_news_s1',
  'LANG_DIR' => '/',
  'IPROPERTY_TEMPLATES' =>
   [
  ],
  'ELEMENT_ADD' => 'Добавить новость',
  'ELEMENT_EDIT' => 'Изменить новость',
  'ELEMENT_DELETE' => 'Удалить новость',
  'SECTION_ADD' => 'Добавить раздел',
  'SECTION_EDIT' => 'Изменить раздел',
  'SECTION_DELETE' => 'Удалить раздел',
]);
        $helper->Iblock()->saveIblockFields($iblockId, [
  'IBLOCK_SECTION' =>
   [
    'NAME' => 'Привязка к разделам',
    'IS_REQUIRED' => 'N',
    'DEFAULT_VALUE' =>
     [
      'KEEP_IBLOCK_SECTION_ID' => 'N',
    ],
    'VISIBLE' => 'Y',
  ],
  'ACTIVE' =>
   [
    'NAME' => 'Активность',
    'IS_REQUIRED' => 'Y',
    'DEFAULT_VALUE' => 'Y',
    'VISIBLE' => 'Y',
  ],
  'ACTIVE_FROM' =>
   [
    'NAME' => 'Начало активности',
    'IS_REQUIRED' => 'N',
    'DEFAULT_VALUE' => '=today',
    'VISIBLE' => 'Y',
  ],
  'ACTIVE_TO' =>
   [
    'NAME' => 'Окончание активности',
    'IS_REQUIRED' => 'N',
    'DEFAULT_VALUE' => '',
    'VISIBLE' => 'Y',
  ],
  'SORT' =>
   [
    'NAME' => 'Сортировка',
    'IS_REQUIRED' => 'N',
    'DEFAULT_VALUE' => '0',
    'VISIBLE' => 'Y',
  ],
  'NAME' =>
   [
    'NAME' => 'Название',
    'IS_REQUIRED' => 'Y',
    'DEFAULT_VALUE' => '',
    'VISIBLE' => 'Y',
  ],
  'PREVIEW_PICTURE' =>
   [
    'NAME' => 'Картинка для анонса',
    'IS_REQUIRED' => 'N',
    'DEFAULT_VALUE' =>
     [
      'FROM_DETAIL' => 'N',
      'UPDATE_WITH_DETAIL' => 'N',
      'DELETE_WITH_DETAIL' => 'N',
      'SCALE' => 'N',
      'WIDTH' => '',
      'HEIGHT' => '',
      'IGNORE_ERRORS' => 'N',
      'METHOD' => 'resample',
      'COMPRESSION' => 95,
      'USE_WATERMARK_TEXT' => 'N',
      'WATERMARK_TEXT' => '',
      'WATERMARK_TEXT_FONT' => '',
      'WATERMARK_TEXT_COLOR' => '',
      'WATERMARK_TEXT_SIZE' => '',
      'WATERMARK_TEXT_POSITION' => 'tl',
      'USE_WATERMARK_FILE' => 'N',
      'WATERMARK_FILE' => '',
      'WATERMARK_FILE_ALPHA' => '',
      'WATERMARK_FILE_POSITION' => 'tl',
      'WATERMARK_FILE_ORDER' => '',
    ],
    'VISIBLE' => 'Y',
  ],
  'PREVIEW_TEXT_TYPE' =>
   [
    'NAME' => 'Тип описания для анонса',
    'IS_REQUIRED' => 'Y',
    'DEFAULT_VALUE' => 'text',
    'VISIBLE' => 'Y',
  ],
  'PREVIEW_TEXT' =>
   [
    'NAME' => 'Описание для анонса',
    'IS_REQUIRED' => 'N',
    'DEFAULT_VALUE' => '',
    'VISIBLE' => 'Y',
  ],
  'DETAIL_PICTURE' =>
   [
    'NAME' => 'Детальная картинка',
    'IS_REQUIRED' => 'N',
    'DEFAULT_VALUE' =>
     [
      'SCALE' => 'N',
      'WIDTH' => '',
      'HEIGHT' => '',
      'IGNORE_ERRORS' => 'N',
      'METHOD' => 'resample',
      'COMPRESSION' => 95,
      'USE_WATERMARK_TEXT' => 'N',
      'WATERMARK_TEXT' => '',
      'WATERMARK_TEXT_FONT' => '',
      'WATERMARK_TEXT_COLOR' => '',
      'WATERMARK_TEXT_SIZE' => '',
      'WATERMARK_TEXT_POSITION' => 'tl',
      'USE_WATERMARK_FILE' => 'N',
      'WATERMARK_FILE' => '',
      'WATERMARK_FILE_ALPHA' => '',
      'WATERMARK_FILE_POSITION' => 'tl',
      'WATERMARK_FILE_ORDER' => '',
    ],
    'VISIBLE' => 'Y',
  ],
  'DETAIL_TEXT_TYPE' =>
   [
    'NAME' => 'Тип детального описания',
    'IS_REQUIRED' => 'Y',
    'DEFAULT_VALUE' => 'text',
    'VISIBLE' => 'Y',
  ],
  'DETAIL_TEXT' =>
   [
    'NAME' => 'Детальное описание',
    'IS_REQUIRED' => 'N',
    'DEFAULT_VALUE' => '',
    'VISIBLE' => 'Y',
  ],
  'XML_ID' =>
   [
    'NAME' => 'Внешний код',
    'IS_REQUIRED' => 'Y',
    'DEFAULT_VALUE' => '',
    'VISIBLE' => 'Y',
  ],
  'CODE' =>
   [
    'NAME' => 'Символьный код',
    'IS_REQUIRED' => 'Y',
    'DEFAULT_VALUE' =>
     [
      'UNIQUE' => 'Y',
      'TRANSLITERATION' => 'Y',
      'TRANS_LEN' => 100,
      'TRANS_CASE' => 'L',
      'TRANS_SPACE' => '_',
      'TRANS_OTHER' => '_',
      'TRANS_EAT' => 'Y',
      'USE_GOOGLE' => 'Y',
    ],
    'VISIBLE' => 'Y',
  ],
  'TAGS' =>
   [
    'NAME' => 'Теги',
    'IS_REQUIRED' => 'N',
    'DEFAULT_VALUE' => '',
    'VISIBLE' => 'Y',
  ],
  'SECTION_NAME' =>
   [
    'NAME' => 'Название',
    'IS_REQUIRED' => 'Y',
    'DEFAULT_VALUE' => '',
    'VISIBLE' => 'Y',
  ],
  'SECTION_PICTURE' =>
   [
    'NAME' => 'Картинка для анонса',
    'IS_REQUIRED' => 'N',
    'DEFAULT_VALUE' =>
     [
      'FROM_DETAIL' => 'N',
      'UPDATE_WITH_DETAIL' => 'N',
      'DELETE_WITH_DETAIL' => 'N',
      'SCALE' => 'N',
      'WIDTH' => '',
      'HEIGHT' => '',
      'IGNORE_ERRORS' => 'N',
      'METHOD' => 'resample',
      'COMPRESSION' => 95,
      'USE_WATERMARK_TEXT' => 'N',
      'WATERMARK_TEXT' => '',
      'WATERMARK_TEXT_FONT' => '',
      'WATERMARK_TEXT_COLOR' => '',
      'WATERMARK_TEXT_SIZE' => '',
      'WATERMARK_TEXT_POSITION' => 'tl',
      'USE_WATERMARK_FILE' => 'N',
      'WATERMARK_FILE' => '',
      'WATERMARK_FILE_ALPHA' => '',
      'WATERMARK_FILE_POSITION' => 'tl',
      'WATERMARK_FILE_ORDER' => '',
    ],
    'VISIBLE' => 'Y',
  ],
  'SECTION_DESCRIPTION_TYPE' =>
   [
    'NAME' => 'Тип описания',
    'IS_REQUIRED' => 'Y',
    'DEFAULT_VALUE' => 'text',
    'VISIBLE' => 'Y',
  ],
  'SECTION_DESCRIPTION' =>
   [
    'NAME' => 'Описание',
    'IS_REQUIRED' => 'N',
    'DEFAULT_VALUE' => '',
    'VISIBLE' => 'Y',
  ],
  'SECTION_DETAIL_PICTURE' =>
   [
    'NAME' => 'Детальная картинка',
    'IS_REQUIRED' => 'N',
    'DEFAULT_VALUE' =>
     [
      'SCALE' => 'N',
      'WIDTH' => '',
      'HEIGHT' => '',
      'IGNORE_ERRORS' => 'N',
      'METHOD' => 'resample',
      'COMPRESSION' => 95,
      'USE_WATERMARK_TEXT' => 'N',
      'WATERMARK_TEXT' => '',
      'WATERMARK_TEXT_FONT' => '',
      'WATERMARK_TEXT_COLOR' => '',
      'WATERMARK_TEXT_SIZE' => '',
      'WATERMARK_TEXT_POSITION' => 'tl',
      'USE_WATERMARK_FILE' => 'N',
      'WATERMARK_FILE' => '',
      'WATERMARK_FILE_ALPHA' => '',
      'WATERMARK_FILE_POSITION' => 'tl',
      'WATERMARK_FILE_ORDER' => '',
    ],
    'VISIBLE' => 'Y',
  ],
  'SECTION_XML_ID' =>
   [
    'NAME' => 'Внешний код',
    'IS_REQUIRED' => 'N',
    'DEFAULT_VALUE' => '',
    'VISIBLE' => 'Y',
  ],
  'SECTION_CODE' =>
   [
    'NAME' => 'Символьный код',
    'IS_REQUIRED' => 'N',
    'DEFAULT_VALUE' =>
     [
      'UNIQUE' => 'N',
      'TRANSLITERATION' => 'N',
      'TRANS_LEN' => 100,
      'TRANS_CASE' => 'L',
      'TRANS_SPACE' => '_',
      'TRANS_OTHER' => '_',
      'TRANS_EAT' => 'Y',
      'USE_GOOGLE' => 'N',
    ],
    'VISIBLE' => 'Y',
  ],
  'LOG_SECTION_ADD' =>
   [
    'NAME' => 'LOG_SECTION_ADD',
    'IS_REQUIRED' => 'N',
    'DEFAULT_VALUE' => null,
    'VISIBLE' => 'Y',
  ],
  'LOG_SECTION_EDIT' =>
   [
    'NAME' => 'LOG_SECTION_EDIT',
    'IS_REQUIRED' => 'N',
    'DEFAULT_VALUE' => null,
    'VISIBLE' => 'Y',
  ],
  'LOG_SECTION_DELETE' =>
   [
    'NAME' => 'LOG_SECTION_DELETE',
    'IS_REQUIRED' => 'N',
    'DEFAULT_VALUE' => null,
    'VISIBLE' => 'Y',
  ],
  'LOG_ELEMENT_ADD' =>
   [
    'NAME' => 'LOG_ELEMENT_ADD',
    'IS_REQUIRED' => 'N',
    'DEFAULT_VALUE' => null,
    'VISIBLE' => 'Y',
  ],
  'LOG_ELEMENT_EDIT' =>
   [
    'NAME' => 'LOG_ELEMENT_EDIT',
    'IS_REQUIRED' => 'N',
    'DEFAULT_VALUE' => null,
    'VISIBLE' => 'Y',
  ],
  'LOG_ELEMENT_DELETE' =>
   [
    'NAME' => 'LOG_ELEMENT_DELETE',
    'IS_REQUIRED' => 'N',
    'DEFAULT_VALUE' => null,
    'VISIBLE' => 'Y',
  ],
]);
        $helper->Iblock()->saveGroupPermissions($iblockId, [
  'administrators' => 'X',
  'everyone' => 'R',
]);
        $helper->Iblock()->saveProperty($iblockId, [
  'NAME' => 'Картинки новостей',
  'ACTIVE' => 'Y',
  'SORT' => '500',
  'CODE' => 'PICS_NEWS',
  'DEFAULT_VALUE' => '',
  'PROPERTY_TYPE' => 'F',
  'ROW_COUNT' => '1',
  'COL_COUNT' => '30',
  'LIST_TYPE' => 'L',
  'MULTIPLE' => 'Y',
  'XML_ID' => '240',
  'FILE_TYPE' => 'jpg, gif, bmp, png, jpeg',
  'MULTIPLE_CNT' => '5',
  'LINK_IBLOCK_ID' => '0',
  'WITH_DESCRIPTION' => 'N',
  'SEARCHABLE' => 'N',
  'FILTRABLE' => 'N',
  'IS_REQUIRED' => 'N',
  'VERSION' => '1',
  'USER_TYPE' => null,
  'USER_TYPE_SETTINGS' => 'a:0:{}',
  'HINT' => '',
  'SMART_FILTER' => 'N',
  'DISPLAY_TYPE' => '',
  'DISPLAY_EXPANDED' => 'N',
  'FILTER_HINT' => '',
]);

    }
}
