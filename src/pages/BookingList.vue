<template>
  <div class="my-bookings">
    <h1 class="text-2xl font-semibold mb-4">My Bookings</h1>

    <!-- Tabs for Upcoming, Past, and Cancelled -->
    <cv-tabs v-model:selected="selectedTab">
      <!-- Upcoming Tab -->
      <cv-tab id="tab-upcoming" label="Upcoming">
        <section>
          <div class="bg-white rounded-lg shadow overflow-hidden">
            <cv-data-table>
              <template #headings>
                <cv-data-table-heading id="image" heading="Image" />
                <cv-data-table-heading id="time" heading="Time" />
                <cv-data-table-heading id="details" heading="Details" />
                <cv-data-table-heading id="subject" heading="Subject" />
                <cv-data-table-heading id="actions" heading="Actions" />
              </template>
              <template #data>
                <cv-data-table-row
                  v-for="booking in upcomingBookings"
                  :id="`${booking.id}`" 
                  :key="booking.id"
                >
                  <cv-data-table-cell>
                    <img
                      :src="booking.image"
                      alt="Room Image"
                      class="h-12 w-12 object-cover rounded-md"
                    />
                  </cv-data-table-cell>
                  <cv-data-table-cell>{{ booking.timeFrom }} - {{ booking.timeTo }}</cv-data-table-cell>
                  <cv-data-table-cell>
                    <div>
                      <div class="font-semibold">{{ booking.room }}</div>
                      <div class="text-gray-600">{{ booking.date }}</div>
                    </div>
                  </cv-data-table-cell>
                  <cv-data-table-cell>{{ booking.subject }}</cv-data-table-cell>
                  <cv-data-table-cell>
                    <div class="flex">
                      <cv-button
                        @click="editBooking(booking)"
                        kind="ghost"
                      >
                        Edit
                      </cv-button>
                      <cv-button
                        kind="danger--ghost"
                        @click="openCancelModal(booking)"
                      >
                        Cancel
                      </cv-button>
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
                <cv-data-table-heading id="subject" heading="Subject" />
              </template>
              <template #data>
                <cv-data-table-row
                  v-for="booking in pastBookings"
                  :id="`${booking.id}`" 
                  :key="booking.id"
                >
                  <cv-data-table-cell>
                    <img
                      :src="booking.image"
                      alt="Room Image"
                      class="h-12 w-12 object-cover rounded-md"
                    />
                  </cv-data-table-cell>
                  <cv-data-table-cell>{{ booking.timeFrom }} - {{ booking.timeTo }}</cv-data-table-cell>
                  <cv-data-table-cell>
                    <div>
                      <div class="font-semibold">{{ booking.room }}</div>
                      <div class="text-gray-600">{{ booking.date }}</div>
                    </div>
                  </cv-data-table-cell>
                  <cv-data-table-cell>{{ booking.subject }}</cv-data-table-cell>
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
                <cv-data-table-heading id="subject" heading="Subject" />
              </template>
              <template #data>
                <cv-data-table-row
                  v-for="booking in cancelledBookings"
                  :id="`${booking.id}`"
                  :key="booking.id"
                >
                  <cv-data-table-cell>
                    <img
                      :src="booking.image"
                      alt="Room Image"
                      class="h-12 w-12 object-cover rounded-md"
                    />
                  </cv-data-table-cell>
                  <cv-data-table-cell>{{ booking.timeFrom }} - {{ booking.timeTo }}</cv-data-table-cell>
                  <cv-data-table-cell>
                    <div>
                      <div class="font-semibold">{{ booking.room }}</div>
                      <div class="text-gray-600">{{ formatDate(booking.date) }}</div>
                    </div>
                  </cv-data-table-cell>
                  <cv-data-table-cell>{{ booking.subject }}</cv-data-table-cell>
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
      :booking="selectedBooking"
      @close="closeEditModal"
      @save="saveBooking"
    />
    <CancelBookingModal
      v-if="isCancelModalOpen"
      :is-open="isCancelModalOpen"
      :booking="selectedBooking"
      @close="closeCancelModal"
      @confirm="handleBookingCancel"
    />
  </div>
</template>


<script setup>
import { ref, computed } from 'vue';
import { CvDataTable } from '@carbon/vue';
import BookingModal from '../components/BookingModal.vue';
import CancelBookingModal from '../components/CancelBookingModal.vue';
import bookingDataRaw from '../data/booking-info.json';
import roomData from '../data/room-info.json';
import dayjs from 'dayjs';
import { useNotificationStore } from '../stores/notificationStore';
const notificationStore = useNotificationStore();

const bookingData = ref(bookingDataRaw);
const selectedTab = ref('tab-upcoming');
const isEditModalOpen = ref(false);
const selectedBooking = ref(null);
const isCancelModalOpen = ref(false);

const formatDate = (dateString) => {
  return dayjs(dateString).format('YYYY-MM-DD');
};

// Transform bookings data to match the component's expected format
const transformBooking = (booking) => {
  const room = roomData.rooms.find(r => r.id === booking.roomId);
  return {
    ...booking,
    id: booking.id,
    room: room.name,
    date: booking.date,
    image: room.imageUrl,
    subject: booking.subject
  };
};
// Filter bookings by status
const upcomingBookings = computed(() => 
  bookingData.value.bookings
    .filter(booking => booking.status === 'upcoming')
    .map(transformBooking)
);

const pastBookings = computed(() => 
  bookingData.value.bookings
    .filter(booking => booking.status === 'past')
    .map(transformBooking)
);

const cancelledBookings = computed(() => 
  bookingData.value.bookings
    .filter(booking => booking.status === 'cancelled')
    .map(transformBooking)
);

const editBooking = (booking) => {
  selectedBooking.value = booking;
  console.log('editBooking', selectedBooking.value)
  isEditModalOpen.value = true;
};

const closeEditModal = () => {
  isEditModalOpen.value = false;
  selectedBooking.value = null;
};

const saveBooking = (updatedBooking) => {
  // Find and update the booking in the source data
  const bookingIndex = bookingData.value.bookings.findIndex((b) => b.id === updatedBooking.id);
  if (bookingIndex !== -1) {
    // Update the source data instead of the computed property
    bookingData.value.bookings[bookingIndex] = {
      ...bookingData.value.bookings[bookingIndex],
      ...updatedBooking,
      date: formatDate(updatedBooking.date),
    };
  }
  notificationStore.addNotification('Booking updated successfully', 'success');
  closeEditModal();
};

const openCancelModal = (booking) => {
  selectedBooking.value = booking;
  isCancelModalOpen.value = true;
};

const closeCancelModal = () => {
  isCancelModalOpen.value = false;
  selectedBooking.value = null;
};

const handleBookingCancel = async (booking) => {
  try {
    // remove the booking from the source data
    bookingData.value.bookings = bookingData.value.bookings.filter(b => b.id !== booking.id);
    notificationStore.addNotification('Booking cancelled successfully', 'success');
    closeCancelModal();
  } catch (error) {
    console.error('Error:', error);
  }
};
</script>
