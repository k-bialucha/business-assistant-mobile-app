import React, { useEffect, useState } from 'react';
import { Button } from 'react-native';

import { useTranslation } from 'react-i18next';

import PlainText from '~/components/UI/PlainText';
import { NavigationData } from '~/navigation/AppNavigator/SettingsNavigator';

import { StyledView } from './UserSettingsScreen.styled';

type Props = NavigationData<'UserSettings'>;

const UserSettingsScreen: React.FC<Props> = ({ navigation }) => {
  const { t } = useTranslation();

  const [counter, setCounter] = useState(1);

  // TODO: extract to a separate hook?
  useEffect(() => {
    // passing already translated title it could be common way to set nav options in entire app
    const newTitle = `Account Settings no. ${counter}`;

    console.warn(`setting a new title: "${newTitle}"`);

    navigation.setOptions({
      headerTitle: t(newTitle),
    });
  }, [t, navigation, counter]);

  return (
    <StyledView>
      <PlainText theme="dark">User Settings Screen</PlainText>
      <Button title="change!!" onPress={() => setCounter(counter * 2)} />
    </StyledView>
  );
};

export default UserSettingsScreen;
