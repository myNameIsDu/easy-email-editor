import { Modal } from '@arco-design/web-react';
import { Stack, useBlock, useEditorProps } from 'easy-email-editor';
import React from 'react';
import { Form } from 'react-final-form';
import { TextField } from '../Form';

export const AddToCollection: React.FC<{
  visible: boolean;
  setVisible: (v: boolean) => void;
}> = ({ visible, setVisible }) => {
  const { focusBlock: focusBlockData } = useBlock();
  const { onAddCollection } = useEditorProps();

  const onSubmit = (values: { label: string; helpText: string; thumbnail: string }) => {
    if (!values.label) return;
    onAddCollection?.({
      label: values.label,
      data: focusBlockData!,
    });
    setVisible(false);
  };

  return (
    <Form
      initialValues={{ label: '', helpText: '', thumbnail: '' }}
      onSubmit={onSubmit}
    >
      {({ handleSubmit }) => (
        <Modal
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
