import Geolocation from '@react-native-community/geolocation';
import { PermissionsAndroid } from 'react-native';

class Location {
  constructor() {
    this.permissionGranted = false;
    this.currentCoords = {};
    this.error = null;
    this.timestamp = null;
  }

  /**
   * @param {object} options
   * @author Lucas Sousa
   * @since 2020.01.26
   * @description
   * Método para observar atualizações no posicionamento do dispositivo
   * periodicamente.
   * Parametros aceitos em options podem ser encontrados aqui:
   * https://github.com/react-native-community/react-native-geolocation#watchposition
   */
  subscribeToLocationUpdates(options = null) {
    const locationUpdateSuccessCallback = location => {
      this.currentCoords = location.coords;
      this.timestamp = location.timestamp;
      this.error = null;
    };

    const locationUpdateFailureCallback = location => {
      this.error = location.error;
      this.timestamp = location.timestamp;
    };

    Geolocation.watchPosition(
      locationUpdateSuccessCallback,
      locationUpdateFailureCallback,
      options
    );
  }

  /**
   * @param {function} onSuccess
   * @param {function} onError
   * @param {object} options
   * @author Lucas Sousa
   * @since 2020.01.26
   * @description
   * Método que busca a posição atual do dispositivo, e chama onSuccess
   * passando a localização atualizada.
   * Em caso de algum erro, onError é chamado.
   * Parametros aceitos em options podem ser encontrados aqui:
   * https://github.com/react-native-community/react-native-geolocation#getcurrentposition
   */
  // eslint-disable-next-line class-methods-use-this
  getCurrentPosition(onSuccess, onError, options = null) {
    Geolocation.getCurrentPosition(onSuccess, onError, options);
  }

  /**
   * @author Lucas Sousa
   * @since 2020.01.26
   * @description
   * Método para solicilitar permissão para acessar
   * localização do dispositivo.
   */
  async getPermissionAndroid() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Ouvidor gostaria de acessar sua localização',
          message: 'Ouvidor gostaria de acessar sua localização',
          buttonNegative: 'Cancelar',
          buttonPositive: 'OK',
        }
      );
      if (granted) {
        this.permissionGranted = true;
      } else {
        this.permissionGranted = false;
      }
      return this.permissionGranted;
    } catch (e) {
      this.permissionGranted = false;
      return e;
    }
  }
}

export default new Location();
