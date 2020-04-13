import React from 'react';

import { shallow } from 'react-native-testing-library';

import { NavigationData } from '../navigation/AuthNavigator';

import SignupScreen from './SignupScreen';

type Props = NavigationData<'Signup'>;

const mockedProps: Props = {
  route: { key: '1234', name: 'Signup' },
  // @ts-ignore
  navigation: {},
};

describe('<SignupScreen />', () => {
  it('matches the snapshot', () => {
    const mockedComp = shallow(<SignupScreen {...mockedProps} />);

    expect(mockedComp).toMatchSnapshot();
  });
});
