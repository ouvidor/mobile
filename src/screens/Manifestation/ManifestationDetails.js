/* eslint-disable camelcase */
/* eslint-disable array-callback-return */
/* eslint-disable react/prop-types */
import React, { useState, useEffect, useContext } from 'react';

import {
  ScrollableContainerWithLoading,
  Text,
  ManifestationTitle,
  Avaliation,
  StatusHistory,
} from '../../components';
import { SessionContext } from '../../store/session';
import Api from '../../services/Api';

export default function ManifestationDetails({ route }) {
  const [id, setId] = useState(null);
  const [manifestation, setManifestation] = useState(null);
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

  function renderContent() {
    const toRender = [];
    const { status_history } = manifestation;
    const lastStatus = status_history[status_history.length - 1].status.id;

    if (lastStatus === 5 && isOwner) {
      toRender.push(
        <Avaliation
          avaliation={manifestation.avaliation}
          idManifestacao={manifestation.id}
        />
      );
    }

    // if (lastStatus === 3) {
    //   toRender.push(
    //     <Reply data={manifestation} onSucess={fetchManifestationDetails} />
    //   );
    // }

    manifestation.status_history.map((status, i) => {
      toRender.push(<StatusHistory key={i} data={status} />);
    });

    return (
      <>
        <ManifestationTitle>{manifestation.title}</ManifestationTitle>
        {toRender}
      </>
    );
  }

  return (
    <ScrollableContainerWithLoading loading={loading}>
      {error && <Text>{error}</Text>}
      {manifestation && renderContent()}
    </ScrollableContainerWithLoading>
  );
}
