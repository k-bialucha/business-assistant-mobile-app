import React, { useEffect } from 'react';
import { Alert } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

import Loader from '~/components/UI/Loader';
import { clearErrorState, tryAutoLogin } from '~/redux/auth/actions';
import { RequestStatus } from '~/redux/auth/types';
import { RootState } from '~/redux/rootReducer';

import { AppNavigator } from './AppNavigator';
import AuthNavigator from './AuthNavigator';

const NavContainer = () => {
  const dispatch = useDispatch();

  const { requestStatus, error, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

  const isLoading: boolean = requestStatus === RequestStatus.LOADING;

  useEffect(() => {
    if (error) {
      Alert.alert(error.title, error.message);
      dispatch(clearErrorState());
    }
  }, [error, dispatch]);

  useEffect(() => {
    dispatch(tryAutoLogin());
  }, [dispatch]);

  return (
    <>
      <NavigationContainer>
        {isAuthenticated ? <AppNavigator /> : <AuthNavigator />}
      </NavigationContainer>
      <Loader isLoading={isLoading} />
    </>
  );
};

export default NavContainer;
