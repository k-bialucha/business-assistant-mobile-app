import React from 'react';

import { shallow } from 'enzyme';

import { NavigationData } from '../navigation/AppNavigator/CostsNavigator';

import CostsScreen from './CostsScreen';

type Props = NavigationData<'CostsList'>;

const fakeProps: Props = {
  route: { key: '1234', name: 'CostsList' },
  // @ts-ignore
  navigation: {},
};

describe('<CostsScreen />', () => {
  it('matches the snapshot', () => {
    const tree = shallow(<CostsScreen {...fakeProps} />);

    expect(tree).toMatchSnapshot();
  });
});
