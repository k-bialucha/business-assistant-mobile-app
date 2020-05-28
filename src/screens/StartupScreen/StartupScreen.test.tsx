import React from 'react';

import { shallow } from 'enzyme';

import StartupScreen from './StartupScreen';

jest.mock('react-redux', () => {
  return {
    __esModule: true,
    Provider: jest
      .fn()
      .mockImplementation(props => <div>{props.children}</div>),
    useDispatch: jest.fn().mockImplementation(() => jest.fn()),
  };
});

describe('<StartupScreen />', () => {
  it('matches the snapshot', () => {
    const tree = shallow(<StartupScreen />);

    expect(tree).toMatchSnapshot();
  });
});