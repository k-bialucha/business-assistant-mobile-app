import React from 'react';

import { shallow } from 'react-native-testing-library';

import { NavigationData } from '../navigation/AuthNavigator';

import AuthScreen from './AuthScreen';

type Props = NavigationData<'Authorization'>;

const mockedProps: Props = {
  route: { key: '1234', name: 'Authorization' },
  // @ts-ignore
  navigation: {},
};

describe('<AuthScreen />', () => {
  it('matches the snaphot', () => {
    const mockedComp = shallow(<AuthScreen {...mockedProps} />);

    expect(mockedComp).toMatchSnapshot();
  });
});
