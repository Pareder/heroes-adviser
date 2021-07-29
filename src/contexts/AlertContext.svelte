<script>
  import { onDestroy, setContext } from 'svelte';
  import { fade } from 'svelte/transition';

  let show = false;
  let alertText = '';
  let timeoutId;
  function openAlert() {
    show = true;
    timeoutId = setTimeout(() => {
      show = false;
    }, 5000);
  }

  onDestroy(() => {
    clearTimeout(timeoutId);
  });

  setContext('alert', {
    alert: (text = '') => {
      clearTimeout(timeoutId);
      alertText = text;
      openAlert();
    }
  })
</script>

<slot></slot>

{#if show}
    <div class="notification" transition:fade>
        {alertText}
    </div>
{/if}

<style>
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 2;
        width: 400px;
        max-width: 100%;
        padding: 10px;
        background-color: var(--strength-color);
        color: #ffffff;
        font-weight: 700;
        border-radius: 5px;
        border: 2px solid #000000;
    }
</style>