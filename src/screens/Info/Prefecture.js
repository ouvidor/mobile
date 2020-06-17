import React, { useState, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';

import { Container, ScrollableContainer, Text } from '../../components';
import { Subtitle } from './styles';
import Api from '../../services/Api';
import colors from '../../utils/colors';

export default function Prefecture({ prefecture }) {
  const [loading, setLoading] = useState(true);
  const [manifestationCount, setManifestationCount] = useState();

  const { Gray } = colors;

  useEffect(() => {
    async function getManifestationCount() {
      setLoading(true);
      const manifestations = await Api.get('/manifestation');
      setManifestationCount(manifestations.count);
      setLoading(false);
    }

    getManifestationCount();
  }, []);

  return (
    <ScrollableContainer>
      <Container>
        {loading || !prefecture ? (
          <ActivityIndicator
            style={{ marginTop: 30 }}
            size="large"
            color={Gray}
          />
        ) : (
          <>
            <Text
              style={{ marginVertical: 10, fontWeight: 'bold', fontSize: 24 }}>
              {prefecture.name}
            </Text>
            <Subtitle>E-mail</Subtitle>
            <Text>{prefecture.email}</Text>

            <Subtitle>Telefone</Subtitle>
            <Text>{prefecture.telephone}</Text>

            <Subtitle>Horário de atendimento</Subtitle>
            <Text>{prefecture.attendance}</Text>

            <Subtitle>Local</Subtitle>
            <Text>{prefecture.location}</Text>

            <Text />
            <Text>Total de casos relatados: {manifestationCount}</Text>
          </>
        )}
      </Container>
    </ScrollableContainer>
  );
}
