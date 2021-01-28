import React, { useEffect } from 'react';
import { Platform, Text, View } from 'react-native';

import { StackNavigationOptions } from '@react-navigation/stack';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '~/components/HeaderButton';
import { useAppTranslation } from '~/hooks/useAppTranslation';
import { NavigationData } from '~/navigation/AppNavigator/CostsNavigator';

type Props = NavigationData<'CostsList'>;

const CostsListScreen: React.FC<Props> = ({ navigation }) => {
  const { t } = useAppTranslation();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: t('Costs'),
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title={t('Add cost')}
            iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
            onPress={() => navigation.navigate('CostsEntry')}
          />
        </HeaderButtons>
      ),
    });
  }, [t, navigation]);

  return (
    <View>
      <Text>Costs</Text>
    </View>
  );
};

export const CostsListScreenNavOptions: StackNavigationOptions = {};

export default CostsListScreen;
