import { Switch } from '@arco-design/web-react';
import { BorderColor, BorderStyle, BorderWidth } from '@extensions/AttributePanel';
import React, { useEffect, useCallback } from 'react';
import { Form } from 'react-final-form';
import { createForm } from 'final-form';
import { Stack } from '@hy/easy-email-editor';

interface BorderInputProps {
  value: string;
  onChange: (val: string) => void;
  forwardLabel?: string;
}

const defaultFormValue = {
  width: '1px',
  style: 'solid',
  color: '#AAAAAA',
};
const defaultBorderValue = `${defaultFormValue['width']} ${defaultFormValue['style']} ${defaultFormValue['color']}`;

const form = createForm({
  initialValues: defaultFormValue,
  // 无意义的 onSubmit 这里只是为了不让类型报错
  onSubmit: () => {},
});

function BorderForm({ onChange }: { onChange: (val: string) => void }) {
  const handleFormChange = useCallback(
    ({ values }) => {
      const { width, style, color } = values;
      width && style && color && onChange(`${width} ${style} ${color}`);
    },
    [onChange],
  );
  useEffect(() => {
    return form.subscribe(handleFormChange, { values: true });
  }, [handleFormChange]);

  return (
    <Form
      form={form}
      // 无意义的 onSubmit 这里只是为了不让类型报错
      onSubmit={() => {}}
    >
      {() => (
        <Stack
          wrap={false}
          spacing='tight'
        >
          <div style={{ width: 50 }}>
            <BorderWidth name='width' />
          </div>
          <div style={{ width: 100 }}>
            <BorderStyle name='style' />
          </div>
          <div style={{ width: 100 }}>
            <BorderColor name='color' />
          </div>
        </Stack>
      )}
    </Form>
  );
}

export function BorderInput({ value, onChange, forwardLabel }: BorderInputProps) {
  const isCheck = !!value ? true : false;

  const handleOnChangedChange = (checked: boolean) => {
    if (checked) {
      onChange(defaultBorderValue);
    } else {
      onChange('');
    }
  };

  const label = (
    <div
      style={{
        height: 32,
        lineHeight: '32px',
        fontSize: 14,
        color: 'var(--color-text-2)',
      }}
    >
      {forwardLabel ? forwardLabel : t('Border')}
    </div>
  );

  if (!isCheck) {
    return (
      <Stack alignment='center'>
        {label}
        <Switch
          onChange={handleOnChangedChange}
          checked={isCheck}
        />
      </Stack>
    );
  }
  return (
    <>
      <Stack alignment='center'>
        {label}
        <Switch
          onChange={handleOnChangedChange}
          checked={isCheck}
        />
      </Stack>
      <BorderForm onChange={onChange} />
    </>
  );
}
