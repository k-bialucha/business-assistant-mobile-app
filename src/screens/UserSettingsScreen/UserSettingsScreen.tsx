import React, { useEffect, useState } from 'react';
import { Button } from 'react-native';

import { useTranslation } from 'react-i18next';

import PlainText from '~/components/UI/PlainText';
import { NavigationData } from '~/navigation/AppNavigator/SettingsNavigator';

import { StyledView } from './UserSettingsScreen.styled';

type Props = NavigationData<'UserSettings'>;

const UserSettingsScreen: React.FC<Props> = ({ navigation }) => {
  const { t } = useTranslation();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: t('Account Settings'),
    });
  }, [t, navigation]);

  return (
    <StyledView>
      <PlainText theme="dark">User Settings Screen</PlainText>
    </StyledView>
  );
};

export default UserSettingsScreen;
