<script>
  import { createEventDispatcher } from 'svelte';
  import { fade } from 'svelte/transition';

  export let hero = {};
  export let selected = false;

  const dispatch = createEventDispatcher();

  function onClick() {
    dispatch('click', hero.id);
  }
</script>

<button
    class="button"
    class:selected
    on:click={onClick}
    transition:fade
>
    <slot>
        <div class="hero">
            <div class="attribute {hero.primary_attr}"/>
            {hero.localized_name}
        </div>
    </slot>
    <img
        class="hero_image"
        src="https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/{hero.name.replace('npc_dota_hero_', '')}.png"
        alt="{hero.localized_name}"
    >
    <img src="/checked.svg" alt="checked" class="check">
</button>

<style>
    .button {
        position: relative;
        width: 18%;
        min-width: 200px;
        padding: 0;
        border: none;
        cursor: pointer;
        overflow: hidden;
        box-shadow: 0 0 10px 3px rgba(0, 0, 0, 0.5);
        background: #000;
        border-radius: 3px;
    }

    .button:hover .hero {
        opacity: 1;
        transform: translateY(0);
    }

    .button:hover .hero_image {
        transform: scale(1.3);
    }

    .hero {
        position: absolute;
        bottom: 0;
        left: 0;
        z-index: 1;
        padding: 5px;
        display: flex;
        align-items: center;
        font-size: 22px;
        letter-spacing: 2px;
        text-transform: uppercase;
        text-align: left;
        color: #fff;
        opacity: 0;
        transform: translateY(22px);
        transition: all 0.3s;
    }

    .attribute {
        width: 10px;
        height: 10px;
        margin-right: 5px;
        border-radius: 50%;
    }

    .agi {
        background-color: var(--agility-color);
    }

    .str {
        background-color: var(--strength-color);
    }

    .int {
        background-color: var(--intelligence-color);
    }

    .hero_image {
        width: 100%;
        height: 100%;
        transition: transform 0.5s;
    }

    .selected .hero_image {
        opacity: 0.3;
    }

    .check {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 50px;
        height: 50px;
        transform: translate(-50%, -50%);
        opacity: 0;
        transition: opacity 0.3s;
    }

    .selected .check {
        opacity: 1;
    }
</style>
