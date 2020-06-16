/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { View } from 'react-native';

import { StandardBackground } from '../../components/BackgroundImage';
import { Container, Button, LabeledInput, Text } from '../../components';
import colors from '../../utils/colors';
import { ContainerForm } from './styles';
import { useSession } from '../../hooks/session';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [city, setCity] = useState('');
  const [error, setError] = useState({});
  const [actionError, setActionError] = useState('');
  const [btnLoading, setBtnLoading] = useState(false);
  const { signIn } = useSession();

  function clearOnFocus(field) {
    setError({ ...error, [field]: null });
  }

  async function handleLogin() {
    setBtnLoading(true);
    const requiredData = {
      email: { field: 'email', value: email },
      password: { field: 'password', value: password },
      city: { field: 'city', value: city },
    };

    let valid = true;
    const payload = {};

    /** Verificando que temos todos os dados */
    for (const key in requiredData) {
      if (valid) {
        const input = requiredData[key];

        if (!input.value) {
          valid = false;
          setError({
            ...error,
            [key]: input.errorMessage || 'Campo obrigatório',
          });
        }

        if (valid) {
          payload[input.field] = input.value;
        }
      }
    }

    if (valid) {
      const signInData = await signIn({
        email,
        password,
        city,
      });

      if ('error' in signInData || 'status' in signInData) {
        setActionError(
          signInData.messages
            ? signInData.messages.join(', ')
            : signInData.message
        );
      } else {
        navigation.replace('Home');
      }
    }
    setBtnLoading(false);
  }

  return (
    <Container noPadding>
      <StandardBackground>
        <ContainerForm>
          <LabeledInput
            inputProps={{
              value: email,
              onChangeText: setEmail,
              onFocus: () => clearOnFocus('email'),
              errorMessage: error.email,
              autoCapitalize: 'none',
              placeholder: 'Email',
            }}
          />

          <LabeledInput
            inputProps={{
              value: password,
              onChangeText: setPassword,
              onFocus: () => clearOnFocus('password'),
              errorMessage: error.password,
              autoCapitalize: 'none',
              secureTextEntry: true,
              placeholder: 'Senha',
            }}
          />

          <LabeledInput
            inputProps={{
              value: city,
              onChangeText: setCity,
              onFocus: () => clearOnFocus('city'),
              errorMessage: error.city,
              autoCapitalize: 'none',
            }}
          />

          <Text>{actionError}</Text>

          <Button
            touchableProps={{ onPress: handleLogin, background: colors.Blue }}
            textProps={{
              title: 'Login',
              loading: btnLoading,
            }}
            style={{ width: '100%' }}
          />

          <View style={{ alignItems: 'center', marginTop: 20 }}>
            <Text>Não tem conta?</Text>
            <Text
              style={{
                lineHeight: 20,
                fontSize: 18,
                fontWeight: 'bold',
                color: colors.Blue,
              }}
              onPress={() => navigation.navigate('Cadastro')}>
              Cadastre-se já
            </Text>
          </View>
        </ContainerForm>
      </StandardBackground>
    </Container>
  );
}
