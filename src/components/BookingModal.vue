<!-- src/components/BookingModal.vue -->
<template>
  <cv-modal
    :visible="isOpen"
    @modal-hidden="closeModal"
    @primary-click="handleCreate"
    @secondary-click="closeModal"
    :size="'sm'"
  >
    <template #label>New reservation</template>

    <template #content>
      <div class="space-y-6">
        <!-- Subject -->
        <cv-text-input
          v-model="formData.subject"
          label="Subject"
          placeholder="Meeting"
        />

        <!-- Date -->
        <cv-date-picker
          v-model="formData.date"
          label="Date"
          kind="single"
          :dateFormat="dateFormat"
        />

        <!-- Time Range -->
        <div class="grid grid-cols-2 gap-4">
          <cv-time-picker
            v-model="formData.timeFrom"
            label="From"
            ampm
            :invalid="timeFromInvalid"
            :invalidText="timeFromInvalidText"
          />
          
          <cv-time-picker
            v-model="formData.timeTo"
            label="To"
            ampm
            :invalid="timeToInvalid"
            :invalidText="timeToInvalidText"
          />
        </div>
        <cv-inline-notification v-if="showErrorNotification" kind="error" @action="onAction" @close="onClose" :subTitle="errorMessage" />
      </div>
    </template>

    <template #primary-button>
      Create
    </template>

    <template #secondary-button>
      Cancel
    </template>
  </cv-modal>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  },
  roomId: {
    type: String,
    required: true
  }
});

const emit = defineEmits(['close', 'create']);

const formData = ref({
  subject: '',
  date: new Date().toISOString().split('T')[0],
  timeFrom: '',
  timeTo: '',
  user: 'EIT Digital Master Students',
  repeat: 'Doesn\'t repeat'
});

// Notification states
const showSuccessNotification = ref(false);
const showErrorNotification = ref(false);
const notificationTitle = ref('');
const notificationMessage = ref('');
const errorMessage = ref('');


const dateFormat = (date) => {
  return new Date(date).toISOString().split('T')[0];
};

// Validation
const timeFromInvalid = computed(() => {
  if (!formData.value.timeFrom) return false;
  // Add your time validation logic here
  return false;
});

const timeToInvalid = computed(() => {
  if (!formData.value.timeTo) return false;
  if (!formData.value.timeFrom) return false;
  // Add your time range validation logic here
  return false;
});

const timeFromInvalidText = computed(() => {
  if (timeFromInvalid.value) return 'Please enter a valid time';
  return '';
});

const timeToInvalidText = computed(() => {
  if (timeToInvalid.value) return 'End time must be after start time';
  return '';
});

const isFormValid = computed(() => {
  return (
    formData.value.subject &&
    formData.value.date &&
    formData.value.timeFrom &&
    formData.value.timeTo &&
    !timeFromInvalid.value &&
    !timeToInvalid.value
  );
});

const handleCreate = async () => {
  try {
    // Simulate API call
    // await createBooking(bookingData);
    
    // Show success notification
    notificationTitle.value = 'Booking Confirmed';
    notificationMessage.value = `Room ${props.roomId} booked for ${formData.value.date} from ${formData.value.timeFrom} to ${formData.value.timeTo}`;
    showSuccessNotification.value = true;
    // Update bookings list
    // await fetchBookings();
    closeModal();
  } catch (error) {
    // Show error notification
    errorMessage.value = error.message || 'An error occurred while creating the booking';
    showErrorNotification.value = true;
  }
};

// Booking handlers
const handleBookingCreate = async (bookingData) => {
  try {
    // Simulate API call
    await createBooking(bookingData);
    
    // Show success notification
    notificationTitle.value = 'Booking Confirmed';
    notificationMessage.value = `Room ${props.roomId} booked for ${bookingData.date} from ${bookingData.timeFrom} to ${bookingData.timeTo}`;
    showSuccessNotification.value = true;
    
    // Update bookings list
    await fetchBookings();
    
  } catch (error) {
    // Show error notification
    errorMessage.value = error.message || 'An error occurred while creating the booking';
    showErrorNotification.value = true;
  }
};

// Notification handlers
const hideSuccessNotification = () => {
  showSuccessNotification.value = false;
};

const hideErrorNotification = () => {
  showErrorNotification.value = false;
};

// Mock API functions
const createBooking = async (bookingData) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Simulate success/failure
  if (Math.random() > 0.1) { // 90% success rate
    return {
      success: true,
      data: {
        id: Date.now(),
        ...bookingData
      }
    };
  } else {
    throw new Error('Unable to create booking. Please try again.');
  }
};

const fetchBookings = async () => {
  // Implementation for refreshing bookings list
};

const closeModal = () => {
  emit('close');
  // Reset form
  formData.value = {
    subject: '',
    date: new Date().toISOString().split('T')[0],
    timeFrom: '',
    timeTo: '',
    user: 'EIT Digital Master Students',
    repeat: 'Doesn\'t repeat'
  };
};
</script>

<style scoped>
:deep(.bx--modal-container) {
  max-width: 480px;
}

:deep(.bx--modal-content) {
  margin-bottom: 1rem;
}

:deep(.bx--dropdown__wrapper) {
  width: 100%;
}
</style>