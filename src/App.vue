<template>
  <div id="app">
    <router-view />
  </div> 
  <cv-header aria-label="Carbon header">
    <cv-skip-to-content href="#main-content">
      Skip to content
    </cv-skip-to-content>
    <cv-header-name href="javascript:void(0)" prefix="Group2">
      [Platform]
    </cv-header-name>
    <cv-header-nav aria-label="Carbon nav">
    <cv-header-menu-item href="javascript:void(0)">
      <RouterLink to="/">Home</RouterLink>
    </cv-header-menu-item>
    <cv-header-menu-item href="javascript:void(0)">
      <RouterLink to="/about">About</RouterLink>
    </cv-header-menu-item>
    </cv-header-nav>
  </cv-header>
  <main class="mt-16 ml-12">
    <RouterView />
  </main>
  
</template>

<script setup>
</script>

<style lang="scss">
</style>