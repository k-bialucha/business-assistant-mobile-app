import React from 'react';

import { shallow } from 'enzyme';

import { NavigationData } from '../navigation/AppNavigator/SalesNavigator';

import SalesEntryScreen from './SalesEntryScreen';

type Props = NavigationData<'SalesEntry'>;

const fakeProps: Props = {
  route: { key: '1234', name: 'SalesEntry' },
  // @ts-ignore
  navigation: {},
};

describe('<SalesEntryScreen />', () => {
  it('matches the snapshot', () => {
    const tree = shallow(<SalesEntryScreen {...fakeProps} />);

    expect(tree).toMatchSnapshot();
  });
});
