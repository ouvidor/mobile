/* eslint-disable react/prop-types */
import React from 'react';
import { View } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';

import formatDate from '../../helpers/formatDate';
import TagsList from '../TagList';
import { Container, Title, Footer, DateText } from './styles';

const ManifestationCard = ({ manifestation, handleSelectManifestation }) => {
  const categories = manifestation.categories_title.split(',');
  const tags = [
    ...categories.map(category => category),
    manifestation.type_title,
  ];
  const { hour, date } = formatDate(manifestation.updated_at);

  return (
    <Container>
      <Title>{manifestation.title}</Title>

      {manifestation.type_title && <TagsList tags={tags} />}
      <Footer>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <DateText>
            Última atualização {date} às {hour}
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
