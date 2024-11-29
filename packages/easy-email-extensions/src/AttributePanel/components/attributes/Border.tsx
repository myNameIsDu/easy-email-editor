import React, { useMemo } from 'react';
import { TextField } from '../../../components/Form';
import { useFocusIdx } from '@hy/easy-email-editor';
import { Grid } from '@arco-design/web-react';

export function Border() {
  const { focusIdx } = useFocusIdx();

  return useMemo(() => {
    return (
      <Grid.Row>
        <Grid.Col span={11}>
          <TextField
            label={t('Border')}
            name={`${focusIdx}.attributes.border`}
            placeholder='e.g. 1px solid red'
          />
        </Grid.Col>
        <Grid.Col
          offset={1}
          span={11}
        >
          <TextField
            label={t('Border radius')}
            name={`${focusIdx}.attributes.border-radius`}
            placeholder='e.g. 10px 10px 10px 10px'
          />
        </Grid.Col>
      </Grid.Row>
    );
  }, [focusIdx]);
}
