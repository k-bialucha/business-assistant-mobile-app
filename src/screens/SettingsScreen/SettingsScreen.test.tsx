import React from 'react';

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
  };
});

type Props = NavigationData<'Settings'>;

const fakeProps: Props = {
  route: { key: '1234', name: 'Settings' },
  // @ts-ignore
  navigation: {},
};

describe('<SettingsScreen />', () => {
  it('matches the snapshot', () => {
    const tree = shallow(<SettingsScreen {...fakeProps} />);

    expect(tree).toMatchSnapshot();
  });
});
