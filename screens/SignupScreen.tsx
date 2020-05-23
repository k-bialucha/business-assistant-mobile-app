import React from 'react';
import { ScrollView } from 'react-native';

import { Formik } from 'formik';
import { Button } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';

import TextField from '../components/form/TextField';
import { NavigationData } from '../navigation/AuthNavigator';
import { signup } from '../redux/auth/actions';
import Colors from '../theme/Colors';

import { StyledContainer, StyledWideContainer } from './SignupScreen.styled';

const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  phone: Yup.string()
    .min(9, 'Too Short!')
    .max(12, 'Too Long!'),
  password: Yup.string()
    .min(6, 'Too Short!')
    .required('Required'),
});

type Props = NavigationData<'Signup'>;

const SignupScreen: React.FC<Props> = () => {
  const dispatch = useDispatch();

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      style={{ backgroundColor: Colors.navyBlue }}
    >
      <StyledContainer>
        <Formik
          initialValues={{ email: '', password: '', phone: '' }}
          validationSchema={SignupSchema}
          onSubmit={({ email, password, phone }) => {
            dispatch(signup(email, password, phone));
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
                testID="phone-input"
                value={values.phone}
                placeholder="Phone (Optional)"
                onChangeText={handleChange('phone')}
                onBlur={handleBlur('phone')}
                error={errors.phone}
                touched={touched.phone}
                keyboardType="phone-pad"
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
              <Button
                testID="signup-button"
                title="Sign Up"
                buttonStyle={{ backgroundColor: '#ffffff', marginTop: 15 }}
                titleStyle={{ color: Colors.gray }}
                onPress={() => {
                  handleSubmit();
                }}
              />
            </StyledWideContainer>
          )}
        </Formik>
      </StyledContainer>
    </ScrollView>
  );
};

export default SignupScreen;
