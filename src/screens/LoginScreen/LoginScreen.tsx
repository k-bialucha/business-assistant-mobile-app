import React from 'react';
import { ScrollView, Text, TouchableWithoutFeedback } from 'react-native';

import { StackNavigationOptions } from '@react-navigation/stack';
import { Formik } from 'formik';
import { Button } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';

import TextField from '../../components/form/TextField';
import { NavigationData } from '../../navigation/AuthNavigator';
import { login } from '../../redux/auth';
import Colors from '../../theme/Colors';

import { StyledView, StyledWideContainer } from './LoginScreen.styled';

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  password: Yup.string()
    .min(6, 'Too Short!')
    .required('Required'),
});

type Props = NavigationData<'Login'>;

const LoginScreen: React.FC<Props> = props => {
  const dispatch = useDispatch();

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      style={{ backgroundColor: Colors.navyBlue }}
    >
      <StyledView>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={LoginSchema}
          onSubmit={({ email, password }) => {
            dispatch(login(email, password));
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
              <TextField
                testID="password-input"
                value={values.password}
                placeholder="Password"
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                error={errors.password}
                touched={touched.password}
                secureTextEntry
              />
              <TouchableWithoutFeedback
                onPress={() => {
                  props.navigation.navigate('ResetPassword', {
                    email: values.email,
                  });
                }}
              >
                <Text style={{ color: Colors.gray, alignSelf: 'flex-end' }}>
                  Forgot Password?
                </Text>
              </TouchableWithoutFeedback>
              <Button
                testID="login-button"
                title="Login"
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

export const LoginScreenNavOptions: StackNavigationOptions = {};

export default LoginScreen;