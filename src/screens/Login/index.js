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
  const [error, setError] = useState({});
  const [actionError, setActionError] = useState();
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
    };

    let valid = true;
    const payload = {};

    payload.city = 'Cabo Frio';

    /** Verificando que temos todos os dados */
    Object.entries(requiredData).map(k => {
      if (valid) {
        const key = k[0];
        const values = k[1];

        if (!values.value) {
          valid = false;
          setError({
            ...error,
            [key]: values.errorMessage || 'Campo obrigatório',
          });
        }
        if (valid) {
          payload[values.field] = values.value;
        }
      }
    });

    if (valid) {
      const login = await SignIn(payload.email, payload.password, payload.city);
      dispatch(signIn({ token: login.token, profile: login.user }));

      if ('error' in login) {
        setActionError(login.messages ? login.messages[0] : login.error);
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

          <Text>{actionError}</Text>

          <View
            style={{
              width: '100%',
              alignSelf: 'center',
              borderBottomColor: colors.Gray,
              borderBottomWidth: 0.4,
              marginBottom: 20,
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
