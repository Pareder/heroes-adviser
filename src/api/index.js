import config from '../config';


class API {
  constructor() {
    this.url = `${config.apiUrl}/api/`;
  }

  getUrl(path) {
    return `${this.url}${path}?api_key=${import.meta.env.VITE_API_KEY}`;
  }

  async getHeroes() {
    const res = await fetch(this.getUrl('heroes'));
    return await res.json();
  }

  async getHeroStats() {
    const res = await fetch(this.getUrl('heroStats'));
    return await res.json();
  }

  async getMatchups(heroId) {
    const res = await fetch(this.getUrl(`heroes/${heroId}/matchups`));
    return await res.json();
  }
}

const api = new API();

export default api;
