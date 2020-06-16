/* eslint-disable react/prop-types */
import React from 'react';
import { View } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';

import TagsList from '../TagList';
import { Container, Title, Footer, DateText } from './styles';

const ManifestationCard = ({ manifestation, handleSelectManifestation }) => {
  const tags = [
    ...manifestation.categories.map(category => category.title),
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

      {manifestation.type && <TagsList tags={tags} />}
      <Footer>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <DateText>
            Última atualização {data} às {hora}
          </DateText>

          <FeatherIcon
            name="arrow-right"
            size={24}
            onPress={() => handleSelectManifestation(manifestation.id)}
          />
        </View>
      </Footer>
    </Container>
  );
};

export default ManifestationCard;
