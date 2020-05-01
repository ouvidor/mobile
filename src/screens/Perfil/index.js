/* eslint-disable react/prop-types */
import React, { useState, useEffect, useContext } from 'react';
import {
  ScrollableContainerWithLoading,
  Text,
  Button,
} from '../../components';
import Api from '../../services/Api';
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
        let { email, first_name, last_name } = session.profile;
        setEmail(email);
        setNome(first_name);
        setSobrenome(last_name);
      } else {
        session.then(s => {
          let { id, email, first_name, last_name } = s.profile;
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
      <>
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

        <Button
          touchableProps={{
            onPress: () => navigation.navigate('EditarPerfil'),
            background: colors.Blu,
          }}
          textProps={{
            title: 'Atualizar informações',
          }}
        />
      </>
    );
  }

  return (
    <ScrollableContainerWithLoading loading={loading}>
      {renderInfo()}
    </ScrollableContainerWithLoading>
  );
}
