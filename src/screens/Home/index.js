/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import MapView from 'react-native-maps';
import { Container, Button } from '../../components';
import { SignOut } from '../../helpers';
import Location from '../../services/Location';

export default function Home({ navigation }) {
  const initialCoords = {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const [coords, setCoords] = useState(initialCoords);

  function updateCoordinates(location) {
    setCoords({
      ...coords,
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
  }

  useEffect(() => {
    Location.subscribeToLocationUpdates();
    Location.getCurrentPosition(updateCoordinates);
  }, []);

  return (
    <Container noPadding>
      <MapView style={{ flex: 1 }} region={coords}>
        <MapView.Marker
          coordinate={{
            latitude: coords.latitude,
            longitude: coords.longitude,
          }}
          title="title"
          description="description"
        />
      </MapView>

      <Button
        touchableProps={{
          onPress: async () => {
            console.log({
              latitude: coords.latitude,
              longitude: coords.longitude,
            });
          },
        }}
        textProps={{ title: 'Sair' }}
      />
    </Container>
  );
}
