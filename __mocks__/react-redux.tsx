import React from 'react';
import { Text, View } from 'react-native';

export const Provider: React.FC<{}> = ({ children }) => (
  <View>
    <Text>Provider</Text>
    <View>{children}</View>
  </View>
);

export const useDispatch = jest.fn().mockImplementation(() => jest.fn());

export const useSelector = jest.fn().mockImplementation(() => ({}));
