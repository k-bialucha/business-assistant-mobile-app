import React from 'react';

import { useSelector } from 'react-redux';
// import ShallowRenderer from 'react-test-renderer/shallow';
import renderer from 'react-test-renderer';

import { LoginRequestStatus } from '../redux/auth';

import InitialScreen from './InitialScreen';

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

describe('<InitialScreen />', () => {
  it('matches the snapshot', () => {
    (useSelector as jest.Mock).mockReturnValueOnce('some-token');
    (useSelector as jest.Mock).mockReturnValueOnce('some-user');
    (useSelector as jest.Mock).mockReturnValueOnce(LoginRequestStatus.SUCCESS);

    const tree = renderer.create(<InitialScreen />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
