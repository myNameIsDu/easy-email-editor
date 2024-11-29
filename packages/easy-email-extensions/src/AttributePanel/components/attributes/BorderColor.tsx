import React, { useMemo } from 'react';
import { ColorPickerField } from '../../../components/Form';
import { useFocusIdx } from '@hy/easy-email-editor';

export function BorderColor({ name }: { name?: string }) {
  const { focusIdx } = useFocusIdx();

  return (
    <ColorPickerField
      label={t('Color')}
      name={name || `${focusIdx}.attributes.border-color`}
    />
  );
}
