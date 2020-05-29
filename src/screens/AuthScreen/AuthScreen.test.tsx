import React from 'react';

import { shallow } from 'enzyme';

import { NavigationData } from '~/navigation/AuthNavigator';

import AuthScreen from './AuthScreen';

type Props = NavigationData<'Authorization'>;

const mockedProps: Props = {
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
    useDispatch: jest.fn().mockImplementation(() => jest.fn()),
  };
});

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: key => key }),
}));

describe('<AuthScreen />', () => {
  it('matches the snaphot', () => {
    const mockedComp = shallow(<AuthScreen {...mockedProps} />);

    expect(mockedComp).toMatchSnapshot();
  });
});
