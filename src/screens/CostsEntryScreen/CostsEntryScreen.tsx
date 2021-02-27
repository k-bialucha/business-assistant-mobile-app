import React from 'react';
import { ScrollView } from 'react-native';

import { Formik } from 'formik';
import { Button } from 'react-native-elements';
import * as Yup from 'yup';

import { SegmentRadioField } from '~/components/form/SegmentRadioField/SegmentRadioField';
import { SelectField } from '~/components/form/SelectField/SelectField';
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

// TODO: 2 add to CostElement priceKind and use it as type in form
type Props = NavigationData<'CostsEntry'>;

export interface CostFormValues {
  amount: string;
  amountKind: AmountKind;
  currency: Currency | '';
  vatRate: VatRate | '';
  purchaseDate: string;
}

const CostsEntryScreen: React.FC<Props> = () => {
  const { t } = useAppTranslation();

  const CostEntrySchema = Yup.object<Partial<CostFormValues>>({
    amount: Yup.string().required(t('Required')),
    amountKind: Yup.number<AmountKind>().required(t('Required')),
    currency: Yup.string<Currency>().required(t('Required')),
    vatRate: Yup.string<VatRate>().required(t('Required')),
    purchaseDate: Yup.string().required(t('Required')),
  });
  const initialValues: CostFormValues = {
    amount: '',
    amountKind: AmountKind.NET, // ratio or switch
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
          onSubmit={(cost: CostFormValues) => {
            // eslint-disable-next-line no-console
            console.log('Form sent! ', cost);
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldTouched,
            setFieldValue,
            values,
            errors,
            touched,
            isValid,
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
              <SegmentRadioField
                value={values.amountKind}
                onPress={value => setFieldValue('amountKind', value)}
                setTouched={() => setFieldTouched('amountKind')}
                touched={touched.amountKind}
                radioOptions={[
                  { label: 'Net', value: AmountKind.NET },
                  { label: 'Gross', value: AmountKind.GROSS },
                ]}
                color={Colors.primary}
              />
              <SelectField
                value={values.currency}
                placeholder={t('Currency')}
                error={errors.currency}
                touched={touched.currency}
                onValueChange={handleChange('currency')}
                onClose={() => setFieldTouched('currency')}
                selectorPlaceholder={t('Select a currency')}
                items={Object.values(Currency).map(item => ({
                  label: item,
                  value: item,
                }))}
              />
              <SelectField
                value={values.vatRate ? `${values.vatRate}%` : values.vatRate}
                placeholder={t('Vat Rate')}
                error={errors.vatRate}
                touched={touched.vatRate}
                onValueChange={handleChange('vatRate')}
                onClose={() => setFieldTouched('vatRate')}
                selectorPlaceholder={t('Select a Vat Rate')}
                items={vatRates.map(item => ({
                  label: `${item}%`,
                  value: item,
                }))}
              />
              {/* 
              TODO: Date field 
              <TextField
                value={values.purchaseDate}
                placeholder={t('Purchase Date')}
                onChangeText={handleChange('purchaseDate')}
                onBlur={handleBlur('purchaseDate')}
                error={errors.purchaseDate}
                touched={touched.purchaseDate}
              /> */}
              <Button
                title={t('Save')}
                disabled={!Object.keys(touched).length || !isValid}
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
