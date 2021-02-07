import React from 'react';
import { Alert, TouchableWithoutFeedback } from 'react-native';

import { ListItem } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';

import { LanguageSwitcher } from '~/components/LanguageSwitcher';
import { useAppTranslation } from '~/hooks/useAppTranslation';
import { NavigationData } from '~/navigation/AppNavigator/SettingsNavigator';
import { logout } from '~/redux/auth';
import { RootState } from '~/redux/rootReducer';
import Colors from '~/theme/Colors';

import { StyledView } from './SettingsScreen.styled';

type Props = NavigationData<'Settings'>;

const SettingsScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useDispatch();
  const { username, userImage } = useSelector((state: RootState) => state.auth);
  const { t } = useAppTranslation();

  if (!username) return null;

  return (
    <StyledView>
      <TouchableWithoutFeedback
        onPress={() => navigation.navigate('UserSettings')}
      >
        <ListItem
          leftAvatar={{
            rounded: true,
            ...(userImage ? { source: { uri: userImage } } : {}),
          }}
          title={username}
          titleStyle={{
            color: Colors.navyBlue,
            fontSize: 20,
          }}
          style={{ marginTop: 35, marginBottom: 35 }}
          chevron
        />
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        onPress={() => Alert.alert('"Open view screen with some settings"')}
      >
        <ListItem
          title="Test Option 1"
          titleStyle={{
            color: Colors.navyBlue,
          }}
          chevron
          style={{ marginBottom: 5 }}
        />
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        onPress={() => Alert.alert('"Open view screen with some settings"')}
      >
        <ListItem
          title="Test Option 2"
          titleStyle={{
            color: Colors.navyBlue,
          }}
          style={{ marginBottom: 5 }}
          chevron
        />
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        onPress={() => {
          dispatch(logout());
        }}
      >
        <ListItem
          title={t('Logout')}
          titleStyle={{
            color: Colors.errorRed,
          }}
          style={{ marginTop: 30 }}
          contentContainerStyle={{ alignItems: 'center' }}
        />
      </TouchableWithoutFeedback>
      <LanguageSwitcher />
    </StyledView>
  );
};

export default SettingsScreen;
