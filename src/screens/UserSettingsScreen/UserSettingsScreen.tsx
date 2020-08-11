import React, { useEffect } from 'react';

import { StackNavigationOptions } from '@react-navigation/stack';
import { Trans, useTranslation } from 'react-i18next';

import PlainText from '~/components/UI/PlainText';
import { NavigationData } from '~/navigation/AppNavigator/SettingsNavigator';

import { StyledView } from './UserSettingsScreen.styled';

type Props = NavigationData<'UserSettings'>;

const UserSettingsScreen: React.FC<Props> = ({ navigation }) => {
  const { t } = useTranslation();

  useEffect(() => {
    // passing already translated title it could be common way to set nav options in entire app
    navigation.setParams({ headerTitle: t('Account Settings') });
  }, [t, navigation]);

  return (
    <StyledView>
      <PlainText theme="dark">User Settings Screen</PlainText>
    </StyledView>
  );
};

export const UserSettingsScreenNavOptions: StackNavigationOptions = navData => {
  // 1 - to avoid passing prop from component, but problem with headerTitle type, it expects string
  // headerTitle: <Trans i18nKey="Account Settings" />,

  // 2 set passed title, navData need type
  return { title: navData.route.params?.headerTitle };
};

export default UserSettingsScreen;
