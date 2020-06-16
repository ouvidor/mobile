/* eslint-disable react/prop-types */
import React from 'react';
import { View } from 'react-native';

import { Container, Title, Description, Footer, DateText } from './styles';

const ManifestationStatus = ({ status }) => {
  const date = new Date(status.created_at);
  const data = date.toLocaleDateString();
  const hora = date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <Container>
      <Title>{status.title}</Title>

      <Description>{status.description}</Description>

      <Footer>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <DateText>
            Criada {data} às {hora}
          </DateText>
        </View>
      </Footer>
    </Container>
  );
};

export default ManifestationStatus;
