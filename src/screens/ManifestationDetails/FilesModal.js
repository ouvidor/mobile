import React from 'react';

import { Button } from '../../components';
import {
  ModalContainer,
  ModalScrollView,
  ModalContainerContent,
} from './styles';

import colors from '../../utils/colors';

const FilesModal = ({ files }) => {
  const { globalColors } = colors;

  function openFile() {
    console.log('abrir arquivos -->', files);
  }

  return (
    <ModalContainer>
      <ModalScrollView>
        <ModalContainerContent>
          <Button
            touchableProps={{
              onPress: openFile,
              background: globalColors.primaryColor,
            }}
            textProps={{
              title: 'Abrir arquvio .jpg',
            }}
          />
        </ModalContainerContent>
      </ModalScrollView>
    </ModalContainer>
  );
};

export default FilesModal;
