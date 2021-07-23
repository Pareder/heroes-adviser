<script>
  import { onMount } from 'svelte';
  import { heroes } from '../stores/heroes';
  import { matchups } from '../stores/matchups';
  import { offeredHeroes } from '../stores/offeredHeroes'
  import HeroButton from '../components/HeroButton.svelte';
  import Search from '../components/Search.svelte';

  onMount(heroes.getData);

  let selectedHeroes = new Set();
  let search = '';
  $: filteredHeroes = Object
    .values($heroes)
    .filter(({ localized_name }) => localized_name.toLowerCase().includes(search))
    .sort((a, b) => a.localized_name.localeCompare(b.localized_name));

  async function handleClick(event) {
    const heroId = event.detail;
    if (selectedHeroes.has(heroId)) {
      selectedHeroes.delete(heroId);
      selectedHeroes = selectedHeroes;
      matchups.removeMatchup(heroId);
      return;
    }

    selectedHeroes = new Set([...selectedHeroes, heroId]);
    matchups.getMatchup(heroId);
  }
</script>

{#if selectedHeroes.size}
    <div class="heroes">
        {#each $offeredHeroes as hero (hero.id)}
            <HeroButton hero={$heroes[hero.id]}>
                <div class="winrate">{hero.win_rate}%</div>
            </HeroButton>
        {/each}
    </div>
{/if}

<hr/>

<Search bind:value={search}/>
<div class="heroes">
    {#each filteredHeroes as hero (hero.id)}
        <HeroButton
            hero={hero}
            selected={selectedHeroes.has(hero.id)}
            on:click={handleClick}
        />
    {:else}
        <p class="empty">No Heroes match your filter</p>
    {/each}
</div>

<style>
    .heroes {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        gap: 20px;
    }

    .winrate {
        position: absolute;
        bottom: 0;
        right: 0;
        z-index: 1;
        padding: 5px;
        font-size: 22px;
        color: #63ff63;
        background-color: rgba(0, 0, 0, 0.5);
    }

    .empty {
        font-size: 32px;
        color: #fff;
    }
</style>
