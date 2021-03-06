/* eslint-disable array-callback-return */
/* eslint-disable react/prop-types */
import React, { useState, useEffect, useRef, useContext } from 'react';
import MapView from 'react-native-map-clustering';
import { Marker } from 'react-native-maps';
import Device from 'react-native-device-info';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Container, Text, Button } from '../../components';
import Location from '../../services/Location';
import Manifestation from '../../services/Manifestation';
import {
  NotificationContainer,
  NotificationContent,
  NotificationCount,
} from './styles';
import Api from '../../services/Api';
import { SessionContext } from '../../store/session';

/** Coordenadas iniciais do mapa */
const initialCoords = {
  latitude: -15.749997,
  longitude: -47.9499962,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

export default function Home({ navigation }) {
  const { session } = useContext(SessionContext);
  const [userId, setUserId] = useState(null);
  const [coords, setCoords] = useState(initialCoords);
  const [currentMapPosition, setCurrentMapPosition] = useState(initialCoords);
  const [manifestations, setManifestations] = useState([]);
  /** Controles de localização/permissao */
  const [locationEnabled, setLocationEnabled] = useState(false);
  const [locationPermission, setLocationPermission] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);

  const mapRef = useRef();
  const lastManifestationPressed = useRef();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setTimeout(async () => {
        const manifestationList = await Manifestation.fetchAll();
        setManifestations(manifestationList.rows);
        const notification = await Api.get(
          `/manifestation/filter/?ownerId=${userId}&status=encerrada&quantity=99`
        );
        let count = 0;
        for (const key of notification.rows) {
          if (!key.avaliation_rate) {
            count += 1;
          }
        }
        setNotificationCount(count);
      }, 1000);
    });

    return unsubscribe;
  }, [navigation]);

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
    Location.subscribeToLocationUpdates();
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

  /**
   * Checando se o dispositivo está com a localização ativada.
   * Este método pode retornar falsos positivos, por este motivo
   * devemos verificar no método de capturar a localização se algum
   * erro foi retornado
   */
  useEffect(() => {
    // Pegar id do usuário
    async function getUserId() {
      const resolvedSession = await session;
      setUserId(resolvedSession.profile.id);
    }

    checkIfLocationEnabled();
    getUserId();
  }, []);

  /**
   * Se o disposivi está com a localização ativada,
   * pedimos permissão para acessar a localização.
   */
  useEffect(() => {
    async function getPermission() {
      const permission = await Location.getPermissionAndroid();
      setLocationPermission(permission);
    }
    if (locationEnabled) {
      getPermission();
    }
  }, [locationEnabled]);

  /**
   * Tendo permissão para acessar a localização, tentamos buscar
   * as coordenadas
   */
  useEffect(() => {
    if (locationPermission) {
      Location.getCurrentPosition(
        location => {
          updateCoordinates(location);
          setCurrentMapPosition(location.coords);
        },
        () => {
          setLocationEnabled(false);
        }
      );
      fetchManifestations();
    }
  }, [locationPermission]);

  function renderCurrentLocationMarker() {
    if (Location.permissionGranted) {
      if (mapRef.current && mapRef.current.state.isReady) {
        const region = {
          latitude: currentMapPosition.latitude,
          longitude: currentMapPosition.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        };
        mapRef.current.animateToRegion(region, 3000);
      }

      return (
        <Marker
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

  function handleManifestationPressed(m) {
    if (m.id !== lastManifestationPressed.current) {
      lastManifestationPressed.current = m.id;
    } else {
      navigation.navigate('ManifestacaoDetalhes', {
        id: m.id,
      });
    }
  }

  function renderMarkers() {
    if (!manifestations) return null;
    const markers = [];

    manifestations.map(manifestation => {
      if (manifestation.location) {
        markers.push(
          <Marker
            key={manifestation.protocol}
            coordinate={{
              latitude: Number(manifestation.latitude),
              longitude: Number(manifestation.longitude),
            }}
            title={manifestation.title}
            description={manifestation.description}
            onPress={() => handleManifestationPressed(manifestation)}
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
      <MapView style={{ flex: 1 }} initialRegion={coords} ref={mapRef}>
        {renderCurrentLocationMarker()}
        {renderMarkers()}
      </MapView>
      {notificationCount !== 0 && (
        <NotificationContainer
          onPress={() => navigation.navigate('Notificacao')}>
          <NotificationContent>
            <Ionicons name="ios-notifications-outline" size={35} color="#fff" />
            <NotificationCount>
              <Text>{notificationCount > 9 ? '9+' : notificationCount}</Text>
            </NotificationCount>
          </NotificationContent>
        </NotificationContainer>
      )}
    </Container>
  );
}
