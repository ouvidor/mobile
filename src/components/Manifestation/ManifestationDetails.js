/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import styled from 'styled-components/native';
import Feather from 'react-native-vector-icons/Feather';
import Modal from 'react-native-modal';
import { Text } from '../index';
import { Container } from '../Container';
import Api from '../../services/Api';

const statusColors = {
  2: '#87ffab',
  default: '#ececec',
};

export const ManifestationTitle = styled(Text).attrs({
  fontFamily: 'Bold',
})`
  font-size: 19px;
  margin-bottom: 20px;
`;

const SHContainer = styled.View`
  flex: 1;
  background: ${props =>
    props.status && Object.keys(statusColors).includes(props.status)
      ? statusColors[props.status]
      : statusColors.default};
  margin-vertical: 10px;
  padding: 5px;
`;

const AnexoIcon = styled(Feather).attrs(props => ({
  name: 'paperclip',
  size: 21,
  onPress: props.onPress,
}))`
  padding: 10px;
  align-self: flex-end;
`;

const AnexoImagem = styled.Image.attrs(props => ({
  source: props.source,
}))`
  width: 100px;
  height: 100px;
`;

export const StatusHistory = ({ data }) => {
  const [visible, setVisible] = useState(false);

  if (!data) return null;

  const { updated_at, description, status } = data;

  async function handlePress() {
    setVisible(!visible);
  }

  async function getImage() {
    const x = await Api.get('files/17');

    return x;
  }

  function renderAnexo() {
    if (data.files.length > 0) {
      return <AnexoIcon onPress={handlePress} />;
    }

    return null;
  }

  return (
    <SHContainer status={status.id}>
      {renderAnexo()}
      <Text>Status atualizado para: {status.title}</Text>
      <Text>{description}</Text>
      <Modal
        isVisible={visible}
        onBackButtonPress={() => setVisible(false)}
        animationInTiming={400}
        animationOutTiming={400}
        backdropTransitionOutTiming={0}>
        <Container>
          <AnexoImagem source={{ uri: getImage() }} />
        </Container>
      </Modal>
    </SHContainer>
  );
};
