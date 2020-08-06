import React from 'react';

import { StackNavigationOptions } from '@react-navigation/stack';

import PlainText from '~/components/UI/PlainText';
import { NavigationData } from '~/navigation/AppNavigator/SettingsNavigator';

import { StyledView } from './UserSettingsScreen.styled';

type Props = NavigationData<'UserSettings'>;

const UserSettingsScreen: React.FC<Props> = () => {
  return (
    <StyledView>
      <PlainText theme="dark">User Settings Screen</PlainText>
    </StyledView>
  );
};

export const UserSettingsScreenNavOptions: StackNavigationOptions = {
  headerTitle: 'Account Settings',
};

export default UserSettingsScreen;
