import React from 'react';

import { shallow } from 'enzyme';
import { useSelector } from 'react-redux';

import { NavigationData } from '~/navigation/AppNavigator/SettingsNavigator';

import SettingsScreen from './SettingsScreen';

type Props = NavigationData<'Settings'>;

const fakeProps: Props = {
  route: { key: '1234', name: 'Settings' },
  // @ts-ignore
  navigation: {},
};

describe('<SettingsScreen />', () => {
  it('renders nothing when no user data is set', () => {
    (useSelector as jest.Mock).mockReturnValueOnce('dudek2');

    const tree = shallow(<SettingsScreen {...fakeProps} />);

    expect(tree.isEmptyRender()).toBe(true);
  });

  it('matches the snapshot', () => {
    (useSelector as jest.Mock).mockReturnValueOnce({
      username: 'dummy-username',
      userImage: 'dummy-image-url',
    });
    const tree = shallow(<SettingsScreen {...fakeProps} />);

    expect(tree).toMatchSnapshot();
  });
});
