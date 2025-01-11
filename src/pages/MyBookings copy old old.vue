<template>

<div>
    <h1>Testing bx-tabs</h1>
    <bx-tabs>
      <bx-tab label="Tab 1">Content for Tab 1</bx-tab>
      <bx-tab label="Tab 2">Content for Tab 2</bx-tab>
    </bx-tabs>
  </div>
  
  <!-- class="mybookings" -->
    <div class="mybookings" >
      <!-- Tabs for Upcoming, Past, Cancelled -->
      <bx-tabs>
        <bx-tab label="Upcoming" :selected="true">
          <div v-for="booking in upcomingBookings" :key="booking.id" class="booking-card">
            <bx-card>
              <template #content>
                <div class="card-content">
                  <img :src="booking.image" alt="Room Image" class="room-image" />
                  <div class="booking-details">
                    <h3>{{ booking.room }}</h3>
                    <p>{{ booking.date }} {{ booking.time }}</p>
                  </div>
                  <div class="booking-actions">
                    <bx-button kind="tertiary" size="sm" @click="editBooking(booking)">Edit</bx-button>
                    <bx-button kind="danger" size="sm" @click="confirmCancel(booking)">Cancel</bx-button>
                  </div>
                </div>
              </template>
            </bx-card>
          </div>
        </bx-tab>
  
        <bx-tab label="Past">
          <div v-for="booking in pastBookings" :key="booking.id" class="booking-card">
            <bx-card>
              <template #content>
                <div class="card-content">
                  <img :src="booking.image" alt="Room Image" class="room-image" />
                  <div class="booking-details">
                    <h3>{{ booking.room }}</h3>
                    <p>{{ booking.date }} {{ booking.time }}</p>
                  </div>
                </div>
              </template>
            </bx-card>
          </div>
        </bx-tab>
  
        <bx-tab label="Cancelled">
          <div v-for="booking in cancelledBookings" :key="booking.id" class="booking-card">
            <bx-card>
              <template #content>
                <div class="card-content">
                  <img :src="booking.image" alt="Room Image" class="room-image" />
                  <div class="booking-details">
                    <h3>{{ booking.room }}</h3>
                    <p>{{ booking.date }} {{ booking.time }}</p>
                  </div>
                </div>
              </template>
            </bx-card>
          </div>
        </bx-tab>
      </bx-tabs>
  
      <!-- Edit Modal -->
      <bx-modal
        v-if="showEditModal"
        :open="true"
        modal-heading="Edit Booking"
        size="sm"
      >
        <div>
          <p>Edit your booking details here.</p>
          <!-- Add form fields for editing the booking -->
        </div>
        <div slot="footer">
          <bx-button kind="secondary" @click="closeEditModal">Close</bx-button>
          <bx-button kind="primary">Save Changes</bx-button>
        </div>
      </bx-modal>
  
      <!-- Confirm Cancel Modal -->
      <bx-modal
        v-if="showConfirmModal"
        :open="true"
        modal-heading="Cancel Booking"
        size="sm"
      >
        <div>
          <p>Are you sure you want to cancel this booking?</p>
        </div>
        <div slot="footer">
          <bx-button kind="danger" @click="cancelBooking">Yes, Cancel</bx-button>
          <bx-button kind="secondary" @click="closeConfirmModal">No</bx-button>
        </div>
      </bx-modal>
    </div>
  </template>
  
  <script>
  export default {
    name: 'MyBookings',
    mounted() {
  console.log('MyBookings component is loaded!');
},

    data() {
      return {
        upcomingBookings: [
          {
            id: 1,
            room: "Room 275",
            date: "Sat 12/09/2024",
            time: "15:00 - 17:00",
            image: "image-url",
          },
        ],
        pastBookings: [],
        cancelledBookings: [],
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
        this.selectedBooking = null;
      },
      confirmCancel(booking) {
        this.selectedBooking = booking;
        this.showConfirmModal = true;
      },
      closeConfirmModal() {
        this.showConfirmModal = false;
        this.selectedBooking = null;
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
  .mybookings {
    padding: 20px;
  }
  .booking-card {
    margin-bottom: 16px;
  }
  .card-content {
    display: flex;
    align-items: center;
    gap: 16px;
  }
  .room-image {
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 8px;
  }
  .booking-details {
    flex-grow: 1;
  }
  .booking-actions {
    display: flex;
    gap: 8px;
  }
  </style>
  