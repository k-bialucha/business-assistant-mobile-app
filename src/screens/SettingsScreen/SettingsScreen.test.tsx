import React from 'react';

import { shallow } from 'enzyme';
import { useSelector } from 'react-redux';

import { NavigationData } from '~/navigation/AppNavigator/SettingsNavigator';

import SettingsScreen from './SettingsScreen';

(useSelector as jest.Mock).mockReturnValue({
  username: 'dummy-username',
  userImage: 'dummy-image-url',
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
