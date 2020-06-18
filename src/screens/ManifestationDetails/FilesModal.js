import React from 'react';
import RNFetchBlob from 'rn-fetch-blob';
import { showMessage } from 'react-native-flash-message';

import Api from '../../services/Api';
import colors from '../../utils/colors';
import { Button } from '../../components';
import {
  ModalContainer,
  ModalScrollView,
  ModalContainerContent,
} from './styles';

const FilesModal = ({ files }) => {
  const { globalColors } = colors;

  async function openFile(file) {
    console.log(`requisitando --> /files/${file.id}`);

    const { baseURL, headers } = Api.getConfigs();

    console.log();

    RNFetchBlob.config({
      addAndroidDownloads: {
        useDownloadManager: true, // <-- this is the only thing required
        // Show notification when response data transmitted
        notification: true,
        // Optional, but recommended since android DownloadManager will fail when
        // the url does not contains a file extension, by default the mime type will be text/plain
        mime: 'image/jpg',
        description: 'Arquivo baixado no app Ouvidor.',
        title: `ouvidor_arquivo${file.extension}`,
        // Make the file scannable  by media scanner
        mediaScannable: true,
      },
    })
      .fetch('GET', `${baseURL}/files/${file.id}`, headers)
      .then(res =>
        RNFetchBlob.fs.scanFile([{ path: res.path(), mime: 'image/png' }])
      )
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
    <ModalContainer>
      <ModalScrollView>
        <ModalContainerContent>
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
        </ModalContainerContent>
      </ModalScrollView>
    </ModalContainer>
  );
};

export default FilesModal;
