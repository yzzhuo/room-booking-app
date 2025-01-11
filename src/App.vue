<template>
  <cv-header aria-label="Carbon header" class="flex justify-between">
    <cv-header-name href="javascript:void(0)">
      <RouterLink to="/">Room Booking System</RouterLink>
    </cv-header-name>

    <cv-header-global class="ml-auto">
      <cv-header-global-action aria-label="User profile" class="w-40">
        <div class="flex items-center gap-2 px-4">
          <img 
            :src="currentUser.avatar" 
            :alt="`${currentUser.name}'s avatar`" 
            class="w-8 h-8 rounded-full"
          />
          <span class="text-white">{{ currentUser.name }}</span>
        </div>
      </cv-header-global-action>
    </cv-header-global>
  </cv-header>
  <main class="mt-16 ml-12">
    <RouterView />
  </main>
</template>

<script setup>
import { ref } from 'vue';
import userInfo from './data/user-info.json';
const currentUser = ref(userInfo.currentUser);

</script>

<style lang="scss">
</style>