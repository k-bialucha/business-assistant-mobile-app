import React from 'react';
import { Button } from 'react-native';

import { useDispatch } from 'react-redux';

import { NavigationData } from '../navigation/AppNavigator/SettingsNavigator';
import { logout } from '../redux/auth';

import { StyledView } from './SettingsScreen.styled';

type Props = NavigationData<'Settings'>;

const SettingsScreen: React.FC<Props> = () => {
  const dispatch = useDispatch();

  return (
    <StyledView>
      {/* TODO: show user name/email and picture if existing */}
      <Button
        title="Log out"
        onPress={() => {
          dispatch(logout());
        }}
      />
    </StyledView>
  );
};

export default SettingsScreen;
