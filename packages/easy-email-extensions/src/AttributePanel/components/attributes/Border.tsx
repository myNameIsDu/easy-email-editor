import React, { useMemo } from 'react';
import { BorderInputField, TextField } from '../../../components/Form';
import { Stack, useFocusIdx } from '@hy/easy-email-editor';

export function Border() {
  const { focusIdx } = useFocusIdx();

  return useMemo(() => {
    return (
      <Stack>
        <BorderInputField name={`${focusIdx}.attributes.border`} />

        <TextField
          label={t('Border radius')}
          name={`${focusIdx}.attributes.border-radius`}
          placeholder='e.g. 10px 10px 10px 10px'
        />
      </Stack>
    );
  }, [focusIdx]);
}
