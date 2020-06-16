import React from 'react';

import { Container, ScrollableContainer, Text } from '../../components';
import { Subtitle } from './styles';

export default function Ombudsman({ ombudsman }) {
  return (
    <ScrollableContainer>
      <Container>
        <Text style={{ marginVertical: 10, fontWeight: 'bold', fontSize: 24 }}>
          {ombudsman.name}
        </Text>
        <Subtitle>E-mail</Subtitle>
        <Text>{ombudsman.email}</Text>

        <Subtitle>Telefone</Subtitle>
        <Text>{ombudsman.telephone}</Text>

        <Subtitle>Horário de atendimento</Subtitle>
        <Text>{ombudsman.attendance}</Text>

        <Subtitle>Local</Subtitle>
        <Text>{ombudsman.location}</Text>
      </Container>
    </ScrollableContainer>
  );
}
