<!-- src/components/BookingModal.vue -->
<template>
  <cv-modal
    :visible="isOpen"
    @modal-hidden="closeModal"
    @primary-click="handleCreate"
    @secondary-click="closeModal"
    :size="'sm'"
    ariaLabel="Booking detail modal"
  >
    <template #label>New reservation</template>
    <template v-slot:title>Room Booking</template>
    <template #content>
      <cv-form class="space-y-6">
        <!-- Subject -->
        <cv-form-item>
          <cv-text-input
            data-modal-primary-focus
            v-model="formData.subject"
            label="Subject"
            placeholder="Meeting"
          />
        </cv-form-item>

        <!-- Date -->
        <cv-form-item>
          <cv-date-picker
            v-model="formData.date"
            label="Date"
            kind="single"
            :calOptions="{
              dateFormat: 'Y-m-d',
            }"
          />
        </cv-form-item>

        <!-- Time Range -->
        <div class="grid grid-cols-2 gap-4">
          <cv-form-item>
            <cv-time-picker
              v-model:time="formData.timeFrom"
              label="From"
              ampm="24"
            />
          </cv-form-item>
          <cv-form-item>
            <cv-time-picker
              v-model:time="formData.timeTo"
              label="To"
              ampm="24"
            />
          </cv-form-item>
        </div>
        <cv-inline-notification v-if="showErrorNotification" kind="error"  @close="onCloseError" :subTitle="errorMessage" />
      </cv-form>
    </template>

    <template #primary-button>
      Save
    </template>

    <template #secondary-button>
      Cancel
    </template>
  </cv-modal>
</template>

<script setup>
import { ref, watch } from 'vue';
import dayjs from 'dayjs';

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  },
  booking: {
    type: Object,
    required: false
  }
});

const emit = defineEmits(['close', 'save']);
const formData = ref({
    subject: props.booking?.subject || '',
    date: props.booking?.date ||  new Date(),
    timeFrom: props.booking?.timeFrom || '',
    timeTo:  props.booking?.timeTo || '',
});

watch(() =>  props.booking, (newValue) => {
  if (newValue) {
    formData.value = {
      subject: newValue.subject || '',
      date: newValue.date || new Date(),
      timeFrom: newValue.timeFrom || '',
      timeTo: newValue.timeTo || '',
    };
  }
}, { deep: true });

// Notification states
const showErrorNotification = ref(false);
const errorMessage = ref('');

const validateTimeFormat = (time) => {
  return time.match(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/);
};
const validateTime = () => {
  // time should be pattern like HH:mm and should not be empty
  if (!formData.value.timeFrom || !formData.value.timeTo
    || !validateTimeFormat(formData.value.timeFrom) || !validateTimeFormat(formData.value.timeTo)
  ) return 'Please enter a valid time';
  
  const timeFrom = dayjs(`${formData.value.date} ${formData.value.timeFrom}`, 'YYYY-MM-DD HH:mm');
  const timeTo = dayjs(`${formData.value.date} ${formData.value.timeTo}`, 'YYYY-MM-DD HH:mm');
  // timeTo should not be earlier than timeFrom using dayjs
  if (!timeTo.isAfter(timeFrom)) {
    return 'End time cannot be earlier than start time';
  }
  
  return '';
};

const validateSubject = () => {
  if (!formData.value.subject) return 'Please enter a subject';
  return '';
};

const valudateDate = () => {
  if (!formData.value.date) return 'Please enter a date';
  return '';
}

const validateForm =() => {
  // validate form item and return the error message
  return validateSubject() || valudateDate() ||  validateTime()
};

const handleCreate = async () => {
  // validate form
  const error = validateForm();
  if (error) {
    errorMessage.value = error;
    showErrorNotification.value = true;
    return;
  }
  emit('save', formData.value);

};

const onCloseError = () => {
  showErrorNotification.value = false;
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
  errorMessage.value = '';
  showErrorNotification.value = false;
};
</script>

<style scoped>

</style>