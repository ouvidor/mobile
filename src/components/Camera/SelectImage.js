/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import ImagePicker from 'react-native-image-picker';
import styled from 'styled-components/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { Container, Text } from '../index';

const ImagesContainer = styled.View.attrs(() => ({}))`
  flex: 1;
  flex-direction: row;
  justify-content: space-around;
`;
const SelectedImage = styled.Image.attrs(props => ({
  source: {
    uri: props.source,
  },
}))`
  width: 175px;
  height: 175px;
  border-radius: 10px;
`;
const UploadButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background: #bfbfbf;
  max-width: 160px;
  padding-vertical: 5px;
  padding-horizontal: 10px;
  border-radius: 5px;
  margin-vertical: 8px;
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

export default function SelectImage({ onSelect }) {
  const [selectedImages, setImage] = useState([]);

  useEffect(() => onSelect(selectedImages), [selectedImages]);

  function getImage() {
    ImagePicker.showImagePicker(PICKER_OPTIONS, response => {
      if (response.data) {
        setImage([...selectedImages, response]);
      }
    });
  }

  function renderImages() {
    if (selectedImages.length > 0) {
      const render = [];

      selectedImages.map(image => {
        const uri = `data:${image.type};base64,${image.data}`;
        render.push(<SelectedImage key={image.fileName} source={uri} />);
      });

      return <ImagesContainer>{render}</ImagesContainer>;
    }

    return null;
  }

  return (
    <Container>
      <UploadButton onPress={getImage}>
        <Text style={{ fontSize: 16, marginRight: 5 }} fontFamily="SemiBold">
          Anexar imagem
        </Text>
        <FontAwesome name="camera" size={16} />
      </UploadButton>

      {renderImages()}
    </Container>
  );
}
