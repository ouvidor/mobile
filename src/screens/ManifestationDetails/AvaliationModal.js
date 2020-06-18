import React from 'react';

import Avaliation from '../../components/Avaliation';
import {
  ModalContainer,
  ModalScrollView,
  ModalContainerContent,
} from './styles';

const FilesModal = ({ avaliation, manifestationId }) => {
  return (
    <ModalContainer>
      <ModalScrollView>
        <ModalContainerContent>
          <Avaliation
            avaliation={avaliation}
            manifestationId={manifestationId}
          />
        </ModalContainerContent>
      </ModalScrollView>
    </ModalContainer>
  );
};

export default FilesModal;
