<!-- src/pages/RoomDetail.vue -->
<template>
  <div class="min-h-screen bg-gray-50">
    <main class="max-w-7xl mx-auto p-6" v-if="room">
      <!-- Breadcrumb -->
      <cv-breadcrumb class="mb-6">
        <cv-breadcrumb-item>Home</cv-breadcrumb-item>
        <cv-breadcrumb-item>Room</cv-breadcrumb-item>
        <cv-breadcrumb-item>{{ room.name }}</cv-breadcrumb-item>
      </cv-breadcrumb>

      <!-- Room Info -->
      <div class="grid md:grid-cols-2 gap-8 mb-8">
        <div>
          <h2 class="text-2xl font-semibold mb-4">{{ room.name }}</h2>
          
          <div class="flex gap-6 mb-6">
            <div class="flex items-center gap-2">
              <GroupIcon32 class="w-5 h-5 text-gray-600" />
              <span>{{ room.capacity }} persons</span>
            </div>
            <div role="list">
              <cv-tag label="Available now" kind="green"/>
            </div>
          </div>

          <div class="mb-6">
            <h3 class="font-semibold mb-3">Equipment</h3>
            <div>
              {{ room.amenities.join(', ') }}
            </div>
          </div>

          <div>
            <h3 class="font-semibold mb-3">Details</h3>
            <cv-accordion>
              <cv-accordion-item title="Booking Details">
                <template v-slot:title>Booking Instructions</template>
                <template v-slot:content>
                  <ul class="text-sm text-gray-600 space-y-2">
                    <li>You can make bookings 2 weeks in advance.</li>
                    <li>The duration of the booking should be between 30 minutes - 3 hours.</li>
                    <li>You can have up to one booking at a time.</li>
                  </ul>
                </template>
              </cv-accordion-item>
              <cv-accordion-item title="Cancellation terms">
                <template v-slot:title>Cancellation terms</template>
                <template v-slot:content>
                  <p class="text-sm text-gray-600">Cancellations must be made at least 24 hours prior to the booking time to avoid a cancellation fee.</p>
                </template>
              </cv-accordion-item>
              <cv-accordion-item title="Terms of Agreement">
                <template v-slot:title>Terms of Agreement</template>
                <template v-slot:content>
                  <cv-list >
                    <cv-list-item>The room is to be used solely for professional purposes, including meetings and video conferencing.</cv-list-item>
                    <cv-list-item>Users are responsible for leaving the room in the same condition as they found it. Any damage or excessive cleaning required will result in additional charges.</cv-list-item>
                    <cv-list-item>Users must comply with all on-site policies and instructions provided by staff.</cv-list-item>
                  </cv-list>
                </template>
              </cv-accordion-item>
            </cv-accordion>
          </div>
        </div>

        <div class="bg-gray-100 rounded-lg">
          <img 
            :src="room.imageUrl" 
            :alt="room.name" 
            class="w-full object-cover rounded-lg"
          />
        </div>
      </div>

      <!-- Bookings Section -->
      <section>
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-xl font-semibold">Bookings</h3>
          <div class="flex gap-4">
            <!-- Date Picker Issue: Role="datepicker" is not a valid ARIA role, pattern use 'combo' instead -->
            <cv-date-picker kind="single" v-model="selectedDate" :cal-options="calOptions">
            </cv-date-picker>
            <cv-button class="self-end" @click="openBookingModal" aria-label="Booking button" default="Book" size="field">Book</cv-button>
          </div>
        </div>

        <!-- Bookings Table -->
        <div class="bg-white rounded-lg shadow overflow-hidden">
          <cv-data-table>
            <template #headings>
              <cv-data-table-heading id="time" heading="Time"/>
              <cv-data-table-heading id="subject" heading="Subject"/>
              <cv-data-table-heading id="sb-standard" heading="Reserver" />
            </template>
            <template #data>
              <cv-data-table-row v-for="row in bookings" :id="`${row.id}`" :key="row.time" :value="row.name">
                <cv-data-table-cell>{{`${row.timeFrom} to ${row.timeTo}`}} </cv-data-table-cell>
                <cv-data-table-cell>
                  <div>
                    <div class="font-semibold">{{row.subject}}</div>
                  </div>
                </cv-data-table-cell>
                <cv-data-table-cell>
                  {{row.attendees}}
                </cv-data-table-cell>
              </cv-data-table-row>
            </template>
          </cv-data-table>
        </div>
      </section>
    </main>
    <BookingModal
      :is-open="isBookingModalOpen"
      :booking="{
        date: selectedDate
      }"
      @close="closeBookingModal"
      @save="handleBookingCreate"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import GroupIcon32 from '@carbon/icons-vue/es/group/32';
import roomInfo from '../data/room-info.json';
import { CvDataTable } from '@carbon/vue';
import BookingModal from '../components/BookingModal.vue';
import userInfo from '../data/user-info.json';
import { useNotificationStore } from '../stores/notificationStore';

const notificationStore = useNotificationStore();
const route = useRoute();
const room = ref(null);
const isBookingModalOpen = ref(false);
const bookings = ref([]);

const now = new Date();
const nextWeek = new Date();
nextWeek.setDate(now.getDate() + 14);
const calOptions = ref({
  minDate: now,
  maxDate: nextWeek,
  dateFormat: 'Y-m-d'
})

const getRandomBookings = () => {
  const randomIndex = Math.floor(Math.random() * roomInfo.default_room_bookings.length);
  return roomInfo.default_room_bookings[randomIndex];
}

onMounted(() => {
  const roomId = parseInt(route.params.id);
  room.value = roomInfo.rooms.find(r => `${r.id}` == `${roomId}`)
  bookings.value = getRandomBookings();
});

const selectedDate = ref(now);

watch(selectedDate, () => {
  bookings.value = getRandomBookings();
});
const openBookingModal = () => {
  isBookingModalOpen.value = true;
};

const closeBookingModal = () => {
  isBookingModalOpen.value = false;
};

const handleBookingCreate = (booking) => {
  // Add the new booking to the list
  bookings.value.push({
    ...booking,
    attendees: userInfo.currentUser.name
  });
  notificationStore.addNotification('Booking created successfully', 'success');
  closeBookingModal();
};

</script>