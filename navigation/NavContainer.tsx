import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';

import { RootState } from '../redux/rootReducer';
import StartupScreen from '../screens/StartupScreen';

import AppNavigator from './AppNavigator';
import AuthNavigator from './AuthNavigator';

const NavContainer = () => {
  // temporary mocked const
  const didTryAutoLogin = true;

  const isAuthenticated: boolean = useSelector(
    (state: RootState) => !!state.auth.token
  );

  return (
    <NavigationContainer>
      {isAuthenticated && <AppNavigator />}
      {!isAuthenticated && didTryAutoLogin && <AuthNavigator />}
      {!isAuthenticated && !didTryAutoLogin && <StartupScreen />}
    </NavigationContainer>
  );
};

export default NavContainer;
