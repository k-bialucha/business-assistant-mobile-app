import React from 'react';

import { shallow } from 'enzyme';

import { NavigationData } from '../navigation/AppNavigator/DashboardNavigator';

import DashboardScreen from './DashboardScreen';

type Props = NavigationData<'Dashboard'>;

const fakeProps: Props = {
  route: { key: '1234', name: 'Dashboard' },
  // @ts-ignore
  navigation: {},
};

describe('<DashboardScreen />', () => {
  it('matches the snapshot', () => {
    const tree = shallow(<DashboardScreen {...fakeProps} />);

    expect(tree).toMatchSnapshot();
  });
});
