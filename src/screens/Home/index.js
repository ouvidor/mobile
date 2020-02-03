/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import MapView from 'react-native-maps';
import { Container, Button } from '../../components';
import { SignOut, getManifestationsList } from '../../helpers';
import Location from '../../services/Location';

export default function Home({ navigation }) {
  const initialCoords = {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const [coords, setCoords] = useState(initialCoords);
  const [manifestations, setManifestations] = useState([]);

  function updateCoordinates(location) {
    setCoords({
      ...coords,
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
  }

  async function fetchManifestations() {
    const manifestationsList = await getManifestationsList();
    setManifestations(manifestationsList.rows);
  }

  useEffect(() => {
    Location.subscribeToLocationUpdates();
    Location.getCurrentPosition(updateCoordinates);
    fetchManifestations();
  }, []);

  function renderCurrentLocationMarker() {
    if (Location.permissionGranted) {
      return (
        <MapView.Marker
          coordinate={{
            latitude: coords.latitude,
            longitude: coords.longitude,
          }}
          title="title"
          description="description"
        />
      );
    }
    return null;
  }

  function renderMarkers() {
    return manifestations.map(manifestation => {
      if (manifestation.location) {
        return (
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
  }

  return (
    <Container noPadding>
      <MapView style={{ flex: 1 }} initialRegion={coords}>
        {renderCurrentLocationMarker()}
        {renderMarkers()}
      </MapView>

      <Button
        touchableProps={{
          onPress: async () => {
            const signOut = await SignOut();
            if (signOut) {
              navigation.replace('Login');
            }
          },
        }}
        textProps={{ title: 'Sair' }}
      />
      <Button
        touchableProps={{
          onPress: () => navigation.navigate('AddManifestation'),
        }}
        textProps={{ title: 'Criar' }}
      />
    </Container>
  );
}
