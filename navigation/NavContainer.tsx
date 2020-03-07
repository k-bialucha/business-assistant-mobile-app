import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import AppNavigator from './AppNavigator';
import AuthNavigator from './AuthNavigator';
import StartupScreen from '../screens/StartupScreen';

const NavContainer = () => {
  // temporary mocked consts
  const isAuth = true;
  const didTryAutoLogin = true;

  return (
    <NavigationContainer>
      {isAuth && <AppNavigator />}
      {!isAuth && didTryAutoLogin && <AuthNavigator />}
      {!isAuth && !didTryAutoLogin && <StartupScreen />}
    </NavigationContainer>
  );
};

export default NavContainer;
