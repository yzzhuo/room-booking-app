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
                  <cv-data-table-cell>{{ booking.subject }}</cv-data-table-cell>
                  <cv-data-table-cell>
                    <div class="flex gap-2">
                      <button
                        @click="editBooking(booking)"
                        class="text-blue-600 hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        @click="openCancelModal(booking)"
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
                <cv-data-table-heading id="subject" heading="Subject" />
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
      :room-id="selectedBooking?.id"
      @close="closeEditModal"
      @save="saveBooking"
    />
    <CancelBookingModal
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
import bookingData from '../data/booking-info.json';
import roomData from '../data/room-info.json';

const selectedTab = ref('tab-upcoming');
const isEditModalOpen = ref(false);
const selectedBooking = ref(null);
const isCancelModalOpen = ref(false);

// Helper function to format time range
const formatTimeRange = (timeFrom, timeTo) => `${timeFrom} - ${timeTo}`;

// Transform bookings data to match the component's expected format
const transformBooking = (booking) => {
  const room = roomData.rooms.find(r => r.id === booking.roomId);
  return {
    id: booking.id,
    room: room.name,
    date: booking.date,
    time: formatTimeRange(booking.timeFrom, booking.timeTo),
    image: room.imageUrl,
    subject: booking.subject
  };
};
// Filter bookings by status
const upcomingBookings = computed(() => 
  bookingData.bookings
    .filter(booking => booking.status === 'upcoming')
    .map(transformBooking)
);

const pastBookings = computed(() => 
  bookingData.bookings
    .filter(booking => booking.status === 'past')
    .map(transformBooking)
);

const cancelledBookings = computed(() => 
  bookingData.bookings
    .filter(booking => booking.status === 'cancelled')
    .map(transformBooking)
);

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
    // Handle the booking cancellation
    console.log('Booking cancelled:', booking);
    // Refresh booking list or update UI as needed
  } catch (error) {
    console.error('Error:', error);
  }
};
</script>
