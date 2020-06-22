import React from 'react';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import { Container, Description, DateText } from './styles';

const ManifestationStatus = ({ status, handleStatusPress }) => {
  const date = format(
    parseISO(status.created_at),
    "dd 'de' MMMM 'às' HH':'mm",
    {
      locale: pt,
    }
  );

  return (
    <Container onPress={handleStatusPress}>
      <Description>{status.status.title}</Description>

      <DateText>Criada {date}</DateText>
    </Container>
  );
};

export default ManifestationStatus;
