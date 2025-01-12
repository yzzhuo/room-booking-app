<template>
  <cv-modal 
    :visible="isOpen" 
    kind="danger" 
    @primary-click="handleConfirm"
    @secondary-click="handleClose"
    >
    <template #label>My Bookings</template>
    <template #title>Are you sure you want to cancel this booking?</template>
    <template #primary-button>
      Confirm
    </template>

    <template #secondary-button>
      Cancel
    </template>
  </cv-modal>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  },
  booking: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['close', 'confirm']);

const isLoading = ref(false);

const handleClose = () => {
  emit('close');
};

const handleConfirm = async () => {
  try {
    isLoading.value = true;
    // Here you would typically make an API call to cancel the booking
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated API delay
    emit('confirm', props.booking);
  } catch (error) {
    console.error('Error canceling booking:', error);
  } finally {
    isLoading.value = false;
    handleClose();
  }
};
</script>
