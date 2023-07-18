<template>
  <div class="content">
    <Header />
    <slot />
  </div>
</template>

<style lang="scss">
.content {
  max-width: 80rem;
  margin: 0 auto;
}
</style>