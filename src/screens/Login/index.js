/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Container, Button, LabeledInput, Text } from '../../components';
import { SignIn } from '../../helpers';

export default function Login({ navigation }) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState({});
  const [actionError, setActionError] = useState();

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
    <Container>
      <LabeledInput
        labelProps={{ label: 'E-mail' }}
        inputProps={{
          value: email,
          onChangeText: setEmail,
          onFocus: () => clearOnFocus('email'),
          errorMessage: error.email,
          autoCapitalize: 'none',
        }}
      />

      <LabeledInput
        labelProps={{ label: 'Senha' }}
        inputProps={{
          value: password,
          onChangeText: setPassword,
          onFocus: () => clearOnFocus('password'),
          errorMessage: error.password,
          autoCapitalize: 'none',
          secureTextEntry: true,
        }}
      />

      <Text>{actionError}</Text>

      <Button
        touchableProps={{ onPress: handleLogin }}
        textProps={{ title: 'Entrar' }}
      />
    </Container>
  );
}
