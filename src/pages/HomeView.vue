<template>
  <main class="p-6">
    <!-- Quick Actions -->
    <section class="mb-8">
      <h2 class="text-2xl font-semibold mb-4">Quick Actions</h2>
      <div class="border-solid border-2 border-gray-100 rounded flex gap-4">
        <ResourceCard class="flex-1" title="Booking a Room" link="/rooms" />
        <ResourceCard class="flex-1" title="View My Bookings" link="/bookings" />
      </div>
    </section>
    <!-- Upcoming Bookings -->
    <section class="mb-8">
      <h2 class="text-xl font-semibold mb-4">Upcoming Bookings</h2>
      <div class="rounded">
        <cv-tile v-for="booking in upcomingBookings" :key="booking.room" class="mt-2 bg-white">
          <h3 class="text-lg font-medium">{{ booking.subject }}</h3>
          <p class="text-gray-600">{{ booking.room }} · {{ booking.location }} ·  {{ booking.date }}, {{ booking.time }}</p>
        </cv-tile>
      </div>
    </section>

    <!-- Available Rooms -->
    <section>
      <h2 class="text-xl font-semibold mb-4">Your Most Booked Rooms</h2>
      <div class="border-2 border-gray-200 rounded p-0">
        <!-- Room Grid -->
        <div class="grid grid-cols-3 gap-4">
          <RoomCard
            v-for="room in rooms" 
            :key="room.id"
            :room="room"
          />
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import ResourceCard from '../components/ResourceCard.vue';
import RoomCard from '../components/RoomCard.vue';
import roomInfo from '../data/room-info.json';
import bookingInfo from '../data/booking-info.json';

// Transform bookings data to match the component's expected format
const transformBooking = (booking) => {
  const room = roomInfo.rooms.find(r => r.id === booking.roomId);
  return {
    id: booking.id,
    room: room.name,
    date: booking.date,
    time: `${booking.timeFrom} ~ ${booking.timeTo}`,
    image: room.imageUrl,
    subject: booking.subject,
    location: `Floor ${room.floor}`,
  };
};

const upcomingBookings = ref(bookingInfo.bookings
.filter(booking => booking.status === 'upcoming')
.map(transformBooking)
);

const rooms = ref(roomInfo.rooms.filter(room => roomInfo.favourite_rooms.includes(room.id)));

</script>

<style scoped>
/* Add any component-specific styles here */
</style>