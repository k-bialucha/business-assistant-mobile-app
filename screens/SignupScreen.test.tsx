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

jest.mock('react-redux', () => {
  return {
    __esModule: true,
    Provider: jest
      .fn()
      .mockImplementation(props => <div>{props.children}</div>),
    useSelector: jest
      .fn()
      .mockReturnValue({ token: 'some-token', username: 'some-user' }),
    useDispatch: jest.fn().mockImplementation(() => jest.fn()),
  };
});

describe('<SignupScreen />', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('matches the snapshot', () => {
    const mockedComp = shallow(<SignupScreen {...mockedProps} />);

    expect(mockedComp).toMatchSnapshot();
  });
});