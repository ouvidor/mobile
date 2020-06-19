/* eslint-disable react/prop-types */
import React, { useState, useEffect, useContext } from 'react';
import { Text, ActivityIndicator } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

import ManifestationList from '../../components/ManifestationList';
import { ContainerWithLoading } from '../../components/Container';
import Api from '../../services/Api';
import { SessionContext } from '../../store/session';
import colors from '../../utils/colors';

export default function Notification({ navigation }) {
  const { session } = useContext(SessionContext);
  const [userId, setUserId] = useState(null);
  const [manifestations, setManifestations] = useState([]);
  // loading da screen
  const [loading, setLoading] = useState(true);

  // carrego manifestações de acordo com paginação
  async function loadManifestations() {
    try {
      const response = await Api.get(
        `/manifestation/filter/?ownerId=${userId}&status=encerrada&quantity=99`
      );

      const manifestationsWithoutAvaliation = [];
      for (const manifestation of response.rows) {
        if (!manifestation.avaliation_rate) {
          manifestationsWithoutAvaliation.push(manifestation);
        }
      }
      setManifestations(manifestationsWithoutAvaliation);
      setLoading(false);
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

  return (
    <ContainerWithLoading loading={loading}>
      <Text style={{ marginVertical: 10, fontWeight: 'bold', fontSize: 24 }}>
        <Feather
          name="arrow-left"
          size={22}
          color={colors.Gray}
          onPress={() => navigation.pop()}
        />{' '}
        Avaliar manifestações
      </Text>
      {manifestations.length > 0 ? (
        <ManifestationList
          manifestations={manifestations}
          navigation={navigation}
          handleNextPage={() => {}}
        />
      ) : (
        <ActivityIndicator size="large" color={colors.Gray} />
      )}
    </ContainerWithLoading>
  );
}
