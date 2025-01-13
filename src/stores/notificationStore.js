import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useNotificationStore = defineStore('notification', () => {
  const notification = ref({
    message: '',
    type: 'success',
  });

  const addNotification = (message, type = 'success') => {
    notification.value = {
      message,
      type,
    };
  };

  const removeNotification = () => {
    notification.value = {
      message: '',
      type: 'success',
    };
  };

  return {
    notification,
    addNotification,
    removeNotification
  };
});
