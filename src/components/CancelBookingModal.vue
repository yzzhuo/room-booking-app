<template>
  <cv-modal 
    :visible="isOpen" 
    kind="danger" 
    :alert="true"
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

const handleClose = () => {
  emit('close');
};

const handleConfirm = async () => {
  emit('confirm', props.booking);
};
</script>
