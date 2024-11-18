import React, { useMemo } from 'react';
import { useFocusIdx, IconFont } from 'easy-email-editor';
import { IconLink } from '@arco-design/web-react/icon';
import { SelectField, TextField } from '../../../components/Form';
import { Grid, Popover, Space, Button as ArcoButton } from '@arco-design/web-react';
import { MergeTags } from './MergeTags';
import { useField } from 'react-final-form';
import { useEditorProps } from 'easy-email-editor';

export function Link() {
  const { mergeTags } = useEditorProps();

  const { focusIdx } = useFocusIdx();
  const { input } = useField(`${focusIdx}.attributes.href`, {
    parse: v => v,
  });

  return useMemo(() => {
    return (
      <Grid.Row>
        <Grid.Col span={11}>
          <TextField
            prefix={<IconLink />}
            label={
              // eslint-disable-next-line react/jsx-wrap-multilines
              <Space>
                <span>{t('Href')}&nbsp;&nbsp;&nbsp;</span>
                {mergeTags && (
                  <Popover
                    trigger='click'
                    content={
                      // eslint-disable-next-line react/jsx-wrap-multilines
                      <MergeTags
                        value={input.value}
                        onChange={input.onChange}
                      />
                    }
                  >
                    <ArcoButton
                      type='text'
                      icon={<IconFont iconName='icon-merge-tags' />}
                    />
                  </Popover>
                )}
              </Space>
            }
            name={`${focusIdx}.attributes.href`}
          />
        </Grid.Col>
        <Grid.Col
          offset={1}
          span={11}
        >
          <SelectField
            label={t('Target')}
            name={`${focusIdx}.attributes.target`}
            options={[
              {
                value: '',
                label: t('_self'),
              },
              {
                value: '_blank',
                label: t('_blank'),
              },
            ]}
          />
        </Grid.Col>
      </Grid.Row>
    );
  }, [focusIdx]);
}
