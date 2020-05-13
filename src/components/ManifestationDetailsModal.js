/* eslint-disable react/prop-types */
import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import Modal from 'react-native-modal';
import Feather from 'react-native-vector-icons/Feather';
import { Container, ScrollableContainer } from './Container';
import { Text, fontFaces } from './Text';
import { ManifestationTipoTag } from './Tags';
import { OutlinedButton } from './Button';
import colors from '../utils/colors';
import statusManifestation from '../utils/status';

const { globalColors } = colors;

const FOOTER_HEIGHT = 20;

const ManifestationDetailsModalContainer = styled(Container)`
  background: transparent;
  margin: 20px 0;
`;
const ManifestationDetailsModalInnerContainer = styled(Container)`
  background: white;
  border-radius: 11px;
  padding: 10px 15px;
`;

const ManifestationDetailsHeader = styled.View`
  flex-direction: row;
`;
const ManifestationDetailsHeaderLeft = styled.View`
  flex: 1;
`;
const ManifestationDetailsHeaderRight = styled.View`
  flex: 1;
  align-items: flex-end;
`;
const ManifestationTitle = styled(Text).attrs(() => ({
  ellipsizeMode: 'tail',
  numberOfLines: 1,
}))`
  font-size: 21px;
  font-family: ${fontFaces.ExtraBold};
`;

const ManifestationDetailsBody = styled(ScrollableContainer)`
  padding: 0;
  margin-bottom: ${FOOTER_HEIGHT}px;
  margin-top: 10px;
`;

const ManifestationDetailsFooter = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  position: absolute;
  bottom: 5px;
  left: 3px;
  padding: 5px 3px;
  height: ${FOOTER_HEIGHT}px;
`;
const ManifestationDetailsFooterText = styled(Text)`
  text-transform: uppercase;
  font-size: 12px;
`;

const InnerCardContainer = styled(Container)`
  padding: 10px 15px;
  margin: 5px 0;
  border: 1px solid ${globalColors.dark};
  border-radius: 15px;
  max-height: 175px;
`;

const InnerCardHeader = styled(Container)`
  padding: 0;
  flex-direction: row;
  justify-content: space-between;
`;

const InnerCardHeaderLeft = styled(Container)`
  flex-direction: row;
  align-items: center;
  padding: 0;
`;
const InnerCardTitle = styled(Text)`
  color: ${props => props.color || globalColors.success};
  font-family: ${fontFaces.Bold};
`;
const InnerCardHeaderRight = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 0;
`;
const InnerCardAttachment = styled(Text)`
  margin-left: 3px;
  color: ${globalColors.dark};
  font-family: ${fontFaces.Bold};
`;

const InnerCardBody = styled(Container)`
  padding: 0;
  margin: 10px 0;
`;
const InnerCardBodyContent = styled(Text)`
  font-size: 14px;
`;

const InnerCardFooter = styled(Text)`
  font-size: 14px;
  font-family: ${fontFaces.BoldItalic};
`;

const ManifestationDetailsInnerCard = props => {
  const { status } = props;

  if (!status) {
    return null;
  }

  const statusInfo = statusManifestation[status.status.id];
  const date = new Date(status.created_at);

  return (
    <InnerCardContainer>
      <InnerCardHeader>
        <InnerCardHeaderLeft>
          <Feather name={statusInfo.icon} size={21} color={statusInfo.color} />
          <InnerCardTitle color={statusInfo.color}>
            {statusInfo.name}
          </InnerCardTitle>
        </InnerCardHeaderLeft>
        {status.image && (
          <InnerCardHeaderRight>
            <Feather name="image" size={21} color={globalColors.dark} />
            <InnerCardAttachment>Imagem</InnerCardAttachment>
          </InnerCardHeaderRight>
        )}
      </InnerCardHeader>

      <InnerCardBody>
        <InnerCardBodyContent>{status.description}</InnerCardBodyContent>
      </InnerCardBody>

      <InnerCardFooter>
        Atualizado em: {date.toLocaleDateString()} às{' '}
        {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}h
      </InnerCardFooter>
    </InnerCardContainer>
  );
};

export const ManifestationDetailsModal = props => {
  const {
    manifestation = {},
    isVisible = false,
    close = () => {},
    onBackButtonPress = () => close(),
  } = props;

  function renderTipoTags() {
    const toRender = [];
    if (manifestation && manifestation.categories) {
      manifestation.categories.map(c => {
        return toRender.push(
          <ManifestationTipoTag>{c.title}</ManifestationTipoTag>
        );
      });
    }

    return toRender;
  }

  function renderCurrentStatus() {
    const toRender = [];
    if (manifestation && manifestation.status_history) {
      const i = manifestation.status_history.length;
      const currentStatus = manifestation.status_history[i - 1];
      const status = statusManifestation[currentStatus.status.id];
      toRender.push(
        <OutlinedButton color={status.color} style={{ width: 110 }}>
          <Feather name={status.icon} size={18} />
          {status.name}
        </OutlinedButton>
      );
    }

    return toRender;
  }

  function renderStatusHistory() {
    const toRender = [];
    if (manifestation && manifestation.status_history) {
      const statusHistory = manifestation.status_history;
      statusHistory
        .slice(0)
        .reverse()
        .map(s => {
          return toRender.push(<ManifestationDetailsInnerCard status={s} />);
        });
    }

    return toRender;
  }
  return (
    <Modal
      isVisible={isVisible}
      onBackButtonPress={onBackButtonPress}
      animationInTiming={600}
      animationOutTiming={600}
      backdropTransitionOutTiming={0}
    >
      <ManifestationDetailsModalContainer>
        <ManifestationDetailsModalInnerContainer>
          <ManifestationDetailsHeader>
            <ManifestationDetailsHeaderLeft>
              <ManifestationTitle>
                {manifestation ? manifestation.title : 'Title'}
              </ManifestationTitle>
              {renderTipoTags()}
            </ManifestationDetailsHeaderLeft>
            <ManifestationDetailsHeaderRight>
              {renderCurrentStatus()}
              <View style={{ flex: 1 }} />
            </ManifestationDetailsHeaderRight>
          </ManifestationDetailsHeader>

          <ManifestationDetailsBody>
            {renderStatusHistory()}
          </ManifestationDetailsBody>

          <ManifestationDetailsFooter onPress={close}>
            <Feather name="arrow-left" size={16} />
            <ManifestationDetailsFooterText>
              Voltar
            </ManifestationDetailsFooterText>
          </ManifestationDetailsFooter>
        </ManifestationDetailsModalInnerContainer>
      </ManifestationDetailsModalContainer>
    </Modal>
  );
};
