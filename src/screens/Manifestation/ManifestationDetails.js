/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { ScrollableContainerWithLoading, Text } from '../../components';
import Status from '../../utils/status';
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

    toRender.push(
      <Text style={{ marginBottom: 25 }}>{manifestation.title}</Text>
    );

    manifestation.status_history.map(status => {
      if (status.status.id == 2) {
        toRender.push(
          <Text style={{ marginBottom: 25 }}>{status.description}</Text>
        );
      } else {
        toRender.push(
          <>
            <Text>{status.status.title}</Text>
            <Text style={{ marginBottom: 25 }}>{status.description}</Text>
          </>
        );
      }
    });

    return toRender;
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
