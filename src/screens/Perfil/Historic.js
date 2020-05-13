/* eslint-disable react/prop-types */
import React, { useState, useEffect, useContext } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Text, ManifestationDetailsModal } from '../../components';
import { HistoricList } from '../../components/Historic';
import { ContainerWithLoading } from '../../components/Container';
import Api from '../../services/Api';
import { SessionContext } from '../../store/session';
import colors from '../../utils/colors';

export default function Historic({ navigation }) {
  const { session } = useContext(SessionContext);
  const [userId, setUserId] = useState(null);
  const [manifestations, setManifestations] = useState(null);
  /** Controle do Modal */
  const [modalVisible, setModalVisible] = useState(false);
  /** Controle de qual manifestação foi clicada por ultimo. */
  const [currentManifestation, setCurrentManifestation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingPage, setLoadingPage] = useState(false);
  const [page, setPage] = useState(1);

  const { BlackSirius } = colors;

  useEffect(() => {
    // Pegar id do usuário
    function getUserId() {
      if ('profile' in session) {
        const { id } = session.profile;
        setUserId(id);
      } else {
        session.then(s => {
          const { id } = s.profile;
          setUserId(id);
        });
      }
    }
    getUserId();
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

  // renderizo botões de filtragem
  function renderButtons() {
    return <View />;
  }

  // carrego manifestações de acordo com paginação
  async function loadManifestations(pageToLoad = 1) {
    try {
      const manifestationsPage = await Api.get(
        `/manifestation?ownerId=${userId}&page=${pageToLoad}`
      );

      // const isNotTheFirstPage = pageToLoad - 1 !== 1;

      if (pageToLoad > manifestationsPage.last_page) {
        return;
      }

      if (manifestationsPage && manifestationsPage.count > 0) {
        // Ordenando manifestações
        const orderedManifestationList = manifestationsPage.rows.sort(function(
          a,
          b
        ) {
          const first = Date.parse(a.updated_at);
          const second = Date.parse(b.updated_at);

          return first - second;
        });

        setPage(
          orderedManifestationList.length >= 1 ? pageToLoad : pageToLoad - 1
        );
        setManifestations(
          pageToLoad >= 2
            ? [...manifestations, ...orderedManifestationList]
            : orderedManifestationList
        );
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
    }
  }

  // ao pegar id de usuário, carrego suas manifestações e removo o loading
  useEffect(() => {
    if (userId != null) {
      loadManifestations();
    }
  }, [userId]);

  async function handleNextPage() {
    setLoadingPage(true);
    await loadManifestations(page + 1);
    setLoadingPage(false);
  }

  function renderManifestations() {
    const toRender = [];

    if (manifestations) {
      return (
        <HistoricList
          manifestations={manifestations}
          handleManifestationPress={handleManifestationPress}
          handleNextPage={handleNextPage}
        />
      );
    }
    toRender.push(<Text>Não há manifestações relatados por você</Text>);

    return toRender;
  }

  return (
    <ContainerWithLoading loading={loading}>
      <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Meu Histórico</Text>
      {renderManifestations()}
      {loadingPage ? (
        <ActivityIndicator size="small" color={BlackSirius} />
      ) : (
        <></>
      )}
      <ManifestationDetailsModal
        isVisible={modalVisible}
        close={() => {
          setModalVisible(false);
        }}
        manifestation={currentManifestation}
      />
    </ContainerWithLoading>
  );
}
