import React from 'react';
import { ActivityIndicator } from 'react-native';

import Colors from '~/theme/Colors';

import { StyledView } from './Loader.styled';

interface Props {
  isLoading: boolean;
}

const Loader: React.FC<Props> = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <StyledView>
      <ActivityIndicator color={Colors.gray} size="large" />
    </StyledView>
  );
};

export default Loader;
