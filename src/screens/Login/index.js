/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { View } from 'react-native';
import { Container, Button, LabeledInput, Text } from '../../components';
import { StandardBackground } from '../../components/BackgroundImage';
import { SignIn } from '../../helpers';
import { ContainerForm } from './styles';
import colors from '../../utils/colors';

export default function Login({ navigation }) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState({});
  const [actionError, setActionError] = useState();
  const [btnLoading, setBtnLoading] = useState(false);

  function clearOnFocus(field) {
    setError({ ...error, [field]: null });
  }

  async function handleLogin() {
    const requiredData = {
      email: { field: 'email', value: email },
      password: { field: 'password', value: password },
    };

    let valid = true;
    const payload = {};

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
      const login = await SignIn(payload.email, payload.password);

      if ('error' in login) {
        setActionError(login.messages ? login.messages[0] : login.error);
      } else {
        navigation.replace('Home');
      }
    }
  }

  return (
    <Container noPadding>
      <StandardBackground>
        <ContainerForm >
          <LabeledInput
            inputProps={{
              value: email,
              onChangeText: setEmail,
              onFocus: () => clearOnFocus('email'),
              errorMessage: error.email,
              autoCapitalize: 'none',
              placeholder: 'Email'
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
              borderBottomColor: colors.BlackSirius,
              borderBottomWidth: .4,
              marginBottom: 20
            }}
          />

          <Button
            touchableProps={{ onPress: handleLogin, background: colors.Blu }}
            textProps={{
              title: 'Login',
              loading: btnLoading,
            }}
            style={{width: '100%'}}
          />

          <View style={{alignItems: 'center', marginTop: 20}}>
            <Text>Não tem conta?</Text>
            <Text
              style={{
                lineHeight: 20,
                fontSize: 18,
                fontWeight: 'bold',
                color: colors.Blu
              }}
              onPress={() => navigation.navigate('Cadastro')}>Cadastre-se já
            </Text>
          </View>
        </ContainerForm>
      </StandardBackground>
    </Container>
  );
}
