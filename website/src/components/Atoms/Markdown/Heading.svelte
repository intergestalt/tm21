<script>
  import Card from '/components/Atoms/Card'
  import CardHeadline from '/components/Widgets/CardHeadline'

  export let depth
  export let raw

  console.log(raw)
</script>

{#if depth === 1}
  <h1><slot></slot></h1>
{:else if depth === 2}
  <h2><slot></slot></h2>
{:else if depth === 3}
  <CardHeadline><slot></slot></CardHeadline>
{:else if depth === 4}
  <h4><slot></slot></h4>
{:else if depth === 5}
  <h5><slot></slot></h5>
{:else if depth === 6}
  <h6><slot></slot></h6>
{:else}
  {raw}
{/if}
