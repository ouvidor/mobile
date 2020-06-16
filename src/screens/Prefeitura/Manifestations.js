/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import ManifestationList from '../../components/ManifestationList';
import { Container, Text, ManifestationDetailsModal } from '../../components';
import Api from '../../services/Api';
import colors from '../../utils/colors';

export default function Manifestations() {
  const [manifestations, setManifestations] = useState(null);
  /** Controle do Modal */
  const [modalVisible, setModalVisible] = useState(false);
  /** Controle de qual manifestação foi clicada por ultimo. */
  const [currentManifestation, setCurrentManifestation] = useState(null);
  const [loading, setLoading] = useState(true);

  const { Gray } = colors;

  useEffect(() => {
    // carrego manifestações de acordo com paginação
    async function loadManifestations() {
      try {
        const manifestationsPage = await Api.get(`/manifestation?isRead=0`);

        if (manifestationsPage && manifestationsPage.count > 0) {
          // Ordenando manifestações por updated_at decrescente
          const orderedManifestationList = manifestationsPage.rows.sort(
            (a, b) => {
              const first = Date.parse(a.updated_at);
              const second = Date.parse(b.updated_at);

              return second - first;
            }
          );

          setManifestations(orderedManifestationList);
        }
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    }

    loadManifestations();
  }, []);

  // Abrir modal
  useEffect(() => {
    if (currentManifestation) {
      setModalVisible(true);
    }
  }, [currentManifestation]);

  // Remover informação de currentManifestation quando fechar modal
  useEffect(() => {
    if (!modalVisible) {
      setTimeout(() => {
        setCurrentManifestation('');
      }, 600);
    }
  }, [modalVisible]);

  function handleManifestationPress(m) {
    setCurrentManifestation(m);
  }

  function renderManifestations() {
    const toRender = [];

    if (manifestations) {
      return (
        <ManifestationList
          manifestations={manifestations}
          handleManifestationPress={handleManifestationPress}
        />
      );
    }
    toRender.push(
      <Text style={{ marginTop: 10, alignSelf: 'center' }}>
        Não há manifestações relatadas
      </Text>
    );

    return toRender;
  }

  return (
    <Container>
      {loading ? (
        <ActivityIndicator
          style={{ marginTop: 30 }}
          size="large"
          color={Gray}
        />
      ) : (
        [
          <Text style={{ fontWeight: 'bold', fontSize: 20, marginTop: 20 }}>
            Manifestações recentes
          </Text>,
          renderManifestations(),
        ]
      )}
      <ManifestationDetailsModal
        isVisible={modalVisible}
        close={() => {
          setModalVisible(false);
        }}
        manifestation={currentManifestation}
      />
    </Container>
  );
}
