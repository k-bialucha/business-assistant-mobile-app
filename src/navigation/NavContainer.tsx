import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';

import Loader from '../components/UI/Loader';
import { RequestStatus } from '../redux/auth/types';
import { RootState } from '../redux/rootReducer';
import StartupScreen from '../screens/StartupScreen';

import AppNavigator from './AppNavigator';
import AuthNavigator from './AuthNavigator';

const NavContainer = () => {
  const didTryAutoLogin: boolean = useSelector(
    (state: RootState) => !!state.auth.didTryAutoLogin
  );

  const isAuthenticated: boolean = useSelector(
    (state: RootState) => !!state.auth.token
  );

  const isLoading: boolean = useSelector(
    (state: RootState) => state.auth.requestStatus === RequestStatus.LOADING
  );

  return (
    <>
      <NavigationContainer>
        {isAuthenticated && <AppNavigator />}
        {!isAuthenticated && didTryAutoLogin && <AuthNavigator />}
        {!isAuthenticated && !didTryAutoLogin && <StartupScreen />}
      </NavigationContainer>
      <Loader isLoading={isLoading} />
    </>
  );
};

export default NavContainer;
