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
      <div class="rounded p-4">
        <cv-tile v-for="booking in upcomingBookings" :key="booking.room" class="p-4 bg-white">
          <h3 class="text-lg font-medium">{{ booking.title }}</h3>
          <p class="text-gray-600">Room {{ booking.room }} · {{ booking.date }}</p>
        </cv-tile>
      </div>
    </section>

    <!-- Available Rooms -->
    <section>
      <h2 class="text-xl font-semibold mb-4">Frenquent Booking Room</h2>
      <div class="border-2 border-gray-200 rounded p-0">
        <!-- Room Grid -->
        <div class="grid grid-cols-3 gap-4">
          <RoomCard
            v-for="room in rooms" 
            :key="room.id"
            :room="room"
            @book="bookRoom"
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

const router = useRouter();

const upcomingBookings = ref([
  {
    title: 'Team Meeting',
    room: '275',
    date: 'Dec 9, 5 pm'
  }
]);

const rooms = ref(roomInfo.rooms.filter(room => roomInfo.favourite_rooms.includes(room.id)));

const bookRoom = (roomId) => {
  // TODO: Implement room booking
  router.push('/room');
};
</script>

<style scoped>
/* Add any component-specific styles here */
</style>