import { derived } from 'svelte/store';
import { matchups } from './matchups';

export const offeredHeroes = derived(
  matchups,
  $matchups => {
    const selectedHeroes = new Set(Object.keys($matchups));
    if (!selectedHeroes.size) {
      return [];
    }

    const combinedMatchups = Object.values($matchups);
    const result = {};
    for (const heroId in combinedMatchups[0]) {
      if (selectedHeroes.has(heroId)) {
        continue;
      }

      let winRateSum = 0;
      for (let i = 0; i < combinedMatchups.length; i++) {
        if (!combinedMatchups[i][heroId]) {
          break;
        }

        winRateSum += combinedMatchups[i][heroId].win_rate;
      }

      result[heroId] = {
        id: heroId,
        win_rate: Number((winRateSum / combinedMatchups.length).toFixed(2))
      };
    }

    return Object
      .values(result)
      .sort((a, b) => b.win_rate - a.win_rate)
      .slice(0, 5);
  }
);
