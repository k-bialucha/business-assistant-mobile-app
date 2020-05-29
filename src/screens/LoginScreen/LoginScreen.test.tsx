import React from 'react';

import { shallow } from 'enzyme';

import { NavigationData } from '../../navigation/AuthNavigator';

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
    useDispatch: jest.fn().mockImplementation(() => jest.fn()),
  };
});

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: key => key }),
}));

describe('<LoginScreen />', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('matches the snapshot', () => {
    const tree = shallow(<LoginScreen {...fakeProps} />);

    expect(tree).toMatchSnapshot();
  });
});
