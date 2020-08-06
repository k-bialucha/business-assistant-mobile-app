import React from 'react';

import { shallow } from 'enzyme';

import { NavigationData } from '~/navigation/AppNavigator/SettingsNavigator';

import UserSettingsScreen from './UserSettingsScreen';

jest.mock('react-redux', () => {
  return {
    __esModule: true,
    useDispatch: jest.fn().mockImplementation(() => jest.fn()),
  };
});

type Props = NavigationData<'UserSettings'>;

const fakeProps: Props = {
  route: { key: '1234', name: 'UserSettings' },
  // @ts-ignore
  navigation: {},
};

describe('<UserSettingsScreen />', () => {
  it('matches the snapshot', () => {
    const tree = shallow(<UserSettingsScreen {...fakeProps} />);

    expect(tree).toMatchSnapshot();
  });
});
