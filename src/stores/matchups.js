import { writable } from 'svelte/store';
import api from '../api';

function createMatchups() {
  const { subscribe, update } = writable({});

  return {
    subscribe,
    async getMatchup(heroId) {
      const heroMatchups = await api.getMatchups(heroId);
      update(matchups => ({
        ...matchups,
        [heroId]: heroMatchups.reduce((obj, matchup) => ({
          ...obj,
          [matchup.hero_id]: {
            id: matchup.hero_id,
            win_rate: Number((100 - (matchup.wins / matchup.games_played) * 100).toFixed(2))
          }
        }), {})
      }))
    },
    removeMatchup(heroId) {
      update(matchups => {
        delete matchups[heroId];
        return matchups;
      })
    }
  }
}

export const matchups = createMatchups();
