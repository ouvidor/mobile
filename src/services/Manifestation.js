import Api from './Api';

class Manifestation {
  constructor() {
    this.manifestations = {};
  }

  /**
   * @author Lucas Sousa
   * @since 2020.03.16
   * @description
   * Busca uma lista de todas as manifestações.
   */
  async fetchAll() {
    try {
      const manifestationList = await Api.get('/manifestation');
      this.manifestations = manifestationList;
      return this.manifestations;
    } catch (e) {
      return e;
    }
  }
}
export default new Manifestation();
