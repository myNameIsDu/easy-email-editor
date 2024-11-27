import { Modal } from '@arco-design/web-react';
import { Stack, useBlock, useEditorProps } from '@hy/easy-email-editor';
import React, { useState } from 'react';
import { Form } from 'react-final-form';
import { TextField } from '../Form';

export const AddToCollection: React.FC<{
  visible: boolean;
  setVisible: (v: boolean) => void;
}> = ({ visible, setVisible }) => {
  const { focusBlock: focusBlockData } = useBlock();
  const { onAddCollection } = useEditorProps();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (values: { label: string; helpText: string; thumbnail: string }) => {
    if (!values.label) return;
    setIsLoading(true);
    onAddCollection?.({
      label: values.label,
      data: focusBlockData!,
    })
      .then(() => {
        setVisible(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Form
      initialValues={{ label: '', helpText: '', thumbnail: '' }}
      onSubmit={onSubmit}
    >
      {({ handleSubmit }) => (
        <Modal
          confirmLoading={isLoading}
          cancelButtonProps={{ disabled: isLoading }}
          maskClosable={false}
          style={{ zIndex: 2000 }}
          visible={visible}
          title={t('Add to collection')}
          onOk={() => handleSubmit()}
          onCancel={() => setVisible(false)}
        >
          <Stack vertical>
            <Stack.Item />
            <TextField
              label={t('Title')}
              name='label'
              validate={(val: string) => {
                if (!val) return t('Title required!');
                return undefined;
              }}
            />
          </Stack>
        </Modal>
      )}
    </Form>
  );
};
