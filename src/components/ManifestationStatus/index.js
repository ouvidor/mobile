/* eslint-disable react/prop-types */
import React from 'react';

import { Container, Description, DateText } from './styles';

const ManifestationStatus = ({ status }) => {
  const date = new Date(status.created_at);
  const data = date.toLocaleDateString();
  const hora = date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <Container>
      <Description>{status.description}</Description>

      <DateText>
        Criada {data} às {hora}
      </DateText>
    </Container>
  );
};

export default ManifestationStatus;
