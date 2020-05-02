import React, { useState } from 'react';
import ImagePicker from 'react-native-image-picker';
import styled from 'styled-components/native';

import { Container, Text } from '../index';

const SelectedImage = styled.Image.attrs(props => ({
  source: {
    uri:
      props.source ||
      'https://abrilveja.files.wordpress.com/2016/06/imperdivel-2010-shrek-original.jpeg',
  },
}))`
  width: 200px;
  height: 200px;
`;

const PICKER_OPTIONS = {
  title: 'Selecione uma imagem',
  takePhotoButtonTitle: 'Tirar uma foto',
  chooseFromLibraryButtonTitle: 'Selecionar da galeria',
  cancelButtonTitle: 'Cancelar',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

export default function SelectImage() {
  const [selectedImage, setSelectedImage] = useState(null);

  function getImage() {
    ImagePicker.showImagePicker(PICKER_OPTIONS, response => {
      if (response.data) {
        setSelectedImage(`data:image/jpg;base64,${response.data}`);
      }
    });
  }

  return (
    <Container>
      <Text onPress={getImage}>Camera roll</Text>
      <SelectedImage source={selectedImage} />
    </Container>
  );
}
