import React from 'react';
import { InputWithUnitField, TextField } from '../../../components/Form';
import { useFocusIdx } from '@hy/easy-email-editor';
import { pixelAdapter } from '../adapter';

export function LetterSpacing({ name }: { name?: string }) {
  const { focusIdx } = useFocusIdx();

  return (
    <TextField
      label={t('Letter spacing(PX)')}
      config={pixelAdapter}
      name={name || `${focusIdx}.attributes.letter-spacing`}
      placeholder='e.g.: 10'
    />
  );
}
