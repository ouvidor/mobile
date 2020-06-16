/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components/native';

import ManifestationCard from '../ManifestationCard';

const StyledFlatList = styled.FlatList.attrs({
  showVerticalScrollIndicator: false,
  contentContainerStyle: { padding: 0 },
})``;

const ManifestationList = ({
  manifestations = [],
  navigation,
  handleNextPage,
}) => {
  function handleSelectManifestation(manifestationId) {
    navigation.navigate('ManifestacaoDetalhes', {
      id: manifestationId.id,
    });
  }

  return (
    <StyledFlatList
      data={manifestations}
      keyExtractor={item => String(item.id)}
      onEndReachedThreshold={0.01}
      onEndReached={handleNextPage}
      renderItem={({ item }) => (
        <ManifestationCard
          key={item.id}
          handleSelectManifestation={() => handleSelectManifestation(item.id)}
          manifestation={item}
        />
      )}
    />
  );
};

export default ManifestationList;
