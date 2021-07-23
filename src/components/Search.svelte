<script>
    export let value;

    function reset() {
      value = '';
    }
</script>

<div class="search">
    <input class="input" type="text" placeholder="Search by hero name" bind:value={value}>
    <button class="reset" type="button" on:click={reset}/>
</div>

<style>
    .search {
        position: relative;
        width: 100%;
        max-width: 400px;
        margin: 20px auto;
        text-align: center;
    }

    .search::before {
        content: "";
        position: absolute;
        top: 10px;
        left: 5px;
        width: 20px;
        height: 20px;
        background-image: url("/search.svg");
        background-size: cover;
    }

    .input {
        width: 100%;
        height: 40px;
        margin: 0;
        padding: 10px 40px;
        border: none;
        outline: none;
        background: #2f2f2f;
        color: #fff;
    }

    .input::placeholder {
        color: #b4b4b4;
    }

    .reset {
        position: absolute;
        top: 10px;
        right: 10px;
        width: 20px;
        height: 20px;
        padding: 0;
        border: none;
        outline: none;
        cursor: pointer;
        transition: opacity 0.3s;
        background-image: url("/close.svg");
        background-size: cover;
        background-color: transparent;
    }

    .reset:hover {
        opacity: 0.5;
    }
</style>
