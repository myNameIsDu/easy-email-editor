import React, { useMemo } from 'react';
import { useFocusIdx } from '@hy/easy-email-editor';
import { SelectField } from '../../../components/Form';

export const borderStyleOptions = [
  {
    value: 'dashed',
    get label() {
      return 'Dashed';
    },
  },
  {
    value: 'dotted',
    get label() {
      return 'Dotted';
    },
  },
  {
    value: 'solid',
    get label() {
      return 'Solid';
    },
  },
  {
    value: 'double',
    get label() {
      return 'double';
    },
  },
  {
    value: 'ridge',
    get label() {
      return 'ridge';
    },
  },
  {
    value: 'groove',
    get label() {
      return 'groove';
    },
  },
  {
    value: 'inset',
    get label() {
      return 'inset';
    },
  },
  {
    value: 'outset',
    get label() {
      return 'outset';
    },
  },
];

export function BorderStyle({ name }: { name?: string }) {
  const { focusIdx } = useFocusIdx();

  return (
    <SelectField
      label={t('lineStyle')}
      name={name || `${focusIdx}.attributes.border-style`}
      options={borderStyleOptions}
    />
  );
}
