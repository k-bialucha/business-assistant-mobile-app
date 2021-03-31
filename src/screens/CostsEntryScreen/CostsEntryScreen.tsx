import React from 'react';
import { ScrollView } from 'react-native';

import { Formik } from 'formik';
import { Button } from 'react-native-elements';
import * as Yup from 'yup';

import { CostElement } from '~/calculation/CostElement';
import { DatePickerField } from '~/components/form/DatePickerField/DatePickerField';
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

type Props = NavigationData<'CostsEntry'>;

export interface CostFormValues {
  amount: string;
  amountKind: AmountKind;
  currency: Currency | '';
  vatRate: VatRate | '';
  purchaseDate: Date;
}

const CostsEntryScreen: React.FC<Props> = () => {
  const { t } = useAppTranslation();

  const CostEntrySchema = Yup.object<Partial<CostFormValues>>({
    amount: Yup.string().required(t('Required')),
    amountKind: Yup.string<AmountKind>().required(t('Required')),
    currency: Yup.string<Currency>().required(t('Required')),
    vatRate: Yup.number<VatRate>().required(t('Required')),
    purchaseDate: Yup.date().required(t('Required')),
  });
  const initialValues: CostFormValues = {
    amount: '',
    amountKind: AmountKind.NET,
    // TODO: fill currency with base account currency in app?
    currency: '',
    vatRate: '',
    purchaseDate: new Date('2021-01-01'),
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
          onSubmit={({
            amount,
            amountKind,
            currency,
            vatRate,
            purchaseDate,
          }: CostFormValues) => {
            if (!currency || !vatRate) return;

            const item = new CostElement(
              +amount,
              amountKind,
              currency,
              vatRate,
              purchaseDate
            );

            // eslint-disable-next-line no-console
            console.log(item);
            // TODO: send cost item to firebase/SQLite store
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
              <SegmentRadioField
                value={values.vatRate}
                onPress={value => setFieldValue('vatRate', value)}
                setTouched={() => setFieldTouched('vatRate')}
                touched={touched.vatRate}
                radioOptions={vatRates.map(item => ({
                  label: `${item}%`,
                  value: item,
                }))}
                color={Colors.primary}
              />
              <DatePickerField
                value={values.purchaseDate}
                placeholder={t('Purchase Date')}
                onChange={date => setFieldValue('purchaseDate', date)}
                setTouched={() => setFieldTouched('purchaseDate')}
              />
              <Button
                title={t('Save')}
                disabled={!Object.keys(touched).length || !isValid}
                titleStyle={{ color: Colors.silver }}
                style={{ marginTop: 20 }}
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
