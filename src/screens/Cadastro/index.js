/* eslint-disable react/prop-types */
import React, { useState, useContext } from 'react';
import { View } from 'react-native';
import { useNetInfo } from '@react-native-community/netinfo';
import { showMessage } from 'react-native-flash-message';
import { StandardBackground } from '../../components/BackgroundImage';
import {
  ScrollableContainer,
  LabeledInput,
  Button,
  Text,
} from '../../components';
import { ContainerForm } from './styles';
import { validarEmail, SignIn } from '../../helpers';
import Api from '../../services/Api';
import colors from '../../utils/colors';
import { SessionContext } from '../../store/session';
import { signIn } from '../../store/session/actions';

export default function Cadastro({ navigation }) {
  const [nome, setNome] = useState();
  const [sobrenome, setSobrenome] = useState();
  const [email, setEmail] = useState();
  const [senha, setSenha] = useState();
  const [city, setCity] = useState();
  const [erro, setErro] = useState({});
  const [btnLoading, setBtnLoading] = useState(false);
  const { dispatch } = useContext(SessionContext);

  const netInfo = useNetInfo();

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
    setBtnLoading(true);
    const requiredData = {
      nome: { field: 'first_name', value: nome },
      sobrenome: { field: 'last_name', value: sobrenome },
      email: { field: 'email', value: email, validator: validarEmail },
      senha: { field: 'password', value: senha },
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
          setErro({ ...erro, [key]: input.errorMessage || 'Campo inválido' });
        } else if ('validator' in input) {
          valid = input.validator(input.value);
        }
        if (valid) {
          payload[input.field] = input.value;
        }
      }
    }

    /** Se temos todos os campos válidos, posso cadastrar o usuário */
    if (valid) {
      const cadastro = await Api.post('/user', payload);

      if (cadastro.id) {
        const sign = await SignIn(
          payload.email,
          payload.password,
          payload.city
        );
        if (sign.user) {
          dispatch(
            signIn({
              token: sign.token,
              profile: sign.user,
              city: payload.city,
            })
          );
          navigation.replace('Home');
        }
      }
    }
    setBtnLoading(false);
  }

  function CheckConnectivity() {
    if (netInfo.isConnected) {
      handleSignUp();
    } else {
      showMessage({
        message: 'Você está sem conexão a rede',
        type: 'danger',
        icon: { icon: 'auto', position: 'left' },
        duration: 3000,
      });
    }
  }

  return (
    <StandardBackground>
      <ScrollableContainer>
        <ContainerForm>
          <LabeledInput
            label="Nome"
            inputProps={{
              value: nome,
              onChangeText: setNome,
              onFocus: () => clearOnFocus('nome'),
              errorMessage: erro.nome,
            }}
          />
          <LabeledInput
            label="Sobrenome"
            inputProps={{
              value: sobrenome,
              onChangeText: setSobrenome,
              onFocus: () => clearOnFocus('sobrenome'),
              errorMessage: erro.sobrenome,
            }}
          />
          <LabeledInput
            label="Email"
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
            label="Senha"
            inputProps={{
              value: senha,
              onChangeText: setSenha,
              secureTextEntry: true,
              onFocus: () => clearOnFocus('senha'),
              errorMessage: erro.senha,
              autoCapitalize: 'none',
            }}
          />

          <LabeledInput
            label="Cidade"
            inputProps={{
              value: city,
              onChangeText: setCity,
              onFocus: () => clearOnFocus('city'),
              errorMessage: erro.city,
              autoCapitalize: 'none',
            }}
          />

          <Button
            touchableProps={{
              onPress: CheckConnectivity,
              background: colors.Blue,
            }}
            textProps={{
              title: 'Cadastrar',
              loading: btnLoading,
            }}
          />
          <View style={{ alignItems: 'center', marginTop: 20 }}>
            <Text>Já tem conta?</Text>
            <Text
              style={{
                lineHeight: 20,
                fontSize: 18,
                fontWeight: 'bold',
                color: colors.Blue,
              }}
              onPress={() => navigation.navigate('Login')}>
              Faça login!
            </Text>
          </View>
        </ContainerForm>
      </ScrollableContainer>
    </StandardBackground>
  );
}
