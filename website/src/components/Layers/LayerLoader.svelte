<script>
  import { onMount } from 'svelte'

  import { isCookieAccepted } from '/stores.js';
  import Cookies from 'js-cookie'

  export let zIndex = 0

  onMount( () => {
    $isCookieAccepted = Cookies.get('refusal')
  })

  function activate() {
    Cookies.set('refusal', 'true')
    $isCookieAccepted = true;
  }
</script>

<div class="container">
  <div on:animationend={ activate } class="tmask" style="--zIndex: 5">for refusal</div>
</div>

<style lang="scss">

  .container {
    position: fixed;
    left:0;
    right:0;
    top:0;
    z-index: var(--zIndex);
  }
  .tmask {
      font-size: 18vw;
      text-align:center;
      line-height: 100vh;
      background-color: white;
      background: linear-gradient(90deg, $color-mint 50%, white 50%);
      background-position-x: 100%;
      background-size: 200% 200%;
      background-position-x: 0%;
      animation-name: wait;
      animation-duration: 6s;
      animation-timing-function: linear;
      animation-delay: 0s;
      animation-iteration-count: 1;
      animation-fill-mode: forwards;
      background-clip: text;
      color: transparent;
  }

  @keyframes wait {
    from { 
      background-position-x: 100%;
      background-clip: text;
    }
    to   { 
      background-position-x: 0%;
      background-clip: text;
    }
  }
</style>
