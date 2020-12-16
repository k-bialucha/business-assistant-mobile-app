import React, { useEffect } from 'react';

import PlainText from '~/components/UI/PlainText';
import { useAppTranslation } from '~/hooks/useAppTranslation';
import { NavigationData } from '~/navigation/AppNavigator/SettingsNavigator';

import { StyledView } from './UserSettingsScreen.styled';

type Props = NavigationData<'UserSettings'>;

const UserSettingsScreen: React.FC<Props> = ({ navigation }) => {
  const { t } = useAppTranslation();

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
