/* eslint-disable camelcase */
/* eslint-disable array-callback-return */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import {
  ScrollableContainerWithLoading,
  Text,
  ManifestationTitle,
  Avaliation,
  StatusHistory,
} from '../../components';
import Api from '../../services/Api';

export default function ManifestationDetails({ route }) {
  const [id, setId] = useState(null);
  const [manifestation, setManifestation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchManifestationDetails() {
    const details = await Api.get(`manifestation/${id}`);

    if ('message' in details) {
      setError(details.message);
    } else {
      setManifestation(details);
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

    if (lastStatus === 5) {
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
  function renderError() {
    return <Text>{error}</Text>;
  }

  return (
    <ScrollableContainerWithLoading loading={loading}>
      {error && renderError()}
      {manifestation && renderContent()}
    </ScrollableContainerWithLoading>
  );
}
