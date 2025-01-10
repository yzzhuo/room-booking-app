<template>
    <div class="my-bookings">
      <h1>My Bookings</h1>
      <bx-tabs>
        <!-- Tab: Upcoming -->
        <bx-tab label="Upcoming" :selected="true">
          <div class="tab-content">
            <div v-for="booking in upcomingBookings" :key="booking.id" class="booking-item">
              <bx-tile>
                <h3>{{ booking.room }}</h3>
                <p>{{ booking.date }} | {{ booking.time }}</p>
                <bx-btn kind="secondary" @click="editBooking(booking)">Edit</bx-btn>
                <bx-btn kind="danger" @click="confirmCancel(booking)">Cancel</bx-btn>
              </bx-tile>
            </div>
          </div>
        </bx-tab>
  
        <!-- Tab: Past -->
        <bx-tab label="Past">
          <div class="tab-content">
            <div v-for="booking in pastBookings" :key="booking.id" class="booking-item">
              <bx-tile>
                <h3>{{ booking.room }}</h3>
                <p>{{ booking.date }} | {{ booking.time }}</p>
              </bx-tile>
            </div>
          </div>
        </bx-tab>
  
        <!-- Tab: Cancelled -->
        <bx-tab label="Cancelled">
          <div class="tab-content">
            <div v-for="booking in cancelledBookings" :key="booking.id" class="booking-item">
              <bx-tile>
                <h3>{{ booking.room }}</h3>
                <p>{{ booking.date }} | {{ booking.time }}</p>
              </bx-tile>
            </div>
          </div>
        </bx-tab>
      </bx-tabs>
  
      <!-- Edit Modal -->
      <bx-modal v-if="showEditModal" open modal-heading="Edit Booking">
        <p>Edit your booking details here.</p>
        <!-- Add fields for editing -->
        <bx-btn kind="primary" @click="closeEditModal">Save</bx-btn>
        <bx-btn kind="secondary" @click="closeEditModal">Cancel</bx-btn>
      </bx-modal>
  
      <!-- Cancel Confirm Modal -->
      <bx-modal v-if="showConfirmModal" open modal-heading="Cancel Booking">
        <p>Are you sure you want to cancel this booking?</p>
        <bx-btn kind="danger" @click="cancelBooking">Yes, Cancel</bx-btn>
        <bx-btn kind="secondary" @click="closeConfirmModal">No</bx-btn>
      </bx-modal>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        upcomingBookings: [
          { id: 1, room: "Room A", date: "2025-01-15", time: "10:00 - 11:00" },
          { id: 2, room: "Room B", date: "2025-01-16", time: "12:00 - 13:00" },
        ],
        pastBookings: [
          { id: 3, room: "Room C", date: "2025-01-10", time: "14:00 - 15:00" },
        ],
        cancelledBookings: [
          { id: 4, room: "Room D", date: "2025-01-09", time: "16:00 - 17:00" },
        ],
        showEditModal: false,
        showConfirmModal: false,
        selectedBooking: null,
      };
    },
    methods: {
      editBooking(booking) {
        this.selectedBooking = booking;
        this.showEditModal = true;
      },
      closeEditModal() {
        this.showEditModal = false;
      },
      confirmCancel(booking) {
        this.selectedBooking = booking;
        this.showConfirmModal = true;
      },
      closeConfirmModal() {
        this.showConfirmModal = false;
      },
      cancelBooking() {
        this.cancelledBookings.push(this.selectedBooking);
        this.upcomingBookings = this.upcomingBookings.filter(
          (b) => b.id !== this.selectedBooking.id
        );
        this.closeConfirmModal();
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
  </style>
  