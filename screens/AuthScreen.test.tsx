import React from 'react';

import { shallow } from 'enzyme';
import { useSelector } from 'react-redux';

import { NavigationData } from '../navigation/AuthNavigator';
import { LoginRequestStatus } from '../redux/auth';

import AuthScreen from './AuthScreen';

type Props = NavigationData<'Authorization'>;

const fakeProps: Props = {
  route: { key: '1234', name: 'Authorization' },
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

describe('<AuthScreen />', () => {
  it('matches the snapshot', () => {
    (useSelector as jest.Mock).mockReturnValueOnce('some-token');
    (useSelector as jest.Mock).mockReturnValueOnce('some-user');
    (useSelector as jest.Mock).mockReturnValueOnce(LoginRequestStatus.SUCCESS);

    const tree = shallow(<AuthScreen {...fakeProps} />);

    expect(tree).toMatchSnapshot();
  });
});
