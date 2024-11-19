/* eslint-disable react/jsx-wrap-multilines */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import template from '@demo/store/template';
import { useAppSelector } from '@demo/hooks/useAppSelector';
import { useLoading } from '@demo/hooks/useLoading';
import {
  Button,
  ConfigProvider,
  Dropdown,
  Menu,
  Message,
  PageHeader,
  Select,
} from '@arco-design/web-react';
import { useQuery } from '@demo/hooks/useQuery';
import { useHistory } from 'react-router-dom';
import { cloneDeep, set, isEqual } from 'lodash';
import { Loading } from '@demo/components/loading';
import mjml from 'mjml-browser';
import services from '@demo/services';
import { IconMoonFill, IconSunFill } from '@arco-design/web-react/icon';
import { Liquid } from 'liquidjs';
import { saveAs } from 'file-saver';
import {
  BlockAvatarWrapper,
  EmailEditor,
  EmailEditorProvider,
  EmailEditorProviderProps,
  IEmailTemplate,
} from 'easy-email-editor';

import { Stack } from '@demo/components/Stack';
import { pushEvent } from '@demo/utils/pushEvent';
import { FormApi } from 'final-form';
import { UserStorage } from '@demo/utils/user-storage';

import {
  AdvancedType,
  BasicType,
  BlockManager,
  IBlockData,
  JsonToMjml,
} from 'easy-email-core';
import {
  ExtensionProps,
  MjmlToJson,
  SimpleLayout,
  StandardLayout,
} from 'easy-email-extensions';
import { AutoSaveAndRestoreEmail } from '@demo/components/AutoSaveAndRestoreEmail';

// Register external blocks
import './components/CustomBlocks';

import 'easy-email-editor/lib/style.css';
import 'easy-email-extensions/lib/style.css';
import blueTheme from '@arco-themes/react-easy-email-theme/css/arco.css?inline';
import purpleTheme from '@arco-themes/react-easy-email-theme-purple/css/arco.css?inline';
import greenTheme from '@arco-themes/react-easy-email-theme-green/css/arco.css?inline';
import { testMergeTags } from './testMergeTags';
import { useMergeTagsModal } from './components/useMergeTagsModal';

import { useWindowSize } from 'react-use';
import { CustomBlocksType } from './components/CustomBlocks/constants';
import { Uploader } from '@demo/utils/Uploader';
import enUS from '@arco-design/web-react/es/locale/en-US';

import { useShowCommercialEditor } from '@demo/hooks/useShowCommercialEditor';

import locales from 'easy-email-localization/locales/locales.json';
import './index.scss';
import html2canvas from 'html2canvas';

const customObj = {
  label: '12312',
  data: {
    type: 'advanced_table',
    data: {
      value: {
        tableSource: [
          [
            {
              content: 'header1',
            },
            {
              content: 'header2',
            },
            {
              content: 'header3',
            },
          ],
          [
            {
              content: 'body1-1',
            },
            {
              content: 'body1-2',
            },
            {
              content: 'body1-3',
            },
          ],
          [
            {
              content: 'body2-1',
            },
            {
              content: 'body2-2',
            },
            {
              content: 'body2-3',
            },
          ],
        ],
      },
    },
    attributes: {
      cellBorderColor: '#000000',
      cellPadding: '8px',
      'text-align': 'center',
      padding: '   ',
    },
    children: [],
  },
  thumbnail: 'http://12123123',
  id: '85d2b021-7c83-41fe-a3c2-389c81ef8ca7',
};

const defaultCategories: ExtensionProps['categories'] = [
  {
    label: 'Content',
    active: true,
    blocks: [
      // {
      //   type: BasicType.WRAPPER,
      // },
      // {
      //   type: BasicType.SECTION,
      // },
      // {
      //   type: BasicType.COLUMN,
      // },
      // {
      //   type: BasicType.GROUP,
      // },
      {
        type: BasicType.TEXT,
      },
      {
        type: BasicType.IMAGE,
      },
      {
        type: BasicType.DIVIDER,
      },
      {
        type: BasicType.SPACER,
      },
      {
        type: BasicType.BUTTON,
      },
      // {
      //   type: BasicType.RAW,
      // },
      // {
      //   type: BasicType.ACCORDION,
      // },
      // {
      //   type: BasicType.ACCORDION_ELEMENT,
      // },
      // {
      //   type: BasicType.ACCORDION_TEXT,
      // },
      // {
      //   type: BasicType.ACCORDION_TITLE,
      // },
      // {
      //   type: BasicType.HERO,
      // },
      // {
      //   type: BasicType.CAROUSEL,
      // },
      {
        type: BasicType.NAVBAR,
      },
      {
        type: BasicType.SOCIAL,
      },
      {
        type: AdvancedType.TABLE,
      },
      // {
      //   type: BasicType.TABLE,
      // },
      // {
      //   type: BasicType.TEMPLATE,
      // },
      // {
      //   type: AdvancedType.IMAGE,
      //   payload: { attributes: { padding: '0px 0px 0px 0px' } },
      // },
      // {
      //   type: AdvancedType.BUTTON,
      // },
      // {
      //   type: AdvancedType.SOCIAL,
      // },
      // {
      //   type: AdvancedType.DIVIDER,
      // },
      // {
      //   type: AdvancedType.SPACER,
      // },
      // {
      //   type: AdvancedType.HERO,
      // },
      // {
      //   type: AdvancedType.WRAPPER,
      // },
      // {
      //   type: AdvancedType.SECTION,
      // },
      // {
      //   type: AdvancedType.TABLE,
      // },
      // {
      //   type: AdvancedType.ACCORDION,
      // },
    ],
  },
  {
    label: 'Layout',
    active: true,
    displayType: 'column',
    blocks: [
      {
        title: '1 column',
        payload: [['100%']],
      },
      {
        title: '2 columns',
        payload: [
          ['50%', '50%'],
          ['33%', '67%'],
          ['67%', '33%'],
          ['25%', '75%'],
          ['75%', '25%'],
        ],
      },
      {
        title: '3 columns',
        payload: [
          ['33.33%', '33.33%', '33.33%'],
          ['25%', '25%', '50%'],
          ['50%', '25%', '25%'],
        ],
      },
      {
        title: '4 columns',
        payload: [['25%', '25%', '25%', '25%']],
      },
    ],
  },
  {
    label: 'Custom',
    active: true,
    displayType: 'custom',
    blocks: [
      // <div className='custom-block-container'>
      //   <BlockAvatarWrapper
      //     type={customObj.data.type}
      //     payload={customObj.data}
      //   >
      //     <div className='custom-block-header'>{customObj.label}</div>
      //     <div className='custom-block-body'>{customObj.helpText}</div>
      //   </BlockAvatarWrapper>
      // </div>,
    ],
  },
];

const fontList = [
  'Arial',
  'Tahoma',
  'Verdana',
  'Times New Roman',
  'Courier New',
  'Georgia',
  'Lato',
  'Montserrat',
  '黑体',
  '仿宋',
  '楷体',
  '标楷体',
  '华文仿宋',
  '华文楷体',
  '宋体',
  '微软雅黑',
].map(item => ({ value: item, label: item }));

export default function Editor() {
  const [categories, setCategories] = useState(defaultCategories);
  const [customBlocks, setCustomBlocks] = useState([customObj]);

  const transformCustomBlocks = useCallback(customObj => {
    const wrappedBlockWithPage = BlockManager.getBlockByType(BasicType.PAGE).create({
      children: [customObj.data],
    });
    const mjmlString = JsonToMjml({
      data: wrappedBlockWithPage,
      mode: 'production',
      context: wrappedBlockWithPage,
      dataSource: {},
    });

    const html = mjml(mjmlString, { validationLevel: 'skip' }).html;
    const iframe = document.createElement('iframe');
    document.body.appendChild(iframe); // 👈 still required
    iframe.style.position = 'fixed';
    iframe.style.top = '-9999px';
    iframe.contentWindow.document.open();
    iframe.contentWindow.document.write(html);
    iframe.contentWindow.document.close();
    return html2canvas(iframe.contentWindow.document.body, {
      // foreignObjectRendering: true,
      allowTaint: true,
      useCORS: true,
    }).then(canvas => {
      return canvas.toDataURL();
    });
  }, []);

  // useEffect(() => {
  //   const wrappedBlockWithPage = BlockManager.getBlockByType(BasicType.PAGE).create({
  //     children: [customObj.data],
  //   });
  //   const mjmlString = JsonToMjml({
  //     data: wrappedBlockWithPage,
  //     mode: 'production',
  //     context: wrappedBlockWithPage,
  //     dataSource: {},
  //   });

  //   const html = mjml(mjmlString, { validationLevel: 'skip' }).html;
  //   const iframe = document.createElement('iframe');
  //   document.body.appendChild(iframe); // 👈 still required
  //   iframe.style.position = 'fixed';
  //   iframe.style.top = '-9999px';
  //   iframe.contentWindow.document.open();
  //   iframe.contentWindow.document.write(html);
  //   iframe.contentWindow.document.close();
  //   html2canvas(iframe.contentWindow.document.body, {
  //     foreignObjectRendering: true,
  //     // onrendered: function (newCanvas) {
  //     //   document.body.appendChild(newCanvas);
  //     // },
  //   }).then(canvas => {
  //     var dataURL = canvas.toDataURL();
  //     const newCategories = [...categories];
  //     newCategories[2].blocks.push(
  //       <div className='custom-block-container'>
  //         <BlockAvatarWrapper
  //           type={customObj.data.type}
  //           payload={customObj.data}
  //         >
  //           <div className='custom-block-header'>{customObj.label}</div>
  //           <div
  //             className='custom-block-body'
  //             style={{ backgroundImage: `url(${dataURL})`, color: 'red' }}
  //           ></div>
  //         </BlockAvatarWrapper>
  //       </div>,
  //     );
  //     setCategories(newCategories);
  //   });
  // }, [customBlocks]);
  const { featureEnabled } = useShowCommercialEditor();
  const dispatch = useDispatch();
  const history = useHistory();
  const templateData = useAppSelector('template');

  const { id, userId } = useQuery();
  const loading = useLoading(template.loadings.fetchById);
  const { mergeTags, setMergeTags } = useMergeTagsModal(testMergeTags);

  useEffect(() => {
    if (id) {
      if (!userId) {
        UserStorage.getAccount().then(account => {
          dispatch(template.actions.fetchById({ id: +id, userId: account.user_id }));
        });
      } else {
        dispatch(template.actions.fetchById({ id: +id, userId: +userId }));
      }
    } else {
      dispatch(template.actions.fetchDefaultTemplate(undefined));
    }

    return () => {
      dispatch(template.actions.set(null));
    };
  }, [dispatch, id, userId]);

  const onUploadImage = async (blob: Blob) => {
    return services.common.uploadByQiniu(blob);
  };

  const onChangeMergeTag = useCallback((path: string, val: any) => {
    setMergeTags(old => {
      const newObj = cloneDeep(old);
      set(newObj, path, val);
      return newObj;
    });
  }, []);

  const onImportMJML = async ({
    restart,
  }: {
    restart: (val: IEmailTemplate) => void;
  }) => {
    const uploader = new Uploader(() => Promise.resolve(''), {
      accept: 'text/mjml',
      limit: 1,
    });

    const [file] = await uploader.chooseFile();
    const reader = new FileReader();
    const pageData = await new Promise<[string, IEmailTemplate['content']]>(
      (resolve, reject) => {
        reader.onload = function (evt) {
          if (!evt.target) {
            reject();
            return;
          }
          try {
            const pageData = MjmlToJson(evt.target.result as any);
            resolve([file.name, pageData]);
          } catch (error) {
            reject();
          }
        };
        reader.readAsText(file);
      },
    );

    restart({
      subject: pageData[0],
      content: pageData[1],
      subTitle: '',
    });
  };

  const onImportJSON = async ({
    restart,
  }: {
    restart: (val: IEmailTemplate) => void;
  }) => {
    const uploader = new Uploader(() => Promise.resolve(''), {
      accept: 'application/json',
      limit: 1,
    });

    const [file] = await uploader.chooseFile();
    const reader = new FileReader();
    const emailTemplate = await new Promise<IEmailTemplate>((resolve, reject) => {
      reader.onload = function (evt) {
        if (!evt.target) {
          reject();
          return;
        }
        try {
          const template = JSON.parse(evt.target.result as any) as IEmailTemplate;
          resolve(template);
        } catch (error) {
          reject();
        }
      };
      reader.readAsText(file);
    });

    restart({
      subject: emailTemplate.subject,
      content: emailTemplate.content,
      subTitle: emailTemplate.subTitle,
    });
  };

  const onExportMJML = (values: IEmailTemplate) => {
    const mjmlString = JsonToMjml({
      data: values.content,
      mode: 'production',
      context: values.content,
      dataSource: mergeTags,
    });

    pushEvent({ event: 'MJMLExport', payload: { values, mergeTags } });
    navigator.clipboard.writeText(mjmlString);
    saveAs(new Blob([mjmlString], { type: 'text/mjml' }), 'easy-email.mjml');
  };

  const onExportHTML = (values: IEmailTemplate) => {
    const mjmlString = JsonToMjml({
      data: values.content,
      mode: 'production',
      context: values.content,
      dataSource: mergeTags,
    });

    const html = mjml(mjmlString, {}).html;

    pushEvent({ event: 'HTMLExport', payload: { values, mergeTags } });
    navigator.clipboard.writeText(html);
    saveAs(new Blob([html], { type: 'text/html' }), 'easy-email.html');
  };

  const onExportJSON = (values: IEmailTemplate) => {
    navigator.clipboard.writeText(JSON.stringify(values, null, 2));
    saveAs(
      new Blob([JSON.stringify(values, null, 2)], { type: 'application/json' }),
      'easy-email.json',
    );
  };

  const initialValues: IEmailTemplate | null = useMemo(() => {
    if (!templateData) return null;
    const sourceData = cloneDeep(templateData.content) as IBlockData;
    return {
      ...templateData,
      content: sourceData, // replace standard block
    };
  }, [templateData]);

  // const onSubmit = useCallback(
  //   async (values: IEmailTemplate) => {
  //     console.log(values);
  //   },
  //   [dispatch, history, id, initialValues],
  // );

  // const onBeforePreview: EmailEditorProviderProps['onBeforePreview'] = useCallback(
  //   (html: string, mergeTags) => {
  //     const engine = new Liquid();
  //     const tpl = engine.parse(html);
  //     return engine.renderSync(tpl, mergeTags);
  //   },
  //   [],
  // );

  if (!templateData && loading) {
    return (
      <Loading loading={loading}>
        <div style={{ height: '100vh' }} />
      </Loading>
    );
  }

  if (!initialValues) return null;

  return (
    <ConfigProvider locale={enUS}>
      <div>
        <style>{blueTheme}</style>
        <EmailEditorProvider
          key={id}
          height={featureEnabled ? 'calc(100vh - 108px)' : 'calc(100vh - 68px)'}
          data={initialValues}
          onUploadImage={onUploadImage}
          fontList={fontList}
          onAddCollection={payload => {
            transformCustomBlocks(payload).then(dataURL => {
              const newCategories = [...categories];
              newCategories[2].blocks.push(
                <div className='custom-block-container'>
                  <BlockAvatarWrapper
                    type={payload.data.type}
                    payload={payload.data}
                  >
                    <div className='custom-block-header'>{payload.label}</div>
                    <div
                      className='custom-block-body'
                      style={{ backgroundImage: `url(${dataURL})`, color: 'red' }}
                    ></div>
                  </BlockAvatarWrapper>
                </div>,
              );
              setCategories(newCategories);
            });
          }}
          // onSubmit={onSubmit}
          // onChangeMergeTag={onChangeMergeTag}
          autoComplete
          dashed={false}
          // mergeTags={mergeTags}
          // mergeTagGenerate={tag => `{{${tag}}}`}
          // onBeforePreview={onBeforePreview}
          locale={locales['zh-Hans']}
        >
          {({ values }, { submit, restart }) => {
            return (
              <>
                <PageHeader
                  style={{ background: 'var(--color-bg-2)' }}
                  backIcon
                  title='Edit'
                  onBack={() => history.push('/')}
                  extra={
                    <Stack alignment='center'>
                      <Dropdown
                        droplist={
                          <Menu>
                            <Menu.Item
                              key='MJML'
                              onClick={() => onImportMJML({ restart })}
                            >
                              Import from MJML
                            </Menu.Item>

                            <Menu.Item
                              key='JSON'
                              onClick={() => onImportJSON({ restart })}
                            >
                              Import from JSON
                            </Menu.Item>
                          </Menu>
                        }
                      >
                        <Button>
                          <strong>Import</strong>
                        </Button>
                      </Dropdown>

                      <Dropdown
                        droplist={
                          <Menu>
                            <Menu.Item
                              key='Export MJML'
                              onClick={() => onExportMJML(values)}
                            >
                              Export MJML
                            </Menu.Item>
                            <Menu.Item
                              key='Export HTML'
                              onClick={() => onExportHTML(values)}
                            >
                              Export HTML
                            </Menu.Item>
                            <Menu.Item
                              key='Export JSON'
                              onClick={() => onExportJSON(values)}
                            >
                              Export JSON
                            </Menu.Item>
                          </Menu>
                        }
                      >
                        <Button>
                          <strong>Export</strong>
                        </Button>
                      </Dropdown>
                      <Button
                        type='primary'
                        target='_blank'
                        href='https://demo.easyemail.pro?utm_source=easyemail'
                      >
                        Try commercial version
                      </Button>
                    </Stack>
                  }
                />

                <StandardLayout
                  // compact={false}
                  // showSourceCode={false}
                  categories={categories}
                >
                  <EmailEditor />
                </StandardLayout>
                {/* <SimpleLayout>
                  <EmailEditor />
                </SimpleLayout> */}
                <AutoSaveAndRestoreEmail />
              </>
            );
          }}
        </EmailEditorProvider>
      </div>
    </ConfigProvider>
  );
}
