/* eslint-disable react/prop-types */
import React, { useState, useEffect, useContext } from 'react';
import Feather from 'react-native-vector-icons/Feather';

import { ActivityIndicator } from 'react-native';
import { Text } from '../../components';
import ManifestationList from '../../components/ManifestationList';
import { ContainerWithLoading } from '../../components/Container';
import Api from '../../services/Api';
import { SessionContext } from '../../store/session';
import colors from '../../utils/colors';

export default function Historic({ navigation }) {
  const { session } = useContext(SessionContext);
  const [userId, setUserId] = useState(null);
  const [manifestations, setManifestations] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingPage, setLoadingPage] = useState(false);
  const [page, setPage] = useState(1);

  // carrego manifestações de acordo com paginação
  async function loadManifestations(pageToLoad = 1) {
    try {
      const manifestationsPage = await Api.get(
        `/manifestation/filter/?ownerId=${userId}&page=${pageToLoad}`
      );

      if (pageToLoad > manifestationsPage.last_page) {
        return;
      }

      if (manifestationsPage && manifestationsPage.count > 0) {
        setPage(
          manifestationsPage.rows.length >= 1 ? pageToLoad : pageToLoad - 1
        );
        setManifestations(
          pageToLoad >= 2
            ? [...manifestations, ...manifestationsPage.rows]
            : manifestationsPage.rows
        );
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
    }
  }

  useEffect(() => {
    // Pegar id do usuário
    async function getUserId() {
      const resolvedSession = await session;
      setUserId(resolvedSession.profile.id);
    }
    getUserId();
  }, []);

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

  return (
    <ContainerWithLoading loading={loading}>
      <Text style={{ marginVertical: 10, fontWeight: 'bold', fontSize: 24 }}>
        <Feather
          name="arrow-left"
          size={22}
          color={colors.Gray}
          onPress={() => navigation.pop()}
        />{' '}
        Meu Histórico
      </Text>

      {manifestations && (
        <ManifestationList
          manifestations={manifestations}
          handleNextPage={handleNextPage}
          navigation={navigation}
        />
      )}
      {loadingPage && <ActivityIndicator size="small" color={colors.Gray} />}
    </ContainerWithLoading>
  );
}
