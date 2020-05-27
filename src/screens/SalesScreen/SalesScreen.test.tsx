import React from 'react';

import { shallow } from 'enzyme';

import { NavigationData } from '../../navigation/AppNavigator/SalesNavigator';

import SalesScreen from './SalesScreen';

type Props = NavigationData<'SalesList'>;

const fakeProps: Props = {
  route: { key: '1234', name: 'SalesList' },
  // @ts-ignore
  navigation: {},
};

describe('<SalesScreen />', () => {
  it('matches the snapshot', () => {
    const tree = shallow(<SalesScreen {...fakeProps} />);

    expect(tree).toMatchSnapshot();
  });
});
