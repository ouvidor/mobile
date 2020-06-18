/* eslint-disable react/prop-types */
import React, { useState, useEffect, useContext } from 'react';
import { Text, ActivityIndicator } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

import ManifestationList from '../../components/ManifestationList';
import { ContainerWithLoading } from '../../components/Container';
import { ContainerFilter, ButtonFilter, TextFilter, Empty } from './styles';
import Api from '../../services/Api';
import { SessionContext } from '../../store/session';
import colors from '../../utils/colors';

export default function Historic({ navigation }) {
  const { session } = useContext(SessionContext);
  const [userId, setUserId] = useState(null);
  const [manifestations, setManifestations] = useState([]);
  // loading da screen
  const [loading, setLoading] = useState(true);
  // loading da lista
  const [loadingList, setLoadingList] = useState(false);
  // loading quando chega ao final da lista
  const [loadingPage, setLoadingPage] = useState(false);
  const [page, setPage] = useState(1);
  const [filterSelected, setFilterSelected] = useState(1);

  // carrego manifestações de acordo com paginação
  async function loadManifestations(pageToLoad = 1, status = null) {
    try {
      const statusFilter = status ? `&status=${status}` : null;

      const manifestationsPage = await Api.get(
        `/manifestation/filter/?ownerId=${userId}${statusFilter}&page=${pageToLoad}`
      );

      if (pageToLoad > manifestationsPage.last_page) {
        return;
      }

      if (manifestationsPage && manifestationsPage.count > 0) {
        setPage(
          manifestationsPage.rows.length >= 1 ? pageToLoad : pageToLoad - 1
        );
      }
      setManifestations(
        pageToLoad >= 2
          ? [...manifestations, ...manifestationsPage.rows]
          : manifestationsPage.rows
      );
      setLoading(false);
      setLoadingList(false);
    } catch (err) {
      setLoading(false);
    }
  }

  function handleFilter(filter = 1, pageToLoad = 1, status = null) {
    setLoadingList(true);
    setFilterSelected(filter);
    setPage(1);
    loadManifestations(pageToLoad, status);
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
    const filter = filterSelected === 2 ? 'encerrada' : null;
    await loadManifestations(page + 1, filter);
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
      <ContainerFilter>
        <ButtonFilter
          id={1}
          selected={filterSelected}
          onPress={() => handleFilter()}>
          <TextFilter>Todas</TextFilter>
        </ButtonFilter>
        <ButtonFilter
          id={2}
          selected={filterSelected}
          onPress={() => handleFilter(2, 1, 'encerrada')}>
          <TextFilter>Resolvida</TextFilter>
        </ButtonFilter>
      </ContainerFilter>

      {manifestations && manifestations.length < 1 && !loadingList && (
        <Empty>Não encontrado</Empty>
      )}

      {manifestations && !loadingList ? (
        <ManifestationList
          manifestations={manifestations}
          handleNextPage={handleNextPage}
          navigation={navigation}
        />
      ) : (
        <ActivityIndicator size="large" color={colors.Gray} />
      )}

      {loadingPage && <ActivityIndicator size="small" color={colors.Gray} />}
    </ContainerWithLoading>
  );
}
