/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components/native';
import Modal from 'react-native-modal';
import Feather from 'react-native-vector-icons/Feather';
import { Container, ScrollableContainer } from './Container';
import { Text, fontFaces } from './Text';
import { ManifestationTipoTag } from './Tags';
import { OutlinedButton } from './Button';
import colors from '../utils/colors';

const { globalColors } = colors;

const FOOTER_HEIGHT = 20;

const ManifestationDetailsModalContainer = styled(Container)`
  background: transparent;
  margin: 20px 0;
`;
const ManifestationDetailsModalInnerContainer = styled(Container)`
  background: white;
  border-radius: 10px;
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
  color: ${globalColors.success};
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

const ManifestationDetailsInnerCard = () => {
  return (
    <InnerCardContainer>
      <InnerCardHeader>
        <InnerCardHeaderLeft>
          <Feather name="check" size={21} color={globalColors.success} />
          <InnerCardTitle>Resolvido</InnerCardTitle>
        </InnerCardHeaderLeft>
        <InnerCardHeaderRight>
          <Feather name="image" size={21} color={globalColors.dark} />
          <InnerCardAttachment>Imagem</InnerCardAttachment>
        </InnerCardHeaderRight>
      </InnerCardHeader>

      <InnerCardBody>
        <InnerCardBodyContent>
          Lorem ipsum dolor sit amet, consec tetur adipiscing elit.
        </InnerCardBodyContent>
      </InnerCardBody>

      <InnerCardFooter>Atualizado em: 04/04/2002 às 17:59h</InnerCardFooter>
    </InnerCardContainer>
  );
};

export const ManifestationDetailsModal = props => {
  const {
    isVisible = false,
    close = () => {},
    onBackButtonPress = () => close(),
  } = props;

  return (
    <Modal
      isVisible={isVisible}
      onBackButtonPress={onBackButtonPress}
      animationInTiming={600}
      animationOutTiming={600}
    >
      <ManifestationDetailsModalContainer>
        <ManifestationDetailsModalInnerContainer>
          <ManifestationDetailsHeader>
            <ManifestationDetailsHeaderLeft>
              <ManifestationTitle>
                Suco de Farofa é um titulo demasiadamente grande
              </ManifestationTitle>
              <ManifestationTipoTag>Tag</ManifestationTipoTag>
            </ManifestationDetailsHeaderLeft>
            <ManifestationDetailsHeaderRight>
              <OutlinedButton color="green" style={{ width: 110 }}>
                <Feather name="check" size={18} />
                Resolvido
              </OutlinedButton>
              <OutlinedButton style={{ width: 110 }}>Seguir</OutlinedButton>
            </ManifestationDetailsHeaderRight>
          </ManifestationDetailsHeader>

          <ManifestationDetailsBody>
            <ManifestationDetailsInnerCard />
            <ManifestationDetailsInnerCard />
            <ManifestationDetailsInnerCard />
            <ManifestationDetailsInnerCard />
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
