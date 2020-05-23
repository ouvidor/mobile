/* eslint-disable react/prop-types */
import React, { useState, useEffect, useContext } from 'react';
import { View } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { ScrollableContainerWithLoading, Text, Button } from '../../components';
import { OuterContainer } from './styles';
import colors from '../../utils/colors';
import { SessionContext } from '../../store/session';

export default function Perfil({ navigation }) {
  const { session } = useContext(SessionContext);

  const [nome, setNome] = useState();
  const [sobrenome, setSobrenome] = useState();
  const [email, setEmail] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getUser() {
      if ('profile' in session) {
        const { email, first_name, last_name } = session.profile;
        setEmail(email);
        setNome(first_name);
        setSobrenome(last_name);
      } else {
        session.then(s => {
          const { id, email, first_name, last_name } = s.profile;
          setEmail(email);
          setNome(first_name);
          setSobrenome(last_name);
        });
      }

      setLoading(false);
    }

    getUser();
  }, []);

  function renderInfo() {
    return (
      <OuterContainer>
        <View>
          <Text style={{ marginTop: 10, fontWeight: 'bold', fontSize: 20 }}>
            Nome:
          </Text>
          <Text style={{}}>
            {nome} {sobrenome}
          </Text>

          <Text style={{ marginTop: 10, fontWeight: 'bold', fontSize: 20 }}>
            E-mail:
          </Text>

          <Text style={{ marginBottom: 10 }}>{email}</Text>
        </View>

        <View>
          <Button
            touchableProps={{
              onPress: () => navigation.navigate('EditarPerfil'),
              background: colors.Blu,
            }}
            textProps={{
              title: 'Editar Perfil',
            }}
          />
          <Button
            touchableProps={{
              onPress: () => navigation.navigate('Historico'),
              background: colors.Blu,
            }}
            textProps={{
              title: 'Meu Histórico',
            }}
          />
        </View>
      </OuterContainer>
    );
  }

  return (
    <ScrollableContainerWithLoading loading={loading}>
      <Text style={{ marginVertical: 10, fontWeight: 'bold', fontSize: 24 }}>
        <Feather
          name="arrow-left"
          size={22}
          color={colors.BlackSirius}
          onPress={() => navigation.pop()}
        />{' '}
        Perfil
      </Text>
      {renderInfo()}
    </ScrollableContainerWithLoading>
  );
}
