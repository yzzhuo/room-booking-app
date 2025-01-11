<template>
  <cv-toast-notification kind="success" title="success" subTitle="subtitle" caption="more information" @close="onClose" >
    <template v-if="args.titleSlot" #title>
      <strong style="color: orange; font-size: 1.25rem;">Custom</strong> <span style="color: yellow;">title</span>
    </template>

    <template v-if="args.subtitleSlot" #subtitle>
      Some <strong style="color: orange; font-size: 1.25rem;">custom</strong> <span style="color: yellow;">subtitle</span>
    </template>

    <template v-if="args.captionSlot" #caption>
      Some <span style="color: green;">custom</span> <strong style="color: orange; font-size: 0.75rem;">caption</strong>
    </template>

    <template v-if="args.defaultSlot">
      Default slot content.
    </template>
  </cv-toast-notification>
</template>

<script>
export default {

}
</script>

<style>

</style>