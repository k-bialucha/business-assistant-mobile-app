import React from 'react';
import { View } from 'react-native';

import { Formik } from 'formik';
import { Button } from 'react-native-elements';
import * as Yup from 'yup';

import TextField from '~/components/form/TextField/TextField';
import { useAppTranslation } from '~/hooks/useAppTranslation';
import { Currency } from '~/models/Currency';
import { VatRate } from '~/models/VatRate';
import { NavigationData } from '~/navigation/AppNavigator/CostsNavigator';
import Colors from '~/theme/Colors';
import { StyledWideContainer } from '~/theme/StyledComponents.styled';

type Props = NavigationData<'CostsEntry'>;

type CostFormItem = {
  amount: string;
  amountKind: AmountKind;
  currency: Currency;
  vatRate: VatRate;
  purchaseDate: Date | '';
};

enum AmountKind {
  NET = 'net',
  GROSS = 'gross',
}

const CostsEntryScreen: React.FC<Props> = () => {
  const { t } = useAppTranslation();

  const CostEntrySchema = Yup.object().shape({});
  const initialValues: CostFormItem = {
    amount: '', // number field
    amountKind: AmountKind.GROSS, // select or 2x checkbox or switch
    // TODO: fill currency with base company currency in app?
    currency: Currency.PLN, // select field
    vatRate: 23, // select field
    purchaseDate: '', // date field
  };

  return (
    <View>
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
    </View>
  );
};

export default CostsEntryScreen;
