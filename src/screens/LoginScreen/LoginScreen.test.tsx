import React from 'react';

import { shallow } from 'enzyme';

import { NavigationData } from '~/navigation/AuthNavigator';

import LoginScreen from './LoginScreen';

type Props = NavigationData<'Login'>;

const fakeProps: Props = {
  route: { key: '1234', name: 'Login' },
  // @ts-ignore
  navigation: {},
};

describe('<LoginScreen />', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('matches the snapshot', () => {
    const tree = shallow(<LoginScreen {...fakeProps} />);

    expect(tree).toMatchSnapshot();
  });
});
