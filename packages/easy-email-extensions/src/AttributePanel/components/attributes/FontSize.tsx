import React from 'react';
import { useFocusIdx } from '@hy/easy-email-editor';
import { TextField } from '../../../components/Form';
import { pixelAdapter } from '../adapter';

export function FontSize() {
  const { focusIdx } = useFocusIdx();

  return (
    <TextField
      label={t('Font size (px)')}
      name={`${focusIdx}.attributes.font-size`}
      config={pixelAdapter}
      placeholder='e.g. 14'
      autoComplete='off'
    />
  );
}
