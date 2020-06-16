/* eslint-disable react/prop-types */
import React from 'react';
import { FlatList } from 'react-native';

import { TagContainer, StyledText } from './styles';

const TagList = ({ tags }) => {
  return (
    <FlatList
      data={tags}
      keyExtractor={item => item}
      horizontal
      renderItem={({ item }) => (
        <TagContainer>
          <StyledText>{item}</StyledText>
        </TagContainer>
      )}
    />
  );
};

export default TagList;
