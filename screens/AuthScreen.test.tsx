import React from 'react';

import { shallow } from 'enzyme';

import { NavigationData } from '../navigation/AuthNavigator';

import AuthScreen from './AuthScreen';

type Props = NavigationData<'Authorization'>;

const fakeProps: Props = {
  route: { key: '1234', name: 'Authorization' },
  // @ts-ignore
  navigation: {},
};

describe('<AuthScreen />', () => {
  it('matches the snapshot', () => {
    const tree = shallow(<AuthScreen {...fakeProps} />);

    expect(tree).toMatchSnapshot();
  });
});
