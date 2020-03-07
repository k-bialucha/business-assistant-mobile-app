import React from 'react';
import { HeaderButton } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';
import { Platform } from 'react-native';
import Colors from '../theme/Colors';

const CustomHeaderButton = props => {
  return (
    <HeaderButton
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      IconComponent={Ionicons}
      iconSize={23}
      color={Platform.OS === 'android' ? 'white' : Colors.navyBlue}
    />
  );
};

export default CustomHeaderButton;
