/* eslint-disable react/prop-types */
import React, { useState, useContext } from 'react';
import { View } from 'react-native';

import { StandardBackground } from '../../components/BackgroundImage';
import { SessionContext } from '../../store/session';
import { signIn } from '../../store/session/actions';
import { Container, Button, LabeledInput, Text } from '../../components';
import { SignIn } from '../../helpers';
import colors from '../../utils/colors';
import { ContainerForm } from './styles';

export default function Login({ navigation }) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [city, setCity] = useState();
  const [error, setError] = useState({});
  const [btnLoading, setBtnLoading] = useState(false);
  const { dispatch } = useContext(SessionContext);

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
      const login = await SignIn(payload.email, payload.password, payload.city);

      if (login.user) {
        dispatch(
          signIn({
            token: login.token,
            profile: login.user,
            city: payload.city,
          })
        );
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
            label="Email"
            inputProps={{
              value: email,
              onChangeText: setEmail,
              onFocus: () => clearOnFocus('email'),
              errorMessage: error.email,
              autoCapitalize: 'none',
            }}
          />

          <LabeledInput
            label="Senha"
            inputProps={{
              value: password,
              onChangeText: setPassword,
              onFocus: () => clearOnFocus('password'),
              errorMessage: error.password,
              autoCapitalize: 'none',
              secureTextEntry: true,
            }}
          />

          <LabeledInput
            label="Cidade"
            inputProps={{
              value: city,
              onChangeText: setCity,
              onFocus: () => clearOnFocus('city'),
              errorMessage: error.city,
              autoCapitalize: 'none',
            }}
          />

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
