/* eslint-disable react/prop-types */
import React, { useState, useEffect, useContext } from 'react';
import { View } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {
  ScrollableContainerWithLoading,
  Text,
  Button,
  LabeledInput,
} from '../../components';
import { OuterContainer } from './styles';
import Api from '../../services/Api';
import colors from '../../utils/colors';
import { SessionContext } from '../../store/session';
import { updateProfile } from '../../store/session/actions';
import { validarEmail } from '../../helpers';

export default function EditarPerfil({ navigation }) {
  const { session } = useContext(SessionContext);
  const { dispatch } = useContext(SessionContext);

  const [idUser, setIdUser] = useState();
  const [nome, setNome] = useState();
  const [sobrenome, setSobrenome] = useState();
  const [email, setEmail] = useState();
  const [senha, setSenha] = useState();
  const [novaSenha, setNovaSenha] = useState();
  const [confirmarNovaSenha, setConfirmarNovaSenha] = useState();
  const [erro, setErro] = useState({});
  const [actionError, setActionError] = useState();
  const [btnLoading, setBtnLoading] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getUser() {
      if ('profile' in session) {
        setIdUser(session.profile.id);
        setEmail(session.profile.email);
        setNome(session.profile.first_name);
        setSobrenome(session.profile.last_name);
      } else {
        session.then(s => {
          setIdUser(s.profile.id);
          setEmail(s.profile.email);
          setNome(s.profile.first_name);
          setSobrenome(s.profile.last_name);
        });
      }

      setLoading(false);
    }

    getUser();
  }, []);

  useEffect(() => setActionError(null), [novaSenha, confirmarNovaSenha]);

  async function handleEditProfile() {
    setBtnLoading(true);

    let requiredConfirmPasswordData = null;

    const formData = {
      nome: { field: 'first_name', value: nome },
      sobrenome: { field: 'last_name', value: sobrenome },
      email: { field: 'email', value: email, validator: validarEmail },
    };

    if (novaSenha || senha) {
      requiredConfirmPasswordData = {
        senha: { field: 'oldPassword', value: senha },
        novaSenha: { field: 'password', value: novaSenha },
        confirmarNovaSenha: {
          field: 'confirmPassword',
          value: confirmarNovaSenha,
        },
      };
    }

    let valid = true;
    const payload = {};

    /** Verificando que temos todos os dados */
    if (formData) {
      for (const key in formData) {
        if (valid) {
          const input = formData[key];

          if (!input.value) {
            valid = false;
            setErro({
              ...erro,
              [key]: input.errorMessage || 'Campo inválido',
            });
          } else if ('validator' in input) {
            valid = input.validator(input.value);
          }
          if (valid) {
            payload[input.field] = input.value;
          }
        }
      }
    }
    /** Verificando que temos todos os dados */
    if (requiredConfirmPasswordData) {
      for (const key in requiredConfirmPasswordData) {
        if (valid) {
          const input = requiredConfirmPasswordData[key];
          if (!input.value) {
            valid = false;
            setErro({
              ...erro,
              [key]: input.errorMessage || 'Campo inválido',
            });
          } else if ('validator' in input) {
            valid = input.validator(input.value);
          }
          if (valid) {
            payload[input.field] = input.value;
          }
        }
      }
    }

    /** Se temos todos os campos válidos */
    if (valid) {
      if (novaSenha && novaSenha !== confirmarNovaSenha) {
        setActionError('As senhas não coincidem');
        setBtnLoading(false);
        return;
      }
      if (
        (novaSenha && novaSenha.length < 6) ||
        (confirmarNovaSenha && confirmarNovaSenha.length < 6)
      ) {
        setActionError('Sua senha deve conter pelo menos 6 digitos');
        setBtnLoading(false);
        return;
      }

      const urlPath = `/user/${idUser}`;
      const updateUser = await Api.put(urlPath, payload);

      if ('message' in updateUser) {
        setActionError(updateUser.message);
      } else {
        dispatch(updateProfile({ profile: updateUser }));
        setActionError('Usuário atualizado com sucesso!!');

        setTimeout(() => {
          navigation.replace('Perfil');
          setActionError('');
        }, 1000);
      }
    }
    setBtnLoading(false);
  }

  function validateOnBlur(value, field, validator, errorMessage) {
    const valid = validator(value);
    if (!valid) {
      setErro({ ...erro, [field]: errorMessage });
    }
  }

  function clearOnFocus(field) {
    setErro({ ...erro, [field]: null });
  }

  function renderUpdateUser() {
    return (
      <OuterContainer>
        <View>
          <LabeledInput
            label="Nome"
            inputProps={{
              value: nome,
              onChangeText: setNome,
              onFocus: () => clearOnFocus('nome'),
              errorMessage: erro.nome,
              autoCapitalize: 'none',
            }}
          />
          <LabeledInput
            label="Sobrenome"
            inputProps={{
              value: sobrenome,
              onChangeText: setSobrenome,
              onFocus: () => clearOnFocus('sobrenome'),
              errorMessage: erro.sobrenome,
              autoCapitalize: 'none',
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
            label="Senha atual"
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
            label="Nova senha"
            inputProps={{
              value: novaSenha,
              onChangeText: setNovaSenha,
              secureTextEntry: true,
              onFocus: () => clearOnFocus('novaSenha'),
              errorMessage: erro.novaSenha,
              autoCapitalize: 'none',
            }}
          />
          <LabeledInput
            label="Confirmar nova senha"
            inputProps={{
              value: confirmarNovaSenha,
              onChangeText: setConfirmarNovaSenha,
              secureTextEntry: true,
              onFocus: () => clearOnFocus('confirmarNovaSenha'),
              errorMessage: erro.confirmarNovaSenha,
              autoCapitalize: 'none',
            }}
          />
          <Text>{actionError}</Text>
        </View>

        <View>
          <Button
            touchableProps={{
              onPress: handleEditProfile,
              background: colors.Blue,
            }}
            textProps={{
              title: 'Salvar',
              loading: btnLoading,
            }}
          />
        </View>
      </OuterContainer>
    );
  }

  return (
    <ScrollableContainerWithLoading loading={loading}>
      <>
        <Text style={{ marginVertical: 10, fontWeight: 'bold', fontSize: 24 }}>
          <Feather
            name="arrow-left"
            size={22}
            color={colors.Gray}
            onPress={() => navigation.pop()}
          />{' '}
          Editar Perfil
        </Text>
        {renderUpdateUser()}
      </>
    </ScrollableContainerWithLoading>
  );
}
