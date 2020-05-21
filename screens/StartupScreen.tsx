/**
 * Startup module to check if user's data are saved in local storage, then log in automatically otherwise
 * set in redux didTryLogin to true
 */

import React, { useEffect } from 'react';
import { ActivityIndicator } from 'react-native';

import { useDispatch } from 'react-redux';

import { tryAutoLogin } from '../redux/auth/actions';

import { StyledView } from './StartupScreen.style';

const StartupScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(tryAutoLogin());
  }, [dispatch]);

  return (
    <StyledView>
      <ActivityIndicator size="large" color="white" />
    </StyledView>
  );
};

export default StartupScreen;
