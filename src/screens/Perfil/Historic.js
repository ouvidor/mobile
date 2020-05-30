/* eslint-disable react/prop-types */
import React, { useState, useEffect, useContext } from 'react';
import { View, ActivityIndicator } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { Text, ManifestationDetailsModal, Button } from '../../components';
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

  /**
   * @author Matheus Tchãssêf
   * @since oldtimes
   * @description
   * Busca as manifestações do usuário logado
   */
  async function loadManifestations() {
    const userManifestations = await Api.get(
      `manifestation/?ownerId=${userId}`
    );
    setManifestations(userManifestations);
    setLoading(false);
  }

  // ao pegar id de usuário, carrego suas manifestações e removo o loading
  useEffect(() => {
    if (userId != null) {
      loadManifestations();
    }
  }, [userId]);

  function renderManifestations() {
    const toRender = [];

    if (manifestations) {
      return (
        <HistoricList
          manifestations={manifestations.rows}
          navigation={navigation}
        />
      );
    }
    return toRender;
  }

  return (
    <ContainerWithLoading loading={loading}>
      <Text style={{ marginVertical: 10, fontWeight: 'bold', fontSize: 24 }}>
        <Feather
          name="arrow-left"
          size={22}
          color={colors.BlackSirius}
          onPress={() => navigation.pop()}
        />{' '}
        Meu Histórico
      </Text>

      {renderManifestations()}
    </ContainerWithLoading>
  );
}
