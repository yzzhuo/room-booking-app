<template>
  <div class="my-bookings">
    <h1>My Bookings</h1>
    <!-- Tabs for Upcoming, Past, and Cancelled -->

    
    <cv-tabs v-model:selected="selectedTab">
      <!-- Upcoming Tab -->
      <cv-tab id="tab-upcoming" label="Upcoming">
        <div class="tab-content">
          <div v-for="booking in upcomingBookings" :key="booking.id" class="booking-item">
            <cv-tile>
              <div class="tile-content">
                <img :src="booking.image" alt="Room Image" class="room-image" />
                <div class="details">
                  <h3>{{ booking.room }}</h3>
                  <p>{{ booking.date }} | {{ booking.time }}</p>
                </div>
                <div class="actions">
                  <cv-button size="small" kind="secondary" @click="editBooking(booking)">Edit</cv-button>
                  <cv-button size="small" kind="danger" @click="confirmCancel(booking)">Cancel</cv-button>
                </div>
              </div>
            </cv-tile>
          </div>
        </div>
      </cv-tab>

      <!-- Past Tab -->
      <cv-tab id="tab-past" label="Past">
        <div class="tab-content">
          <div v-for="booking in pastBookings" :key="booking.id" class="booking-item">
            <cv-tile>
              <div class="tile-content">
                <img :src="booking.image" alt="Room Image" class="room-image" />
                <div class="details">
                  <h3>{{ booking.room }}</h3>
                  <p>{{ booking.date }} | {{ booking.time }}</p>
                </div>
              </div>
            </cv-tile>
          </div>
        </div>
      </cv-tab>

      <!-- Cancelled Tab -->
      <cv-tab id="tab-cancelled" label="Cancelled">
        <div class="tab-content">
          <div v-for="booking in cancelledBookings" :key="booking.id" class="booking-item">
            <cv-tile>
              <div class="tile-content">
                <img :src="booking.image" alt="Room Image" class="room-image" />
                <div class="details">
                  <h3>{{ booking.room }}</h3>
                  <p>{{ booking.date }} | {{ booking.time }}</p>
                </div>
              </div>
            </cv-tile>
          </div>
        </div>
      </cv-tab>
    </cv-tabs>

    <!-- Edit Modal -->
    <cv-modal v-if="showEditModal" open modal-heading="Edit Booking">
      <p>Edit your booking details below:</p>
      <cv-text-input v-model="selectedBooking.room" label-text="Room Name"></cv-text-input>
      <cv-text-input v-model="selectedBooking.date" label-text="Date" type="date"></cv-text-input>
      <cv-text-input v-model="selectedBooking.time" label-text="Time"></cv-text-input>
      <cv-button kind="primary" @click="saveBooking">Save</cv-button>
      <cv-button kind="secondary" @click="closeEditModal">Cancel</cv-button>
    </cv-modal>

    <!-- Cancel Confirmation Modal -->
    <cv-modal v-if="showConfirmModal" open modal-heading="Cancel Booking">
      <p>Are you sure you want to cancel this booking?</p>
      <cv-button kind="danger" @click="cancelBooking">Yes, Cancel</cv-button>
      <cv-button kind="secondary" @click="closeConfirmModal">No</cv-button>
    </cv-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedTab: "tab-upcoming", // Default selected tab
      upcomingBookings: [
        {
          id: 1,
          room: "Room 275",
          date: "2025-01-15",
          time: "10:00 - 12:00",
          image: '/src/assets/meeting-room-1.jpeg',
        },
        {
          id: 2,
          room: "Room 300",
          date: "2025-01-16",
          time: "14:00 - 16:00",
          image: '/src/assets/meeting-room-2.jpeg',
        },
      ],
      pastBookings: [
        {
          id: 3,
          room: "Room 150",
          date: "2025-01-10",
          time: "09:00 - 10:00",
          image: '/src/assets/meeting-room-3.jpeg',
        },
      ],
      cancelledBookings: [
        {
          id: 4,
          room: "Room 100",
          date: "2025-01-09",
          time: "08:00 - 09:00",
          image: '/src/assets/meeting-room-4.jpeg',
        },
      ],
      showEditModal: false,
      showConfirmModal: false,
      selectedBooking: null,
    };
  },
  methods: {
    editBooking(booking) {
      this.selectedBooking = { ...booking };
      this.showEditModal = true;
    },
    saveBooking() {
      const index = this.upcomingBookings.findIndex((b) => b.id === this.selectedBooking.id);
      if (index !== -1) {
        this.upcomingBookings[index] = { ...this.selectedBooking };
      }
      this.closeEditModal();
    },
    closeEditModal() {
      this.showEditModal = false;
      this.selectedBooking = null;
    },
    confirmCancel(booking) {
      this.selectedBooking = booking;
      this.showConfirmModal = true;
    },
    cancelBooking() {
      this.cancelledBookings.push(this.selectedBooking);
      this.upcomingBookings = this.upcomingBookings.filter((b) => b.id !== this.selectedBooking.id);
      this.closeConfirmModal();
    },
    closeConfirmModal() {
      this.showConfirmModal = false;
      this.selectedBooking = null;
    },
  },
};
</script>

<style scoped>
.my-bookings {
  padding: 20px;
}
.tab-content {
  margin-top: 20px;
}
.booking-item {
  margin-bottom: 16px;
}
.tile-content {
  display: flex;
  align-items: center;
  gap: 16px;
}
.room-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
}
.details {
  flex-grow: 1;
}
.actions {
  display: flex;
  gap: 8px;
}
</style>
