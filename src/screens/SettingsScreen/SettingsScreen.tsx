import React from 'react';
import { Alert, TouchableWithoutFeedback } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { ListItem } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';

import { NavigationData } from '~/navigation/AppNavigator/SettingsNavigator';
import { logout } from '~/redux/auth';
import { RootState } from '~/redux/rootReducer';
import Colors from '~/theme/Colors';

import { StyledView } from './SettingsScreen.styled';

type Props = NavigationData<'Settings'>;

const SettingsScreen: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const { username, userImage } = useSelector((state: RootState) => state.auth);
  const { navigate } = useNavigation();

  return (
    <StyledView>
      <TouchableWithoutFeedback onPress={() => navigate('UserSettings')}>
        <ListItem
          // dummy strings temporary until load data into redux store during auto-login is not done
          leftAvatar={{
            rounded: true,
            source: { uri: userImage || 'dummyUrl' },
          }}
          title={username || 'dummy name'}
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
          title="Log out"
          titleStyle={{
            color: Colors.errorRed,
          }}
          style={{ marginTop: 30 }}
          contentContainerStyle={{ alignItems: 'center' }}
        />
      </TouchableWithoutFeedback>
    </StyledView>
  );
};

export default SettingsScreen;
