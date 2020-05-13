/* eslint-disable react/prop-types */
import React from 'react';
import { View } from 'react-native';

import styled from 'styled-components/native';
import Feather from 'react-native-vector-icons/Feather';
import { Text, fontFaces } from './Text';
import { ManifestationTipoTag } from './Tags';
import { OutlinedButton } from './Button';
import statusManifestation from '../utils/status';

const HistoricContainer = styled.TouchableOpacity`
  margin: 10px;
  padding: 10px;
  border: 0.5px solid black;
  border-radius: 10px;
`;

const HistoricManifestation = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ManifestationTitle = styled(Text).attrs(() => ({
  ellipsizeMode: 'tail',
  numberOfLines: 1,
}))`
  font-size: 18px;
  font-family: ${fontFaces.ExtraBold};
`;

const InnerCardFooter = styled(Text)`
  margin-top: 10px;
  font-size: 14px;
  font-family: ${fontFaces.BoldItalic};
`;

const HistoricLista = styled.FlatList.attrs({
  showVerticalScrollIndicator: false,
  contentContainerStyle: { padding: 0 },
})``;

export const HistoricCard = props => {
  const { manifestation = {}, handleManifestationPress } = props;
  const date = new Date(manifestation.item.created_at);

  function renderTipoTags() {
    const toRender = [];
    if (manifestation && manifestation.item.categories) {
      manifestation.item.categories.map(c => {
        toRender.push(<ManifestationTipoTag>{c.title}</ManifestationTipoTag>);
      });
    }

    return toRender;
  }

  function renderCurrentStatus() {
    const i = manifestation.item.status_history.length;
    const currentStatus = manifestation.item.status_history[i - 1];
    const status = statusManifestation[currentStatus.status.id];

    return (
      <OutlinedButton color={status.color} style={{ width: 110 }}>
        <Feather name={status.icon} size={18} />
        {status.name}
      </OutlinedButton>
    );
  }

  return (
    <HistoricContainer
      onPress={() => handleManifestationPress(manifestation.item)}
    >
      <HistoricManifestation>
        <View>
          <ManifestationTitle>{manifestation.item.title}</ManifestationTitle>
        </View>
        <View>{renderCurrentStatus()}</View>
      </HistoricManifestation>
      {renderTipoTags()}
      <InnerCardFooter>
        Criada em {date.toLocaleDateString()} às{' '}
        {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </InnerCardFooter>
    </HistoricContainer>
  );
};

export const HistoricList = props => {
  const {
    manifestations = {},
    handleManifestationPress,
    handleNextPage,
  } = props;

  return (
    <HistoricLista
      data={manifestations}
      keyExtractor={manifestation => manifestation.protocol}
      onEndReachedThreshold={0.01}
      onEndReached={handleNextPage}
      renderItem={manifestation => (
        <HistoricCard
          manifestation={manifestation}
          handleManifestationPress={handleManifestationPress}
        />
      )}
    />
  );
};
