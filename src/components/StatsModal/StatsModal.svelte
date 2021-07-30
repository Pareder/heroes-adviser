<script>
  import { createEventDispatcher, onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import { heroStats } from '../../stores/heroStats';
  import Header from './Header.svelte';
  import Attributes from './Attributes.svelte';
  import Stats from './Stats.svelte';
  import WinrateChart from '../WinrateChart.svelte';
  import DurationChart from '../DurationChart.svelte';

  export let heroId;

  const dispatch = createEventDispatcher();

  onMount(heroStats.getData);

  $: stats = $heroStats[heroId];

  function close() {
    dispatch('close');
  }
</script>

{#if heroId !== null}
    <div class="modal" transition:fade>
        <div class="backdrop" on:click|preventDefault={close}/>
        <div class="modal-container">
            <div class="modal-content">
                {#if stats}
                    <Header stats={stats}/>
                    <div class="content">
                        <h2>Attributes</h2>
                        <Attributes stats={stats}/>
                        <h2>Stats</h2>
                        <Stats stats={stats}/>
                        <WinrateChart stats={stats}/>
                        <DurationChart heroId={heroId}/>
                    </div>
                {/if}
            </div>
        </div>
    </div>
{/if}

<style>
    .modal {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 3;
    }

    .backdrop {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
    }

    .modal-container {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .modal-content {
        position: relative;
        width: 100%;
        max-width: 500px;
        max-height: calc(100% - 40px);
        margin: 20px;
        background-color: #1f1e2d;
        border-radius: 10px;
        overflow-y: auto;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.7);
        color: #ffffff;
    }

    .content {
        padding: 20px;
    }

    .content h2 {
        margin: 0 0 20px;
        text-align: center;
        text-transform: uppercase;
    }
</style>