/* eslint-disable react/prop-types */
import React, { useState, useEffect, useContext } from 'react';
import { View } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { ScrollableContainerWithLoading, Button } from '../../components';
import colors from '../../utils/colors';
import { SessionContext } from '../../store/session';
import { OuterContainer, Title, Label, StyledText } from './styles';

export default function Perfil({ navigation }) {
  const { session } = useContext(SessionContext);

  const [nome, setNome] = useState();
  const [sobrenome, setSobrenome] = useState();
  const [email, setEmail] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = navigation.addListener(
      'focus',
      async () => {
        async function getUser() {
          const resolvedSession = await session;
          setEmail(resolvedSession.profile.email);
          setNome(resolvedSession.profile.first_name);
          setSobrenome(resolvedSession.profile.last_name);

          setLoading(false);
        }

        getUser();

        return unsubscribe;
      },
      [navigation]
    );
  });

  function renderInfo() {
    return (
      <OuterContainer>
        <View>
          <Title>Seu Perfil</Title>

          <Label>Nome:</Label>
          <StyledText>
            {nome} {sobrenome}
          </StyledText>

          <Label>E-mail:</Label>
          <StyledText>{email}</StyledText>
        </View>

        <View>
          <Button
            touchableProps={{
              onPress: () => navigation.navigate('EditarPerfil'),
              background: colors.Blue,
            }}
            textProps={{
              title: 'Editar Perfil',
            }}
          />
          <Button
            touchableProps={{
              onPress: () => navigation.navigate('Historico'),
              background: colors.Blue,
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
      <StyledText
        style={{
          marginTop: 20,
          marginHorizontal: 5,
          fontWeight: 'bold',
          fontSize: 24,
        }}>
        <Feather
          name="arrow-left"
          size={30}
          color={colors.Gray}
          onPress={() => navigation.pop()}
        />
      </StyledText>
      {renderInfo()}
    </ScrollableContainerWithLoading>
  );
}
