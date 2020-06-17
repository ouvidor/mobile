/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { PermissionsAndroid } from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import DocumentPicker from 'react-native-document-picker';
import { showMessage } from 'react-native-flash-message';

import { Container, Text } from '../index';
import { UploadButton } from './styles';

export default function FilesInput() {
  const [files, setFiles] = useState([]);

  async function selectFiles() {
    const permissionsGranted = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.CAMERA,
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    ]);

    if (!permissionsGranted) return;

    try {
      const retrievedFiles = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.allFiles],
      });
      setFiles(retrievedFiles);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        showMessage({
          message: 'Seleção de arquivo cancelada',
          type: 'info',
          icon: { icon: 'auto', position: 'left' },
          duration: 2000,
        });
      } else {
        showMessage({
          message: 'Erro inesperado em seleção de arquivo',
          type: 'danger',
          icon: { icon: 'warning', position: 'left' },
          duration: 3000,
        });
        throw err;
      }
    }
  }

  return (
    <Container>
      <UploadButton onPress={selectFiles}>
        <Text style={{ fontSize: 16, marginRight: 5 }} fontFamily="SemiBold">
          Anexar arquivo
        </Text>
        <FontAwesomeIcon name="file" size={18} />
      </UploadButton>
      {/* FILES LIST GOES HERE */}
      {console.log(files)}
    </Container>
  );
}
