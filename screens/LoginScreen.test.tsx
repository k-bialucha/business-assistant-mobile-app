import React from 'react';

import { shallow } from 'enzyme';
import { useSelector } from 'react-redux';

import { NavigationData } from '../navigation/AuthNavigator';
import { LoginRequestStatus } from '../redux/auth';

import LoginScreen from './LoginScreen';

type Props = NavigationData<'Login'>;

const fakeProps: Props = {
  route: { key: '1234', name: 'Login' },
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

describe('<LoginScreen />', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('matches the snapshot  in UNAUTHENTICATED state', () => {
    (useSelector as jest.Mock).mockReturnValueOnce(null);
    (useSelector as jest.Mock).mockReturnValueOnce(null);
    (useSelector as jest.Mock).mockReturnValueOnce(
      LoginRequestStatus.UNAUTHENTICATED
    );

    const tree = shallow(<LoginScreen {...fakeProps} />);

    expect(tree).toMatchSnapshot();
  });

  it('matches the snapshot  in LOADING state', () => {
    (useSelector as jest.Mock).mockReturnValueOnce(null);
    (useSelector as jest.Mock).mockReturnValueOnce('some-user');
    (useSelector as jest.Mock).mockReturnValueOnce(LoginRequestStatus.LOADING);

    const tree = shallow(<LoginScreen {...fakeProps} />);

    expect(tree).toMatchSnapshot();
  });

  it('matches the snapshot  in SUCCESS state', () => {
    (useSelector as jest.Mock).mockReturnValueOnce('some-token');
    (useSelector as jest.Mock).mockReturnValueOnce('some-user');
    (useSelector as jest.Mock).mockReturnValueOnce(LoginRequestStatus.SUCCESS);

    const tree = shallow(<LoginScreen {...fakeProps} />);

    expect(tree).toMatchSnapshot();
  });

  it('matches the snapshot in FAILURE state', () => {
    (useSelector as jest.Mock).mockReturnValueOnce(null);
    (useSelector as jest.Mock).mockReturnValueOnce('some-user');
    (useSelector as jest.Mock).mockReturnValueOnce(LoginRequestStatus.FAILURE);

    const tree = shallow(<LoginScreen {...fakeProps} />);

    expect(tree).toMatchSnapshot();
  });
});
