import React from 'react';

import { shallow } from 'enzyme';

import { NavigationData } from '~/navigation/AppNavigator/SalesNavigator';

import SalesListScreen from './SalesListScreen';

type Props = NavigationData<'SalesList'>;

const fakeProps: Props = {
  route: { key: '1234', name: 'SalesList' },
  // @ts-ignore
  navigation: {},
};

describe('<SalesListScreen />', () => {
  it('matches the snapshot', () => {
    const tree = shallow(<SalesListScreen {...fakeProps} />);

    expect(tree).toMatchSnapshot();
  });
});
