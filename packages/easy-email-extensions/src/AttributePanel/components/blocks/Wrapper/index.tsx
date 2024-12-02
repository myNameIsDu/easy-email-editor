import React from 'react';
import { Padding } from '@extensions/AttributePanel/components/attributes//Padding';
import { Background } from '@extensions/AttributePanel/components/attributes//Background';
import { BorderInputField, TextField } from '@extensions/components/Form';
import { AttributesPanelWrapper } from '@extensions/AttributePanel/components/attributes/AttributesPanelWrapper';
import { Collapse, Grid } from '@arco-design/web-react';
import { Stack, useFocusIdx } from '@hy/easy-email-editor';
import { ClassName } from '../../attributes/ClassName';
import { CollapseWrapper } from '../../attributes/CollapseWrapper';
import { Border } from '../../attributes';

export function Wrapper() {
  const { focusIdx } = useFocusIdx();
  return (
    <AttributesPanelWrapper style={{ padding: 0 }}>
      <CollapseWrapper defaultActiveKey={['0', '1', '2']}>
        <Collapse.Item
          name='0'
          header={t('Dimension')}
        >
          <Stack
            vertical
            spacing='tight'
          >
            <Padding />
          </Stack>
        </Collapse.Item>
        <Collapse.Item
          name='1'
          header={t('Background')}
        >
          <Stack
            vertical
            spacing='tight'
          >
            <Background />
          </Stack>
        </Collapse.Item>
        <Collapse.Item
          name='2'
          header={t('Border')}
        >
          <Stack
            vertical
            spacing='tight'
          >
            <Border />
          </Stack>
        </Collapse.Item>
        <Collapse.Item
          name='4'
          header={t('ExtraAttribute')}
        >
          <Grid.Col span={24}>
            <ClassName />
          </Grid.Col>
        </Collapse.Item>
      </CollapseWrapper>
    </AttributesPanelWrapper>
  );
}
