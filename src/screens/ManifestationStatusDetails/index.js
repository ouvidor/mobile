import React, { useState } from 'react';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import { format, parseISO } from 'date-fns';
import Modal from 'react-native-modal';

import FilesModal from '../../components/FilesModal';
import {
  Container,
  SectionTitle,
  SubSectionTitle,
  Description,
  AttachmentButton,
  AttachmentButtonText,
  Date,
} from './styles';

const ManifestationStatusDetails = ({ route }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { manifestationStatus, isOwner } = route.params;

  const formattedDate = format(
    parseISO(manifestationStatus.created_at),
    "dd 'de' MMMM 'às' HH':'mm"
  );

  return (
    <Container>
      <SectionTitle>Status de manifestação</SectionTitle>
      <SubSectionTitle>Descrição do status</SubSectionTitle>
      <Description>{manifestationStatus.description}</Description>

      <Date>{formattedDate}</Date>

      {isOwner && manifestationStatus.files.length > 0 && (
        <>
          <SectionTitle>Arquivos anexados</SectionTitle>
          <AttachmentButton onPress={() => setIsModalOpen(true)}>
            <EntypoIcon name="attachment" size={24} color="#fff" />
            <AttachmentButtonText>Anexos</AttachmentButtonText>
          </AttachmentButton>
        </>
      )}

      {isOwner && manifestationStatus.files.length > 0 && (
        <Modal
          isVisible={isModalOpen}
          onBackButtonPress={() => setIsModalOpen(false)}
          onSwipeComplete={() => setIsModalOpen(false)}
          swipeDirection="down"
          animationInTiming={600}
          animationOutTiming={600}
          backdropTransitionOutTiming={0}>
          <FilesModal files={manifestationStatus.files} />
        </Modal>
      )}
    </Container>
  );
};

export default ManifestationStatusDetails;
