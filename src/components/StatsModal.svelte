<script>
  import { createEventDispatcher, onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import config from '../config';
  import {
    getHealth,
    getMana,
    getHealthRegen,
    getManaRegen,
    getMinAttackDamage,
    getMaxAttackDamage,
    getArmor
  } from '../utils';
  import { heroStats } from '../stores/heroStats';

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
                    <div class="header" style="background-image: url({ config.apiUrl }{ stats.img });">
                        <h2 class="name">{stats.localized_name}</h2>
                        <p class="roles">{stats.roles.join(', ')}</p>
                        <div class="bar health">
                            {getHealth(stats)}
                            <span class="regen">+{getHealthRegen(stats)}</span>
                        </div>
                        <div class="bar mana">
                            {getMana(stats)}
                            <span class="regen">+{getManaRegen(stats)}</span>
                        </div>
                    </div>
                    <div class="content">
                        <h2>Attributes</h2>
                        <div class="attributes">
                            <div class="attribute strength">
                                <span>{stats.base_str}</span>
                                <span class="attribute_gain">+{stats.str_gain}</span>
                            </div>
                            <div class="attribute agility">
                                <span>{stats.base_agi}</span>
                                <span class="attribute_gain">+{stats.agi_gain}</span>
                            </div>
                            <div class="attribute intelligence">
                                <span>{stats.base_int}</span>
                                <span class="attribute_gain">+{stats.int_gain}</span>
                            </div>
                        </div>
                        <h2>Stats</h2>
                        <div class="stats">
                            <div>
                                <h3>Attack</h3>
                                <div class="stat">
                                    <img width="20" height="20" src="/sword.svg" alt="attack">
                                    {getMinAttackDamage(stats)} - {getMaxAttackDamage(stats)}
                                </div>
                                <div class="stat">
                                    <img width="20" height="20" src="/clock.svg" alt="attack rate">
                                    {stats.attack_rate}
                                </div>
                                <div class="stat">
                                    <img width="20" height="20" src="/measure.svg" alt="attack range">
                                    {stats.attack_range}
                                </div>
                                {#if stats.projectile_speed}
                                    <div class="stat">
                                        <img width="20" height="20" src="/arrow.svg" alt="projectile speed">
                                        {stats.projectile_speed}
                                    </div>
                                {/if}
                            </div>
                            <div>
                                <h3>Defense</h3>
                                <div class="stat">
                                    <img width="20" height="20" src="/shield.svg" alt="armor">
                                    {getArmor(stats)}
                                </div>
                                <div class="stat">
                                    <img width="20" height="20" src="/magic-wand.svg" alt="magic resist">
                                    {stats.base_mr}%
                                </div>
                            </div>
                            <div>
                                <h3>Mobility</h3>
                                <div class="stat">
                                    <img width="20" height="20" src="/magic-boot.svg" alt="move speed">
                                    {stats.move_speed}
                                </div>
                            </div>
                        </div>
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
        z-index: 1;
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

    .header {
        position: relative;
        height: 200px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-size: cover;
        background-position: center;
    }

    .header::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
    }

    .header > * {
        z-index: 1;
    }

    .name {
        margin: 0 0 20px;
        font-size: 32px;
        text-transform: uppercase;
        letter-spacing: 4px;
    }

    .roles {
        margin: 0 0 20px;
        font-size: 18px;
        color: #d2d2d2;
    }

    .bar {
        position: relative;
        width: 200px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        font-weight: 700;
        text-shadow: 0 0 5px #000000;
    }

    .health {
        background-color: var(--agility-color);
    }

    .mana {
        background-color: var(--intelligence-color);
    }

    .regen {
        position: absolute;
        top: 50%;
        right: 10px;
        font-size: 12px;
        color: #363636;
        text-shadow: none;
        transform: translateY(-50%);
    }

    .content {
        padding: 20px;
    }

    .content h2 {
        margin: 0 0 20px;
        text-align: center;
        text-transform: uppercase;
    }

    .attributes {
        margin-bottom: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .attribute {
        width: 100px;
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 20px;
        font-weight: 700;
        text-shadow: 0 0 5px #000000;
    }

    .attribute + .attribute {
        margin-top: 10px;
    }

    .attribute::before {
        content: "";
        display: block;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        box-shadow: 3px 3px 0 #000;
    }

    .strength::before {
        background-color: var(--strength-color);
    }

    .agility::before {
        background-color: var(--agility-color);
    }

    .intelligence::before {
        background-color: var(--intelligence-color);
    }

    .attribute_gain {
        font-size: 14px;
        text-shadow: none;
        color: #c7c7c7;
    }

    .stats {
        display: flex;
        justify-content: space-between;
    }

    .stats h3 {
        margin: 0 0 20px;
        font-weight: 400;
        text-transform: uppercase;
        letter-spacing: 2px;
        color: #c7c7c7;
    }

    .stat {
        display: flex;
        align-items: center;
        gap: 10px;
        font-weight: 700;
    }

    .stat + .stat {
        margin-top: 10px;
    }
</style>