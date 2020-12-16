import React, { useEffect } from 'react';
import { Platform, Text, View } from 'react-native';

import { StackNavigationOptions } from '@react-navigation/stack';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '~/components/HeaderButton';
import { useAppTranslation } from '~/hooks/useAppTranslation';
import { NavigationData } from '~/navigation/AppNavigator/SalesNavigator';

type Props = NavigationData<'SalesList'>;

const SalesListScreen: React.FC<Props> = ({ navigation }) => {
  const { t } = useAppTranslation();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: t('Revenues'),
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title={t('Add revenue')}
            iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
            onPress={() => navigation.navigate('SalesEntry')}
          />
        </HeaderButtons>
      ),
    });
  }, [t, navigation]);

  return (
    <View>
      <Text>Sales</Text>
    </View>
  );
};

export const SalesListScreenNavOptions: StackNavigationOptions = {};

export default SalesListScreen;
