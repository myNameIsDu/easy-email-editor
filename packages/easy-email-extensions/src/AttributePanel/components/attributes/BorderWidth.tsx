import React, { useMemo } from 'react';
import { useFocusIdx } from '@hy/easy-email-editor';
import { TextField } from '../../../components/Form';

export function BorderWidth({ name }: { name?: string }) {
  const { focusIdx } = useFocusIdx();

  return (
    <TextField
      label={t('Width')}
      quickchange
      name={name || `${focusIdx}.attributes.border-width`}
    />
  );
}
