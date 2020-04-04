/* eslint-disable array-callback-return */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import MapView from 'react-native-maps';
import Device from 'react-native-device-info';
import { Container, Text, Button } from '../../components';
import Location from '../../services/Location';
import Manifestation from '../../services/Manifestation';

export default function Home({ navigation }) {
  const initialCoords = {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const [coords, setCoords] = useState(initialCoords);
  const [manifestations, setManifestations] = useState([]);
  const [locationEnabled, setLocationEnabled] = useState(false);

  /**
   * @desc Método invocado toda vez que há uma atualização na localização.
   * Recebo as coordenadas, e atualizo o state.
   */
  function updateCoordinates(location) {
    setCoords({
      ...coords,
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
  }

  /**
   * @desc Método para buscar uma lista the manifestações
   */
  async function fetchManifestations() {
    const manifestationList = await Manifestation.fetchAll();
    setManifestations(manifestationList.rows);
  }

  /**
   * @author Lucas Sousa
   * @since 2020.04.04
   * @description
   * Método para checar se a localização do dispositivo está habilitada
   */
  async function checkIfLocationEnabled() {
    const enabled = await Device.isLocationEnabled();
    setLocationEnabled(enabled);
  }

  useEffect(() => {
    checkIfLocationEnabled();
  }, []);
  useEffect(() => {
    if (locationEnabled) {
      Location.getPermissionAndroid();
      Location.subscribeToLocationUpdates();
      Location.getCurrentPosition(updateCoordinates);
      fetchManifestations();
    }
  }, [locationEnabled]);

  function renderCurrentLocationMarker() {
    if (Location.permissionGranted) {
      return (
        <MapView.Marker
          coordinate={{
            latitude: coords.latitude,
            longitude: coords.longitude,
          }}
          title="Localização atual"
          description="Você está aqui!"
        />
      );
    }
    return null;
  }

  function renderMarkers() {
    if (!manifestations) return null;
    const markers = [];

    manifestations.map(manifestation => {
      if (manifestation.location) {
        markers.push(
          <MapView.Marker
            key={manifestation.protocol}
            coordinate={{
              latitude: Number(manifestation.latitude),
              longitude: Number(manifestation.longitude),
            }}
            title={manifestation.titulo}
            description={manifestation.description}
          />
        );
      }
    });

    return markers;
  }

  if (!locationEnabled) {
    return (
      <Container>
        <Text>Sem localização</Text>
        <Button
          touchableProps={{
            onPress: checkIfLocationEnabled,
          }}
          textProps={{
            title: 'Atualizar',
            loading: false,
          }}
        />
      </Container>
    );
  }

  return (
    <Container noPadding>
      <MapView style={{ flex: 1 }} initialRegion={coords}>
        {renderCurrentLocationMarker()}
        {renderMarkers()}
      </MapView>
    </Container>
  );
}
