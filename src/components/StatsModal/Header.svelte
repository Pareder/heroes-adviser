<script>
  import config from '../../config';
  import { getHealth, getHealthRegen, getMana, getManaRegen } from '../../utils';

  export let stats = {};
</script>

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

<style>
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
</style>