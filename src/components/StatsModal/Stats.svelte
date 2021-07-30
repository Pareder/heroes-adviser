<script>
  import { getMinAttackDamage, getMaxAttackDamage, getArmor } from '../../utils';

  export let stats = {};
</script>

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

<style>
    .stats {
        margin-bottom: 20px;
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