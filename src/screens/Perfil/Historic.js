/* eslint-disable react/prop-types */
import React, { useState, useEffect, useContext } from 'react';
import { TouchableOpacity  } from 'react-native';
import {
  ScrollableContainerWithLoading,
  Text,
  ManifestationDetailsModal,
  Button,
} from '../../components';
import Api from '../../services/Api';
import { SessionContext } from '../../store/session';

export default function Historic({ navigation }) {
  const { session } = useContext(SessionContext);

  const [manifestations, setManifestations] = useState(null);
  /** Controle do Modal */
  const [modalVisible, setModalVisible] = useState(false);
  /** Controle de qual manifestação foi clicada por ultimo. */
  const [currentManifestation, setCurrentManifestation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Pegar manifestações de um usuário
    async function getManifestations() {
      let idUser = null;
      if ('profile' in session) {
        let { id } = session.profile;
        idUser = id;
      }
      else {
        session.then(s => {
          let { id } = s.profile;
          idUser = id;
        });
      }

      const payload = {
        user_id: idUser,
      };

      const manifestations = await Api.get('/manifestation', payload);

      if (manifestations && manifestations.count > 0) {
        // Ordenando manifestações
        const orderedManifestationList = manifestations.rows.sort(function(
          a,
          b
        ) {
          const first = Date.parse(a.updated_at);
          const second = Date.parse(b.updated_at);

          return first - second;
        });

        setManifestations(orderedManifestationList);
      }

      setLoading(false);
    }

    getManifestations();
  }, []);

  useEffect(() => {
    if (currentManifestation) {
      setModalVisible(true);
    }
  }, [currentManifestation]);

  function handleManifestationPress(m) {
    setCurrentManifestation(m);
  }

  function renderManifestations() {
    const toRender = [];
    if (manifestations) {
      manifestations.map(manifestation => {
        toRender.push(
          <TouchableOpacity
            key={manifestation.protocol}
            style={{ margin: 10, padding: 10, backgroundColor: 'green' }}
            onPress={() => handleManifestationPress(manifestation)}
          >
            <Text style={{ color: 'white' }}>titulo: {manifestation.title}</Text>
            <Text style={{ color: 'white' }}>
              descricao: {manifestation.description}
            </Text>
          </TouchableOpacity >
        );
      });
    }
    else {
      toRender.push(<Text>Não há manifestações relatados por você</Text>);
    }

    return toRender;
  }

  return (
    <ScrollableContainerWithLoading loading={loading}>
      <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Meu Histórico</Text>
      {renderManifestations()}
      <ManifestationDetailsModal
        isVisible={modalVisible}
        close={() => setModalVisible(false)}
        manifestation={currentManifestation}
      />
    </ScrollableContainerWithLoading>
  );
}
