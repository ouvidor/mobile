import React, { useState } from 'react';
import { showMessage } from 'react-native-flash-message';

import Api from '../../services/Api';
import { LabeledInput } from '../../components';
import {
  SectionTitle,
  Container,
  SaveEditButton,
  SaveEditText,
} from './styles';

const EditManifestation = ({ route, navigation }) => {
  const { manifestation } = route.params;

  const [title, setTitle] = useState(manifestation.title);
  const [description, setDescription] = useState(manifestation.description);

  async function handleSubmit() {
    const result = await Api.put(`/manifestation/${manifestation.id}`, {
      title,
      description,
    });

    if (!result.id) {
      return;
    }

    showMessage({
      message: 'Manifestação atualizada.',
      icon: { icon: 'success', position: 'left' },
      type: 'success',
    });
    navigation.navigate('ManifestacaoDetalhes', { wasEdited: true });
  }

  return (
    <Container>
      <SectionTitle>Editar manifestação</SectionTitle>
      <LabeledInput
        label="Título"
        inputProps={{
          value: title,
          onChangeText: setTitle,
        }}
      />
      <LabeledInput
        label="Descrição"
        inputProps={{
          value: description,
          onChangeText: setDescription,
        }}
      />

      <SaveEditButton onPress={handleSubmit}>
        <SaveEditText>Salvar edição</SaveEditText>
      </SaveEditButton>
    </Container>
  );
};

export default EditManifestation;
