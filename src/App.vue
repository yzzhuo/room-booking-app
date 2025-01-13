<template>
  <cv-header aria-label="Carbon header">
    <cv-header-name >
      <RouterLink to="/">Room Booking System</RouterLink>
    </cv-header-name>

    <cv-header-nav aria-label="Carbon nav">
      <cv-header-menu-item >
        <RouterLink to="/rooms">Rooms</RouterLink>
      </cv-header-menu-item>
      <cv-header-menu-item >
        <RouterLink to="/bookings">My Bookings</RouterLink>
      </cv-header-menu-item>
    </cv-header-nav>

    <template v-slot:header-global>
      <cv-header-global-action
        aria-label="User avatar"
        aria-controls="user-panel"
        :label="`${currentUser.name}`"
        tipPosition="bottom"
        tipAlignment="center"
        >
        <UserAvatar32 />
      </cv-header-global-action>
    </template>
    <template v-slot:right-panels>
      <cv-header-panel  id="user-panel">
        <cv-side-nav-items>
          <cv-side-nav-link href="javascript:void(0)">
            <template v-slot:nav-icon><Logout16/></template>
              <span  class="text-white">Log out</span>
          </cv-side-nav-link>
        </cv-side-nav-items>
      </cv-header-panel>
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
import Logout16 from '@carbon/icons-vue/es/logout/16';
import Notification from './components/Notification.vue';

const currentUser = ref(userInfo.currentUser);

</script>

<style lang="scss">
</style>