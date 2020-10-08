import React from 'react';

import { shallow } from 'enzyme';

import { NavigationData } from '~/navigation/AuthNavigator';

import ResetPasswordScreen from './ResetPasswordScreen';

type Props = NavigationData<'ResetPassword'>;

const fakeProps: Props = {
  route: {
    key: '1234',
    name: 'ResetPassword',
    params: { email: 'email@some.com' },
  },
  // @ts-ignore
  navigation: {},
};

describe('<ResetPasswordScreen />', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('matches the snapshot', () => {
    const tree = shallow(<ResetPasswordScreen {...fakeProps} />);

    expect(tree).toMatchSnapshot();
  });
});
