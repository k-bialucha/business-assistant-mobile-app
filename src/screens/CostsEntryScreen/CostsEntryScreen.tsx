import React from 'react';
import { ScrollView } from 'react-native';

import { Formik } from 'formik';
import { Button } from 'react-native-elements';
import RNPickerSelect from 'react-native-picker-select';
import * as Yup from 'yup';

import TextField from '~/components/form/TextField/TextField';
import { useAppTranslation } from '~/hooks/useAppTranslation';
import { AmountKind } from '~/models/AmountKind';
import { Currency } from '~/models/Currency';
import { VatRate, vatRates } from '~/models/VatRate';
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
  currency: Currency | '';
  vatRate: VatRate | '';
  purchaseDate: string;
};

const CostsEntryScreen: React.FC<Props> = () => {
  const { t } = useAppTranslation();

  const CostEntrySchema = Yup.object<Partial<CostFormItem>>({
    amount: Yup.string().required(t('Required')),
    amountKind: Yup.string<AmountKind>().required(t('Required')),
    currency: Yup.string<Currency>().required(t('Required')),
    vatRate: Yup.string<VatRate>().required(t('Required')),
    purchaseDate: Yup.string().required(t('Required')),
  });
  const initialValues: CostFormItem = {
    amount: '',
    amountKind: AmountKind.GROSS, // 2x checkbox or switch
    // TODO: fill currency with base company currency in app?
    currency: '', // select field
    vatRate: '', // select field
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
            setFieldTouched,
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
              <RNPickerSelect
                placeholder={{
                  label: t('Select a currency'),
                  value: '', // to override null and match Formik requirements
                  color: 'gray',
                }}
                onValueChange={handleChange('currency')}
                onClose={() => setFieldTouched('currency')} // imitating onBlur
                items={Object.values(Currency).map(item => ({
                  label: item,
                  value: item,
                }))}
              >
                <TextField
                  value={values.currency}
                  placeholder={t('Currency')}
                  error={errors.currency}
                  touched={touched.currency}
                />
              </RNPickerSelect>
              <RNPickerSelect
                placeholder={{
                  label: t('Select a Vat Rate'),
                  value: '', // to override null and match Formik requirements
                  color: 'gray',
                }}
                onValueChange={handleChange('vatRate')}
                onClose={() => setFieldTouched('vatRate')}
                items={vatRates.map(item => ({
                  label: `${item}%`,
                  value: item,
                }))}
              >
                <TextField
                  value={values.vatRate ? `${values.vatRate}%` : values.vatRate}
                  placeholder={t('Vat Rate')}
                  error={errors.vatRate}
                  touched={touched.vatRate}
                />
              </RNPickerSelect>
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
