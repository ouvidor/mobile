/* eslint-disable camelcase */
import React, { useState, useEffect, useContext } from 'react';
import { FlatList } from 'react-native';

import Api from '../../services/Api';
import { SessionContext } from '../../store/session';
import {
  Text,
  ManifestationTitle,
  Avaliation,
  ContainerWithLoading,
} from '../../components';
import ManifestationStatus from '../../components/ManifestationStatus';

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
          <ManifestationTitle>{manifestation.title}</ManifestationTitle>
          {lastStatus === 5 && isOwner && (
            <Avaliation
              avaliation={manifestation.avaliation}
              idManifestacao={manifestation.id}
            />
          )}
          <FlatList
            data={manifestationStatus}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => <ManifestationStatus status={item} />}
          />
        </>
      )}
    </ContainerWithLoading>
  );
}
