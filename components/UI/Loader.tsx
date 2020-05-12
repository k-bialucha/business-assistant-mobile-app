import React from 'react';
import { ActivityIndicator } from 'react-native';

import Colors from '../../theme/Colors';

import { StyledView } from './Loader.styled';

const Loader = () => {
  return (
    <StyledView>
      <ActivityIndicator color={Colors.gray} size="large" />
    </StyledView>
  );
};

export default Loader;
