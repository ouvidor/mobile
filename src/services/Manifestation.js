/* eslint-disable no-await-in-loop */
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
      const lastPage = manifestationList.last_page;

      this.manifestations = manifestationList;
      for (let i = 2; i <= lastPage; i += 1) {
        const manifestation = await Api.get(`/manifestation/?page=${i}`);

        this.manifestations.rows = [
          ...this.manifestations.rows,
          ...manifestation.rows,
        ];
      }
      return this.manifestations;
    } catch (e) {
      return e;
    }
  }
}
export default new Manifestation();
