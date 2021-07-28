import { writable } from 'svelte/store';
import api from '../api';

function createHeroStats() {
  const { subscribe, set } = writable({});

  return {
    subscribe,
    async getData() {
      const heroStats = await api.getHeroStats();
      set(heroStats.reduce((obj, hero) => ({
        ...obj,
        [hero.id]: hero
      }), {}));
    }
  };
}

export const heroStats = createHeroStats();
