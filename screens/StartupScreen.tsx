/**
 * Startup module to check if user's data are saved in local storage, then log in automatically otherwise
 * set in redux didTryLogin to true
 */

import React, { useEffect } from 'react';
import { ActivityIndicator } from 'react-native';

import { StyledView } from './StartupScreen.style';

const StartupScreen = () => {
  // try log in when Components lodaded
  useEffect(() => {}, []);

  return (
    <StyledView>
      <ActivityIndicator size="large" color="black" />
    </StyledView>
  );
};

export default StartupScreen;
