import React from 'react';
import { ScrollView } from 'react-native';

import { Formik } from 'formik';
import { Button } from 'react-native-elements';
import * as Yup from 'yup';

import TextField from '~/components/form/TextField/TextField';
import { useAppTranslation } from '~/hooks/useAppTranslation';
import { Currency } from '~/models/Currency';
import { VatRate } from '~/models/VatRate';
import { NavigationData } from '~/navigation/AppNavigator/CostsNavigator';
import Colors from '~/theme/Colors';
import {
  ScreenMainStyledView,
  StyledWideContainer,
} from '~/theme/StyledComponents.styled';

type Props = NavigationData<'CostsEntry'>;

type CostFormItem = {
  amount: string;
  amountKind: AmountKind;
  currency: Currency;
  vatRate: VatRate;
  purchaseDate: string;
};

enum AmountKind {
  NET = 'Net',
  GROSS = 'Gross',
}

const CostsEntryScreen: React.FC<Props> = () => {
  const { t } = useAppTranslation();

  const CostEntrySchema = Yup.object().shape({});
  const initialValues: CostFormItem = {
    amount: '',
    amountKind: AmountKind.GROSS, // 2x checkbox or switch
    // TODO: fill currency with base company currency in app?
    currency: Currency.PLN, // select field
    vatRate: '23', // select field
    purchaseDate: '', // date field
  };

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      style={{ backgroundColor: '#ffffff' }}
    >
      <ScreenMainStyledView>
        <Formik
          initialValues={initialValues}
          validationSchema={CostEntrySchema}
          onSubmit={(cost: CostFormItem) => {
            // eslint-disable-next-line no-console
            console.log('Form sent! ', cost);
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            isValid,
            errors,
            touched,
          }) => (
            <StyledWideContainer>
              <TextField
                value={values.amount}
                placeholder={t('Amount')}
                onChangeText={handleChange('amount')}
                onBlur={handleBlur('amount')}
                error={errors.amount}
                touched={touched.amount}
                keyboardType="decimal-pad"
              />
              <TextField
                value={t(values.amountKind)}
                placeholder={t('Amount Kind')}
                onChangeText={handleChange('amountKind')}
                onBlur={handleBlur('amountKind')}
                error={errors.amountKind}
                touched={touched.amountKind}
              />
              <TextField
                value={values.currency}
                placeholder={t('Currency')}
                onChangeText={handleChange('currency')}
                onBlur={handleBlur('currency')}
                error={errors.currency}
                touched={touched.currency}
              />
              <TextField
                value={values.vatRate}
                placeholder={t('Vat Rate')}
                onChangeText={handleChange('vatRate')}
                onBlur={handleBlur('vatRate')}
                error={errors.vatRate}
                touched={touched.vatRate}
              />
              <TextField
                value={values.purchaseDate}
                placeholder={t('Purchase Date')}
                onChangeText={handleChange('purchaseDate')}
                onBlur={handleBlur('purchaseDate')}
                error={errors.purchaseDate}
                touched={touched.purchaseDate}
              />
              <Button
                title={t('Save')}
                disabled={!isValid}
                titleStyle={{ color: Colors.silver }}
                onPress={() => {
                  handleSubmit();
                }}
              />
            </StyledWideContainer>
          )}
        </Formik>
      </ScreenMainStyledView>
    </ScrollView>
  );
};

export default CostsEntryScreen;
