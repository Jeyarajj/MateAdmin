<template>
<div class="loader">
  <md-progress-spinner :md-diameter="100" :md-stroke="10" md-mode="indeterminate"></md-progress-spinner>
</div>
</template>

<style lang="scss">
  .loader {
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    text-align: center;
  }
</style>
