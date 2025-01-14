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
import { useRouter } from 'vue-router';

const router = useRouter();
const currentUser = ref(userInfo.currentUser);

const navigateToHelpPage = () => {
  router.push('/help')
};

</script>

<style lang="scss">
</style>