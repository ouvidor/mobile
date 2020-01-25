/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import {
  ScrollableContainer,
  LabeledInput,
  Button,
  Text,
} from '../../components';
import { validarEmail, SignIn } from '../../helpers';
import Api from '../../services/Api';

export default function Cadastro({ navigation }) {
  const [nome, setNome] = useState();
  const [sobrenome, setSobrenome] = useState();
  const [email, setEmail] = useState();
  const [senha, setSenha] = useState();
  const [erro, setErro] = useState({});
  const [actionError, setActionError] = useState();

  useEffect(() => setActionError(null), [nome, sobrenome, email, senha]);

  /**
   *
   * @param {string} value
   * @param {string} field
   * @param {function} validator
   * @param {*string} errorMessage
   * @author Lucas Sousa
   * @since 2020.01.24
   * @description
   * Valida value utilizando validator.
   * Se value não passar na validação, atualizo erro[field] com errorMessage
   */
  function validateOnBlur(value, field, validator, errorMessage) {
    const valid = validator(value);
    if (!valid) {
      setErro({ ...erro, [field]: errorMessage });
    }
  }

  /**
   *
   * @param {string} field
   * @author Lucas Sousa
   * @since 2020.01.24
   * @description
   * Limpa o erro de input ao ser focado.
   */
  function clearOnFocus(field) {
    setErro({ ...erro, [field]: null });
  }

  /**
   * @author Lucas Sousa
   * @since 2020.01.24
   * @description
   * Valida os dados do formulário e cadastra o usuário
   */
  async function handleSignUp() {
    const requiredData = {
      nome: { field: 'first_name', value: nome },
      sobrenome: { field: 'last_name', value: sobrenome },
      email: { field: 'email', value: email, validator: validarEmail },
      senha: { field: 'password', value: senha },
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
          setErro({ ...erro, [key]: values.errorMessage || 'Campo inválido' });
        } else if ('validator' in values) {
          valid = values.validator(values.value);
        }
        if (valid) {
          payload[values.field] = values.value;
        }
      }
    });

    /** Se temos todos os campos válidos, posso cadastrar o usuário */
    if (valid) {
      const cadastro = await Api.post('/user', payload);

      if ('error' in cadastro) {
        setActionError(cadastro.error);
      } else {
        await SignIn(payload.email, payload.password);
        navigation.replace('Home');
      }
    }
  }

  return (
    <ScrollableContainer>
      <LabeledInput
        labelProps={{ label: 'Nome' }}
        inputProps={{
          value: nome,
          onChangeText: setNome,
          onFocus: () => clearOnFocus('nome'),
          errorMessage: erro.nome,
        }}
      />
      <LabeledInput
        labelProps={{ label: 'Sobrenome' }}
        inputProps={{
          value: sobrenome,
          onChangeText: setSobrenome,
          onFocus: () => clearOnFocus('sobrenome'),
          errorMessage: erro.sobrenome,
        }}
      />
      <LabeledInput
        labelProps={{ label: 'E-mail' }}
        inputProps={{
          value: email,
          onChangeText: setEmail,
          onBlur: () =>
            validateOnBlur(email, 'email', validarEmail, 'E-mail inválido'),
          onFocus: () => clearOnFocus('email'),
          errorMessage: erro.email,
          autoCapitalize: 'none',
        }}
      />
      <LabeledInput
        labelProps={{ label: 'Senha' }}
        inputProps={{
          value: senha,
          onChangeText: setSenha,
          secureTextEntry: true,
          onFocus: () => clearOnFocus('senha'),
          errorMessage: erro.senha,
          autoCapitalize: 'none',
        }}
      />

      <Text>{actionError}</Text>

      <Button
        touchableProps={{ onPress: handleSignUp }}
        textProps={{ title: 'Cadastrar' }}
      />
    </ScrollableContainer>
  );
}
