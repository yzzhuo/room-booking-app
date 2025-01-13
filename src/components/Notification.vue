<template>
  <div class="notification-container">
    <cv-toast-notification
      v-if="notification.message"
      :kind="notification.type"
      :title="notification.message"
      @close="removeNotification"
    />
  </div>
</template>

<script setup>
import { useNotificationStore } from '../stores/notificationStore';
import { computed } from 'vue';

const notificationStore = useNotificationStore();
const notification = computed(() => notificationStore.notification);

const removeNotification = () => {
  notificationStore.removeNotification();
};
</script>

<style scoped>
.notification-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
}
</style>