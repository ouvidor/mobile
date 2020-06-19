import React from 'react';
import { View } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

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

  const date = format(
    parseISO(manifestation.updated_at),
    "dd 'de' MMMM 'às' HH':'mm",
    {
      locale: pt,
    }
  );

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
          <DateText>Última atualização {date}</DateText>

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
