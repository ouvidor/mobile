import React from 'react';
import { PermissionsAndroid } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import { showMessage } from 'react-native-flash-message';

import Api from '../../services/Api';
import colors from '../../utils/colors';
import { Button } from '..';
import { Container, ScrollView, ContainerContent } from './styles';

const FilesModal = ({ files }) => {
  const { globalColors } = colors;

  async function openFile(file) {
    const { baseURL, headers } = Api.getConfigs();

    const permissionGranted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'Permitir salvar arquivo em armazenamento externo',
        message:
          'O aplicativo Ouvidor gostaria de salvar o arquivo no armazenamento externo.',
        buttonPositive: 'Dar permissão',
      }
    );

    if (!permissionGranted) return;

    const { dirs } = RNFetchBlob.fs;

    RNFetchBlob.config({
      addAndroidDownloads: {
        useDownloadManager: true, // <-- this is the only thing required
        // Show notification when response data transmitted
        notification: true,
        // // Optional, but recommended since android DownloadManager will fail when
        // // the url does not contains a file extension, by default the mime type will be text/plain
        // mime: 'image/jpg',
        description: 'Arquivo baixado no app Ouvidor.',
        title: file.name,
        // Make the file scannable  by media scanner
        mediaScannable: true,
        path: `${dirs.DCIMDir}/ouvidor/`,
      },
    })
      .fetch('GET', `${baseURL}/files/${file.id}`, headers)
      .then(response => {
        if (response) {
          showMessage({
            message: 'Arquivo baixado',
            type: 'success',
            icon: { icon: 'success', position: 'left' },
            duration: 2000,
          });
        }
      })
      .catch(error => {
        console.log('error: ', error);
        showMessage({
          message: 'Falha ao baixar o arquivo',
          type: 'danger',
          icon: { icon: 'danger', position: 'left' },
          duration: 2000,
        });
      });
  }

  return (
    <Container>
      <ScrollView>
        <ContainerContent>
          {files.map(file => (
            <Button
              key={file.name}
              touchableProps={{
                onPress: () => openFile(file),
                background: globalColors.primaryColor,
              }}
              textProps={{
                title: `Baixar arquvio ${file.extension}`,
              }}
            />
          ))}
        </ContainerContent>
      </ScrollView>
    </Container>
  );
};

export default FilesModal;
