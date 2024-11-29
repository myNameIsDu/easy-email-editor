import React, { useCallback } from 'react';
import { TextField } from '../../../components/Form';
import { useFocusIdx, useBlock } from '@hy/easy-email-editor';
import { BasicType, getParentByIdx } from '@hy/easy-email-core';
import { InputWithUnitProps } from '@extensions/components/Form/InputWithUnit';
import { UseFieldConfig } from 'react-final-form';
import { percentAdapter } from '../adapter';

export function Width({
  inline = false,
  unitOptions,
  config,
  ...rest
}: {
  inline?: boolean;
  unitOptions?: InputWithUnitProps['unitOptions'];
  config?: UseFieldConfig<any>;
  placeholder?: string;
}) {
  const { focusIdx } = useFocusIdx();
  const { focusBlock, values } = useBlock();
  const parentType = getParentByIdx(values, focusIdx)?.type;

  const validate = useCallback(
    (val: string): string | undefined => {
      if (focusBlock?.type === BasicType.COLUMN && parentType === BasicType.GROUP) {
        return /(\d)*%/.test(val)
          ? undefined
          : t('Column inside a group must have a width in percentage, not in pixel');
      }
      return undefined;
    },
    [focusBlock?.type, parentType],
  );

  return (
    <TextField
      validate={validate}
      label={t('Width(%)')}
      inline={inline}
      config={percentAdapter}
      name={`${focusIdx}.attributes.width`}
      placeholder='e.g. 100%'
      {...rest}
    />
  );
}
