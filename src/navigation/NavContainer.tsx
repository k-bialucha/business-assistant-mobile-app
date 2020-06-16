import React, { useEffect } from 'react';
import { Alert } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

import Loader from '~/components/UI/Loader';
import { clearErrorState } from '~/redux/auth/actions';
import { RequestStatus } from '~/redux/auth/types';
import { RootState } from '~/redux/rootReducer';
import StartupScreen from '~/screens/StartupScreen';

import AppNavigator from './AppNavigator';
import AuthNavigator from './AuthNavigator';

const NavContainer = () => {
  const dispatch = useDispatch();

  const { didTryAutoLogin, token, requestStatus, error } = useSelector(
    (state: RootState) => state.auth
  );

  const isAuthenticated: boolean = !!token;
  const isLoading: boolean = requestStatus === RequestStatus.LOADING;

  useEffect(() => {
    if (error) {
      Alert.alert(error.title, error.message);
      dispatch(clearErrorState());
    }
  }, [error, dispatch]);

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
