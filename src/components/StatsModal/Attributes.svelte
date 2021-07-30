<script>
  export let stats = {};
</script>

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

<style>
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
</style>