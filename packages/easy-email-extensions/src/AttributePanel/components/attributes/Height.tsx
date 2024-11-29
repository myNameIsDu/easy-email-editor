import React, { useMemo } from 'react';
import { TextField } from '../../../components/Form';
import { useFocusIdx, Stack } from '@hy/easy-email-editor';
import { UseFieldConfig } from 'react-final-form';
import { pixelAdapter } from '../adapter';

export function Height({ inline }: { inline?: boolean; config?: UseFieldConfig<any> }) {
  const { focusIdx } = useFocusIdx();

  return useMemo(() => {
    return (
      <Stack wrap={false}>
        <Stack.Item fill>
          <TextField
            label={t('Height(PX)')}
            name={`${focusIdx}.attributes.height`}
            quickchange
            config={pixelAdapter}
            placeholder='e.g. 100'
          />
        </Stack.Item>
      </Stack>
    );
  }, [focusIdx, inline]);
}
