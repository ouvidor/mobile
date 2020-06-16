/* eslint-disable react/prop-types */
import React from 'react';
import { View, Text } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';

import TagsList from '../TagList';
import { Container, Title, Footer } from './styles';

const ManifestationCard = ({ manifestation, handleOpenManifestation }) => {
  const tags = [
    manifestation.categories.map(category => category.title),
    manifestation.type.title,
  ];
  const date = new Date(manifestation.updated_at);
  const data = date.toLocaleDateString();
  const hora = date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <Container>
      <Title>{manifestation.title}</Title>

      {manifestation.types && <TagsList tags={tags} />}
      <Footer>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text>
            Última atualização {data} às {hora}
          </Text>
          <FeatherIcon
            name="arrow-right"
            size={21}
            onPress={handleOpenManifestation}
          />
        </View>
      </Footer>
    </Container>
  );
};

export default ManifestationCard;
