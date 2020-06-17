/* eslint-disable camelcase */
import React, { useState, useEffect, useContext } from 'react';
import { Text } from 'react-native';

import Api from '../../services/Api';
import { SessionContext } from '../../store/session';
import { Avaliation, ContainerWithLoading } from '../../components';
import ManifestationStatus from '../../components/ManifestationStatus';
import TagList from '../../components/TagList';
import { Container, Title, Description, StyledFlatList } from './styles';

export default function ManifestationDetails({ route }) {
  const [id, setId] = useState(null);
  const [manifestation, setManifestation] = useState(null);
  const [manifestationStatus, setManifestationStatus] = useState([]);
  const [lastStatus, setLastStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOwner, setIsOwner] = useState(false);

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
    }
    setLoading(false);
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
    <ContainerWithLoading loading={loading}>
      {error && <Text>{error}</Text>}
      {manifestation && (
        <>
          <Container>
            <Title>{manifestation.title}</Title>
            <TagList
              tags={[
                ...manifestation.categories.map(category => category.title),
                manifestation.type.title,
              ]}
            />
            <Description>{manifestation.description}</Description>
          </Container>
          {lastStatus === 5 && isOwner && (
            <Avaliation
              avaliation={manifestation.avaliation}
              idManifestacao={manifestation.id}
            />
          )}
          <StyledFlatList
            data={manifestationStatus}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => <ManifestationStatus status={item} />}
          />
        </>
      )}
    </ContainerWithLoading>
  );
}
