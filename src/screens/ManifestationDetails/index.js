import React, { useState, useEffect, useContext } from 'react';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import { Text } from 'react-native';
import Modal from 'react-native-modal';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Api from '../../services/Api';
import { SessionContext } from '../../store/session';
import { ContainerWithLoading } from '../../components';
import AvaliationModal from './AvaliationModal';
import FilesModal from './FilesModal';
import ManifestationStatus from '../../components/ManifestationStatus';
import TagList from '../../components/TagList';
import {
  Container,
  Title,
  Description,
  StyledFlatList,
  ManifestationFooter,
  DateText,
  SectionTitle,
  AttachmentButton,
  AttachmentText,
  AvaliationButton,
  AvaliationText,
  HeaderContainer,
  EditButton,
} from './styles';

export default function ManifestationDetails({ route }) {
  const [manifestation, setManifestation] = useState(null);
  const [manifestationStatus, setManifestationStatus] = useState([]);
  const [formattedDate, setFormattedDate] = useState('');
  const [lastStatus, setLastStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [isInEditPeriod, setIsInEditPeriod] = useState(false);
  const [isFileModalOpen, setIsFileModalOpen] = useState(false);
  const [isAvaliationModalOpen, setIsAvaliationModalOpen] = useState(false);

  const { id } = route.params;

  const { session } = useContext(SessionContext);

  async function fetchManifestationDetails() {
    const manifestationData = await Api.get(`manifestation/${id}`);

    if ('message' in manifestationData || 'messages' in manifestationData) {
      setError(manifestationData.message);
    } else {
      setManifestation(manifestationData);
      setIsInEditPeriod(manifestationData.created_at);

      const resolvedSession = await session;
      setIsOwner(resolvedSession.profile.id === manifestationData.user.id);

      const resolvedManifestationStatus = manifestationData.status_history;
      setManifestationStatus(resolvedManifestationStatus);

      const resolvedLastStatus =
        resolvedManifestationStatus[resolvedManifestationStatus.length - 1]
          .status.id;
      setLastStatus(resolvedLastStatus);

      const date = format(
        parseISO(manifestationData.created_at),
        "dd 'de' MMMM 'às' HH':'mm",
        {
          locale: pt,
        }
      );

      setFormattedDate(date);
    }
    setLoading(false);
  }

  useEffect(() => {
    if (id) {
      fetchManifestationDetails();
    }
  }, [id]);

  function handleEditClick() {
    console.log('CLICOU EM EDITAR');
  }

  return (
    <>
      <ContainerWithLoading loading={loading}>
        {error && <Text>{error}</Text>}
        {manifestation && (
          <>
            <Container>
              <HeaderContainer>
                <SectionTitle>Manifestação</SectionTitle>
                {isOwner && isInEditPeriod && (
                  <EditButton onPress={handleEditClick}>
                    <EntypoIcon name="edit" size={30} />
                  </EditButton>
                )}
              </HeaderContainer>
              <Title>{manifestation.title}</Title>
              <TagList
                tags={[
                  ...manifestation.categories.map(category => category.title),
                  manifestation.type.title,
                ]}
              />
              <Description>{manifestation.description}</Description>
              <ManifestationFooter>
                <DateText>Criado em {formattedDate}</DateText>
                {isOwner && manifestation.files.length > 0 && (
                  <AttachmentButton onPress={() => setIsFileModalOpen(true)}>
                    <AttachmentText>
                      <EntypoIcon name="attachment" size={20} />
                      Abrir anexos
                    </AttachmentText>
                  </AttachmentButton>
                )}
              </ManifestationFooter>
            </Container>
            {lastStatus === 5 && isOwner && (
              <AvaliationButton onPress={() => setIsAvaliationModalOpen(true)}>
                <AvaliationText>Avaliar</AvaliationText>
              </AvaliationButton>
            )}
            <SectionTitle>Histórico de status</SectionTitle>
            <StyledFlatList
              data={manifestationStatus}
              keyExtractor={item => String(item.id)}
              renderItem={({ item }) => <ManifestationStatus status={item} />}
            />
          </>
        )}
      </ContainerWithLoading>
      {manifestation && (
        <Modal
          isVisible={isAvaliationModalOpen}
          onBackButtonPress={() => setIsAvaliationModalOpen(false)}
          onSwipeComplete={() => setIsAvaliationModalOpen(false)}
          swipeDirection="down"
          animationInTiming={600}
          animationOutTiming={600}
          backdropTransitionOutTiming={0}>
          <AvaliationModal
            manifestationId={manifestation.id}
            avaliation={manifestation.avaliation}
          />
        </Modal>
      )}

      {manifestation && manifestation.files && isOwner && (
        <Modal
          isVisible={isFileModalOpen}
          onBackButtonPress={() => setIsFileModalOpen(false)}
          onSwipeComplete={() => setIsFileModalOpen(false)}
          swipeDirection="down"
          animationInTiming={600}
          animationOutTiming={600}
          backdropTransitionOutTiming={0}>
          <FilesModal files={manifestation.files} />
        </Modal>
      )}
    </>
  );
}
