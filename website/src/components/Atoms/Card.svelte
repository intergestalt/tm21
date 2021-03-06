<script>
  import { onMount } from 'svelte'

  import { styleVars, generateBorderRadiusString } from '/helper'

  export let bgImage = ""
  export let group = "default" // a key to coordniate the combinations ob border radius and columns
  export let bgColorKey = "white"
  export let borderRadiusPreset = undefined
  export let nohole = false
  export let standardRadius = false
  export let flow = false // true -> height: 100%

  let borderRadiusStringLarge, borderRadiusStringSmall

  $: console.log(bgImage)

  onMount(function() {
    if (standardRadius) {
      borderRadiusPreset = {
        small: [15,15,15,15],
        large: [20,20,20,20]
      }
    }
    const {largeString, smallString} = generateBorderRadiusString(group, borderRadiusPreset)
    borderRadiusStringLarge = largeString
    borderRadiusStringSmall = smallString
  })

</script>

<div 
  class="container bg-color-{bgColorKey}" 
  class:bgImage={bgImage}
  class:nohole
  class:flow
  style={styleVars({
    imageUrl: `url("${bgImage}")`,
    borderRadiusStringLarge,
    borderRadiusStringSmall
  })}
><!--span style="position: absolute; color: white;">{borderRadiusStringLarge}</span-->
  <slot></slot>
</div>

<style lang="scss">

  $hole-radius-large: 0.5 * $hole-diameter-large;
  $hole-radius-small: 0.5 * $hole-diameter-small;

  .container {
    width: 100%;
    &:not(.flow) {
      height: 100%;
    }
    display: flex;
    flex-direction: column;
    justify-content: center;
    box-sizing: border-box;

    padding: 14px 30px;
    min-height: #{ $hole-distance-large + $hole-diameter-large};
    border-radius: var(--borderRadiusStringLarge);
    @include media-small {
      padding: 10px 20px;
      min-height: #{ $hole-distance-small + $hole-diameter-small};
      border-radius: var(--borderRadiusStringSmall);
    }
    @include box-shadow;
    position: relative;
    /*backdrop-filter: blur(4px);*/

  }

  // background in varying colors, including a transparent hole
  @each $name, $color in $card-bg-colors {
    .container.bg-color-#{$name} {
      
      background: radial-gradient(
        circle at calc(100% - #{$hole-distance-large + $hole-radius-large}) #{$hole-distance-large + $hole-radius-large}, 
        transparent $hole-radius-large, 
        $color $hole-radius-large
      );

      @include media-small {
        background: radial-gradient(
        circle at calc(100% - #{$hole-distance-small + $hole-radius-small}) #{$hole-distance-small + $hole-radius-small}, 
        transparent $hole-radius-small, 
        $color $hole-radius-small
        );
      }

    }

    // overwrite in case of nohole
    .container.nohole.bg-color-#{$name} {
      background: $color;
    }

  }

  // optional background image (no hole in this case)
  .container.bgImage {
    background-image: var(--imageUrl);
    background-size: cover;
    &::after {
      display: none;
    }
  }

  // the drop shadow inside the hole
  .container:not(.nohole)::after {
    content: "";
    border-radius: 50%;
    @include box-shadow-inset;
    position: absolute;

    right: $hole-distance-large;
    top: $hole-distance-large;    
    height: $hole-diameter-large;
    width: $hole-diameter-large;
    @include media-small {
      right: $hole-distance-small;
      top: $hole-distance-small;
      height: $hole-diameter-small;
      width: $hole-diameter-small;
    }
  }

</style>