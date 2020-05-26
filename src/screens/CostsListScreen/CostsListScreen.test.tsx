import React from 'react';

import { shallow } from 'enzyme';

import { NavigationData } from '../../navigation/AppNavigator/CostsNavigator';

import CostsListScreen from './CostsListScreen';

type Props = NavigationData<'CostsList'>;

const fakeProps: Props = {
  route: { key: '1234', name: 'CostsList' },
  // @ts-ignore
  navigation: {},
};

describe('<CostsListScreen />', () => {
  it('matches the snapshot', () => {
    const tree = shallow(<CostsListScreen {...fakeProps} />);

    expect(tree).toMatchSnapshot();
  });
});
