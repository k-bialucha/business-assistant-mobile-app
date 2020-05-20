import React from 'react';
import { ScrollView } from 'react-native';

import { StackNavigationOptions } from '@react-navigation/stack';
import { Formik } from 'formik';
import { Button } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';

import TextField from '../components/form/TextField';
import { NavigationData } from '../navigation/AuthNavigator';
import { resetPassword } from '../redux/auth/actions';
import Colors from '../theme/Colors';

import { StyledView, StyledWideContainer } from './ResetPasswordScreen.styled';

const ResetPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
});

type Props = NavigationData<'ResetPassword'>;

const ResetPasswordScreen: React.FC<Props> = ({ route }) => {
  const dispatch = useDispatch();

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      style={{ backgroundColor: Colors.navyBlue }}
    >
      <StyledView>
        <Formik
          initialValues={{ email: route.params.email }}
          validationSchema={ResetPasswordSchema}
          onSubmit={({ email }) => {
            dispatch(resetPassword(email));
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <StyledWideContainer>
              <TextField
                testID="email-input"
                value={values.email}
                placeholder="E-mail"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                error={errors.email}
                touched={touched.email}
                keyboardType="email-address"
              />
              <Button
                testID="reset-password-button"
                title="Reset password"
                buttonStyle={{ backgroundColor: '#ffffff', marginTop: 15 }}
                titleStyle={{ color: Colors.gray }}
                onPress={() => {
                  handleSubmit();
                }}
              />
            </StyledWideContainer>
          )}
        </Formik>
      </StyledView>
    </ScrollView>
  );
};

export const ResetPasswordScreenNavOptions: StackNavigationOptions = {};

export default ResetPasswordScreen;
