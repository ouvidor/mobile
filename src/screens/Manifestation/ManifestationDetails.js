/* eslint-disable array-callback-return */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import {
  ScrollableContainerWithLoading,
  Text,
  ManifestationTitle,
  StatusHistory,
} from '../../components';
import Api from '../../services/Api';

export default function ManifestationDetails({ route }) {
  const [id, setId] = useState(null);
  const [manifestation, setManifestation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    function getId() {
      const mId = route.params.id;
      setId(mId);
    }
    getId();
  }, []);
  useEffect(() => {
    async function fetchManifestationDetails() {
      const details = await Api.get(`manifestation/${id}`);

      if ('message' in details) {
        setError(details.message);
      } else {
        setManifestation(details);
      }
      setLoading(false);
    }
    if (id) {
      fetchManifestationDetails();
    }
  }, [id]);

  function renderContent() {
    const toRender = [];

    manifestation.status_history.map((status, i) => {
      toRender.push(<StatusHistory data={status} key={i} />);
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
