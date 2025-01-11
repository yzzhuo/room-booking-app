<template>
  <div class="my-bookings">
    <h1 class="text-2xl font-semibold mb-4">My Bookings</h1>

    <!-- Tabs for Upcoming, Past, and Cancelled -->
    <cv-tabs v-model:selected="selectedTab">
      <!-- Upcoming Tab -->
      <cv-tab id="tab-upcoming" label="Upcoming">
        <section>
          <!-- Table for Upcoming Bookings -->
          <div class="bg-white rounded-lg shadow overflow-hidden">
            <cv-data-table>
              <template #headings>
                <cv-data-table-heading id="image" heading="Image" />
                <cv-data-table-heading id="time" heading="Time" />
                <cv-data-table-heading id="details" heading="Details" />
                <cv-data-table-heading id="actions" heading="Actions" />
              </template>
              <template #data>
                <cv-data-table-row
                  v-for="booking in upcomingBookings"
                  :id="booking.id"
                  :key="booking.id"
                >
                  <cv-data-table-cell>
                    <img
                      :src="booking.image"
                      alt="Room Image"
                      class="h-12 w-12 object-cover rounded-md"
                    />
                  </cv-data-table-cell>
                  <cv-data-table-cell>{{ booking.time }}</cv-data-table-cell>
                  <cv-data-table-cell>
                    <div>
                      <div class="font-semibold">{{ booking.room }}</div>
                      <div class="text-gray-600">{{ booking.date }}</div>
                    </div>
                  </cv-data-table-cell>
                  <cv-data-table-cell>
                    <div class="flex gap-2">
                      <button
                        @click="editBooking(booking)"
                        class="text-blue-600 hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        @click="confirmCancel(booking)"
                        class="text-red-600 hover:underline"
                      >
                        Cancel
                      </button>
                    </div>
                  </cv-data-table-cell>
                </cv-data-table-row>
              </template>
            </cv-data-table>
          </div>
        </section>
      </cv-tab>

      <!-- Repeat Similar Structure for Past and Cancelled Tabs -->
      <!-- Past Tab -->
      <cv-tab id="tab-past" label="Past">
        <section>
          <div class="bg-white rounded-lg shadow overflow-hidden">
            <cv-data-table>
              <template #headings>
                <cv-data-table-heading id="image" heading="Image" />
                <cv-data-table-heading id="time" heading="Time" />
                <cv-data-table-heading id="details" heading="Details" />
              </template>
              <template #data>
                <cv-data-table-row
                  v-for="booking in pastBookings"
                  :id="booking.id"
                  :key="booking.id"
                >
                  <cv-data-table-cell>
                    <img
                      :src="booking.image"
                      alt="Room Image"
                      class="h-12 w-12 object-cover rounded-md"
                    />
                  </cv-data-table-cell>
                  <cv-data-table-cell>{{ booking.time }}</cv-data-table-cell>
                  <cv-data-table-cell>
                    <div>
                      <div class="font-semibold">{{ booking.room }}</div>
                      <div class="text-gray-600">{{ booking.date }}</div>
                    </div>
                  </cv-data-table-cell>
                </cv-data-table-row>
              </template>
            </cv-data-table>
          </div>
        </section>
      </cv-tab>

      <!-- Cancelled Tab -->
      <cv-tab id="tab-cancelled" label="Cancelled">
        <section>
          <div class="bg-white rounded-lg shadow overflow-hidden">
            <cv-data-table>
              <template #headings>
                <cv-data-table-heading id="image" heading="Image" />
                <cv-data-table-heading id="time" heading="Time" />
                <cv-data-table-heading id="details" heading="Details" />
              </template>
              <template #data>
                <cv-data-table-row
                  v-for="booking in cancelledBookings"
                  :id="booking.id"
                  :key="booking.id"
                >
                  <cv-data-table-cell>
                    <img
                      :src="booking.image"
                      alt="Room Image"
                      class="h-12 w-12 object-cover rounded-md"
                    />
                  </cv-data-table-cell>
                  <cv-data-table-cell>{{ booking.time }}</cv-data-table-cell>
                  <cv-data-table-cell>
                    <div>
                      <div class="font-semibold">{{ booking.room }}</div>
                      <div class="text-gray-600">{{ booking.date }}</div>
                    </div>
                  </cv-data-table-cell>
                </cv-data-table-row>
              </template>
            </cv-data-table>
          </div>
        </section>
      </cv-tab>
    </cv-tabs>

    <!-- Booking Modal -->
    <BookingModal
      :is-open="isEditModalOpen"
      :room-id="selectedBooking?.id"
      @close="closeEditModal"
      @save="saveBooking"
    />
  </div>
</template>


<script setup>
import { ref } from 'vue';
import { CvDataTable } from '@carbon/vue';
import BookingModal from '../components/BookingModal.vue';

const selectedTab = ref('tab-upcoming');
const isEditModalOpen = ref(false);
const selectedBooking = ref(null);

const upcomingBookings = ref([
  { id: 1, room: 'Room 275', date: '2025-01-15', time: '10:00 - 12:00', image: '/src/assets/meeting-room-1.jpeg' },
  { id: 2, room: 'Room 300', date: '2025-01-16', time: '14:00 - 16:00', image: '/src/assets/meeting-room-2.jpeg' },
  { id: 3, room: 'Room 150', date: '2025-01-20', time: '09:00 - 10:00', image: '/src/assets/meeting-room-3.jpeg' },
  { id: 4, room: 'Room 400', date: '2025-01-22', time: '08:30 - 09:30', image: '/src/assets/meeting-room-4.jpeg' },
  { id: 5, room: 'Room 450', date: '2025-01-25', time: '12:00 - 13:00', image: '/src/assets/meeting-room-1.jpeg' },
  { id: 6, room: 'Room 500', date: '2025-01-28', time: '14:00 - 15:30', image: '/src/assets/meeting-room-2.jpeg' },
]);

const pastBookings = ref([
  { id: 7, room: 'Room 150', date: '2025-01-10', time: '09:00 - 10:00', image: '/src/assets/meeting-room-3.jpeg' },
  { id: 8, room: 'Room 180', date: '2025-01-08', time: '10:30 - 11:30', image: '/src/assets/meeting-room-4.jpeg' },
  { id: 9, room: 'Room 190', date: '2025-01-06', time: '12:30 - 13:30', image: '/src/assets/meeting-room-1.jpeg' },
  { id: 10, room: 'Room 200', date: '2025-01-04', time: '15:00 - 16:00', image: '/src/assets/meeting-room-2.jpeg' },
]);

const cancelledBookings = ref([
  { id: 11, room: 'Room 100', date: '2025-01-09', time: '08:00 - 09:00', image: '/src/assets/meeting-room-3.jpeg' },
  { id: 12, room: 'Room 220', date: '2025-01-07', time: '11:00 - 12:00', image: '/src/assets/meeting-room-4.jpeg' },
  { id: 13, room: 'Room 230', date: '2025-01-05', time: '13:00 - 14:00', image: '/src/assets/meeting-room-1.jpeg' },
  { id: 14, room: 'Room 240', date: '2025-01-03', time: '15:30 - 16:30', image: '/src/assets/meeting-room-2.jpeg' },
]);

const editBooking = (booking) => {
  selectedBooking.value = booking;
  isEditModalOpen.value = true;
};

const closeEditModal = () => {
  isEditModalOpen.value = false;
  selectedBooking.value = null;
};

const saveBooking = (updatedBooking) => {
  const index = upcomingBookings.value.findIndex((b) => b.id === updatedBooking.id);
  if (index !== -1) {
    upcomingBookings.value[index] = updatedBooking;
  }
  closeEditModal();
};

const confirmCancel = (booking) => {
  console.log('Cancelling:', booking);
};
</script>
