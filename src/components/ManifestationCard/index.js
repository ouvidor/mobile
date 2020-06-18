/* eslint-disable react/prop-types */
import React from 'react';
import { View } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';

import formatDate from '../../helpers/formatDate';
import TagsList from '../TagList';
import { Container, Title, Footer, DateText } from './styles';

const ManifestationCard = ({ manifestation, handleSelectManifestation }) => {
  let categories;
  let type;
  if (manifestation.categories_title) {
    categories = manifestation.categories_title.split(',');
    type = manifestation.type_title;
  } else {
    categories = [...manifestation.categories.map(category => category.title)];
    type = manifestation.type.title;
  }
  const tags = [...categories.map(category => category), type];
  const { hour, date } = formatDate(manifestation.updated_at);

  return (
    <Container>
      <Title>{manifestation.title}</Title>

      {tags && <TagsList tags={tags} />}
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
