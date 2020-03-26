import React from 'react';

import { NavigationContainer } from '@react-navigation/native';

import StartupScreen from '../screens/StartupScreen';

import AppNavigator from './AppNavigator';
import AuthNavigator from './AuthNavigator';

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
