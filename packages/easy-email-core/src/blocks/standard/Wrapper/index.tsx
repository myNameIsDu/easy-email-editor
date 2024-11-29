import { IBlockData } from '@core/typings';
import { BasicType } from '@core/constants';
import React, { CSSProperties } from 'react';
import { createBlock } from '@core/utils/createBlock';
import { merge } from 'lodash';
import { BasicBlock } from '@core/components/BasicBlock';
import { t } from '@core/utils';

export type IWrapper = IBlockData<
  {
    'background-color'?: string;
    border?: string;
    'border-radius'?: string;
    'full-width'?: string;
    direction?: 'ltr' | 'rtl';
    padding?: string;
    'text-align'?: CSSProperties['textAlign'];
    'background-repeat'?: CSSProperties['backgroundRepeat'];
  },
  {}
>;

export const Wrapper = createBlock<IWrapper>({
  get name() {
    return t('Wrapper');
  },
  type: BasicType.WRAPPER,
  create: payload => {
    const defaultData: IWrapper = {
      type: BasicType.WRAPPER,
      data: {
        value: {},
      },
      attributes: {
        padding: '20px 0px 20px 0px',
        border: '',
        direction: 'ltr',
        'text-align': 'center',
        'background-repeat': 'repeat',
      },
      children: [],
    };
    return merge(defaultData, payload);
  },
  validParentType: [BasicType.PAGE],
  render(params) {
    return (
      <BasicBlock
        params={params}
        tag='mj-wrapper'
      />
    );
  },
});
