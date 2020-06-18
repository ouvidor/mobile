/* eslint-disable camelcase */
import React, { useState, useEffect, useContext } from 'react';
import { Text } from 'react-native';
import Modal from 'react-native-modal';

import Api from '../../services/Api';
import { SessionContext } from '../../store/session';
import { Avaliation, ContainerWithLoading, Button } from '../../components';
import ManifestationStatus from '../../components/ManifestationStatus';
import TagList from '../../components/TagList';
import formatDate from '../../helpers/formatDate';
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
  ModalContainer,
  ModalScrollView,
  ModalContainerContent,
} from './styles';
import colors from '../../utils/colors';

const { globalColors } = colors;

export default function ManifestationDetails({ route }) {
  const [id, setId] = useState(null);
  const [manifestation, setManifestation] = useState(null);
  const [manifestationStatus, setManifestationStatus] = useState([]);
  const [formattedDate, setFormattedDate] = useState('');
  const [formattedHour, setFormattedHour] = useState('');
  const [lastStatus, setLastStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const { session } = useContext(SessionContext);

  async function fetchManifestationDetails() {
    const manifestationData = await Api.get(`manifestation/${id}`);

    if ('message' in manifestationData) {
      setError(manifestationData.message);
    } else {
      setManifestation(manifestationData);

      const resolvedSession = await session;
      setIsOwner(resolvedSession.profile.id === manifestationData.user.id);

      const resolvedManifestationStatus = manifestationData.status_history;
      setManifestationStatus(resolvedManifestationStatus);

      const resolvedLastStatus =
        resolvedManifestationStatus[resolvedManifestationStatus.length - 1]
          .status.id;
      setLastStatus(resolvedLastStatus);

      const { hour, date } = formatDate(manifestationData.created_at);

      setFormattedHour(hour);
      setFormattedDate(date);
    }
    setLoading(false);
  }

  function openFile() {
    console.log('abrir');
  }

  useEffect(() => {
    function getId() {
      const mId = route.params.id;
      setId(mId);
    }
    getId();
  }, []);

  useEffect(() => {
    if (id) {
      fetchManifestationDetails();
    }
  }, [id]);

  return (
    <>
      <ContainerWithLoading loading={loading}>
        {error && <Text>{error}</Text>}
        {manifestation && (
          <>
            <Container>
              <SectionTitle>Manifestação</SectionTitle>
              <Title>{manifestation.title}</Title>
              <TagList
                tags={[
                  ...manifestation.categories.map(category => category.title),
                  manifestation.type.title,
                ]}
              />
              <Description>{manifestation.description}</Description>
              <ManifestationFooter>
                <DateText>
                  Criado em {formattedDate} às {formattedHour}
                </DateText>
                <AttachmentButton onPress={() => setModalVisible(true)}>
                  <AttachmentText>Abrir anexos</AttachmentText>
                </AttachmentButton>
              </ManifestationFooter>
            </Container>
            {lastStatus === 5 && isOwner && (
              <Avaliation
                avaliation={manifestation.avaliation}
                idManifestacao={manifestation.id}
              />
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
      <Modal
        isVisible={modalVisible}
        onBackButtonPress={() => setModalVisible(false)}
        onSwipeComplete={() => setModalVisible(false)}
        swipeDirection="down"
        animationInTiming={600}
        animationOutTiming={600}
        backdropTransitionOutTiming={0}>
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
              <Button
                touchableProps={{
                  onPress: openFile,
                  background: globalColors.primaryColor,
                }}
                textProps={{
                  title: 'Abrir arquvio .jpg',
                }}
              />
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
      </Modal>
    </>
  );
}
