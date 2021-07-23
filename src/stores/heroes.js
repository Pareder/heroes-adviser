import { writable } from 'svelte/store';
import api from '../api';

function createHeroes() {
  const { subscribe, set } = writable({});

  return {
    subscribe,
    getData: async () => {
      const heroes = await api.getHeroes();
      set(heroes.reduce((obj, hero) => ({
        ...obj,
        [hero.id]: {
          ...hero,
          short_name: hero.name.replace('npc_dota_hero_', '')
        }
      }), {}));
    }
  };
}

export const heroes = createHeroes();