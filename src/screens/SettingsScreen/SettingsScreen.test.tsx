import React from 'react';

import { NavigationContext } from '@react-navigation/native';
import { shallow } from 'enzyme';

import { NavigationData } from '~/navigation/AppNavigator/SettingsNavigator';

import SettingsScreen from './SettingsScreen';

jest.mock('react-redux', () => {
  return {
    __esModule: true,
    useDispatch: jest.fn().mockImplementation(() => jest.fn()),
    useSelector: jest.fn().mockReturnValue({
      username: 'dummy-username',
      userImage: 'dummy-image-url',
    }),
    useNavigation: () =>
      jest.fn().mockReturnValue({
        navigate: jest.fn(),
      }),
  };
});

type Props = NavigationData<'Settings'>;

const fakeProps: Props = {
  route: { key: '1234', name: 'Settings' },
  // @ts-ignore
  navigation: {},
};

// TO CHECK: bad snapshot ??
describe('<SettingsScreen />', () => {
  it('matches the snapshot', () => {
    const tree = shallow(
      <NavigationContext.Provider>
        <SettingsScreen {...fakeProps} />
      </NavigationContext.Provider>
    );

    expect(tree).toMatchSnapshot();
  });
});
