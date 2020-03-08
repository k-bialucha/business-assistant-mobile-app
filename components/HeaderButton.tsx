import React from 'react';
import {
  HeaderButton,
  HeaderButtonProps,
} from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';
import { Platform } from 'react-native';

import Colors from '../theme/Colors';

const CustomHeaderButton: React.SFC<HeaderButtonProps> = (
  props
): JSX.Element => {
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
