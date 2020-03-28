import React from 'react';
import { Platform } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import {
  HeaderButton,
  HeaderButtonProps,
} from 'react-navigation-header-buttons';

import Colors from '../theme/Colors';

const CustomHeaderButton: React.SFC<HeaderButtonProps> = props => {
  return (
    <HeaderButton
      {...props}
      IconComponent={Ionicons}
      iconSize={23}
      color={Platform.OS === 'android' ? 'white' : Colors.gray}
    />
  );
};

export default CustomHeaderButton;
