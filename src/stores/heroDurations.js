import { writable } from 'svelte/store';
import api from '../api';

const SECONDS_IN_MINUTE = 60;

function createHeroDurations() {
  const { subscribe, update } = writable({});

  return {
    subscribe,
    async getData(heroId) {
      const durations = await api.getHeroDurations(heroId);
      const sortedDurations = durations.sort((a, b) => a.duration_bin - b.duration_bin);
      update(durations => ({
        ...durations,
        [heroId]: {
          durations: sortedDurations.map(item => item.duration_bin / SECONDS_IN_MINUTE),
          games_played: sortedDurations.map(item => item.games_played),
          win_rate: sortedDurations.map(item => Number((item.wins * 100 / item.games_played).toFixed(2)))
        }
      }));
    }
  };
}

export const heroDurations = createHeroDurations();
