import React from 'react';

import { shallow } from 'enzyme';

import { NavigationData } from '../../navigation/AppNavigator/CostsNavigator';

import CostsEntryScreen from './CostsEntryScreen';

type Props = NavigationData<'CostsEntry'>;

const fakeProps: Props = {
  route: { key: '1234', name: 'CostsEntry' },
  // @ts-ignore
  navigation: {},
};

describe('<CostsEntryScreen />', () => {
  it('matches the snapshot', () => {
    const tree = shallow(<CostsEntryScreen {...fakeProps} />);

    expect(tree).toMatchSnapshot();
  });
});
