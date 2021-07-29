<script>
  import { getContext, onMount } from 'svelte';
  import { heroes } from '../stores/heroes';
  import { matchups } from '../stores/matchups';
  import { offeredHeroes } from '../stores/offeredHeroes'
  import HeroButton from '../components/HeroButton.svelte';
  import Search from '../components/Search.svelte';
  import StatsModal from '../components/StatsModal.svelte';

  onMount(heroes.getData);

  const { alert } = getContext('alert');
  let selectedHeroes = new Set();
  let search = '';
  let heroId = null;
  $: filteredHeroes = Object
    .values($heroes)
    .filter(({ localized_name }) => localized_name.toLowerCase().includes(search))
    .sort((a, b) => a.localized_name.localeCompare(b.localized_name));

  function getHeroDetails(event) {
    heroId = event.detail;
    if (heroId !== null) {
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = '15px';
    } else {
      document.body.style.overflow = 'auto';
      document.body.style.paddingRight = '0';
    }
  }

  function selectHero(event) {
    const heroId = event.detail;
    if (selectedHeroes.has(heroId)) {
      selectedHeroes.delete(heroId);
      selectedHeroes = selectedHeroes;
      matchups.removeMatchup(heroId);
      return;
    }

    if (selectedHeroes.size === 5) {
        alert('Maximum number of selected heroes - 5. Try to unselect some heroes.');
        return;
    }

    selectedHeroes = new Set([...selectedHeroes, heroId]);
    matchups.getMatchup(heroId);
  }
</script>

{#if selectedHeroes.size}
    <div class="heroes">
        {#each $offeredHeroes as hero (hero.id)}
            <HeroButton hero={$heroes[hero.id]} on:click={getHeroDetails}>
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
            on:click={selectHero}
        />
    {:else}
        <p class="empty">No Heroes match your filter</p>
    {/each}
</div>

<StatsModal heroId={heroId} on:close={getHeroDetails}/>

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
