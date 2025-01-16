<template>
  <cv-header aria-label="Carbon header">
    <cv-header-name >
      <RouterLink to="/">Room Booking System</RouterLink>
    </cv-header-name>

    <nav aria-label="Main navigation of Room Booking System" class="text-white">
      <ul class="flex gap-8" role="menubar" aria-label="Room Booking System">
        <li role="none" :class="{ 'font-bold underline': isCurrentRoute('/') }">
          <RouterLink role="menuitem" to="/" 
            :aria-current="isCurrentRoute('/') ? 'page' : null"
            >Home</RouterLink>
        </li>
        <li role="none" :class="{ 'font-bold underline': isCurrentRoute('/rooms') }">
          <RouterLink role="menuitem" to="/rooms" 
            :aria-current="isCurrentRoute('/rooms') ? 'page' : null"
            >Rooms</RouterLink>
        </li>
        <li role="none" :class="{ 'font-bold underline': isCurrentRoute('/bookings') }">
          <RouterLink role="menuitem" to="/bookings" 
          :aria-current="isCurrentRoute('/bookings') ? 'page' : null"
          :class="{ 'font-bold': isCurrentRoute('/bookings') }"
          >My Bookings</RouterLink>
        </li>
      </ul>
    </nav>

    <template v-slot:header-global>
        <cv-header-global-action
            aria-label="Help Menu Item"
            :label="`Need Help?`"
            tipPosition="bottom"
            tipAlignment="center"
            role="button"
            tabindex="0"
            @click="navigateToHelpPage"
          >
            <!-- Add aria-hidden to decorative icon -->
            <Help32 aria-hidden="true" />
          </cv-header-global-action>
        <cv-header-global-action
          aria-label="User Information"
          :label="`${currentUser.name}`"
          tipPosition="bottom"
          tipAlignment="center"
          role="button"
          tabindex="0"
        >
          <UserAvatar32 aria-hidden="true" />
        </cv-header-global-action>
      </template>
  </cv-header>
  <main class="mt-16 ml-12">
    <RouterView />
    <Notification />
  </main>
</template>

<script setup>
import { ref } from 'vue';
import userInfo from './data/user-info.json';
import UserAvatar32 from '@carbon/icons-vue/es/user--avatar/32';
import Help32 from '@carbon/icons-vue/es/help/32';
import Notification from './components/Notification.vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

const currentUser = ref(userInfo.currentUser);

const navigateToHelpPage = () => {
  router.push('/help')
};

const isCurrentRoute = (path) => {
  return route.path === path;
};
</script>

<style lang="scss">
</style>