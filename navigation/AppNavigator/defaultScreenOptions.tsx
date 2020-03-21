import { StackNavigationOptions } from '@react-navigation/stack';
import { Platform } from 'react-native';

import Colors from '../../theme/Colors';

const defaultScreenOptions: StackNavigationOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.gray : 'white',
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.gray,
};

export default defaultScreenOptions;
