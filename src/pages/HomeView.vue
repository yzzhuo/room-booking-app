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
        <div v-for="booking in upcomingBookings" :key="booking.room" class="p-4 border-solid border-2 border-gray-300 rounded">
          <h3 class="text-lg font-medium">{{ booking.title }}</h3>
          <p class="text-gray-600">Room {{ booking.room }} · {{ booking.date }}</p>
        </div>
      </div>
    </section>

    <!-- Available Rooms -->
    <section>
      <h2 class="text-xl font-semibold mb-4">Available Room</h2>
      <div class="border-2 border-gray-200 rounded p-4">
        <!-- Search -->
        <input 
          type="text" 
          placeholder="Search Here"
          class="w-full border-2 border-gray-200 rounded p-2 mb-4"
        >

        <!-- Filters -->
        <div class="flex gap-4 mb-4">
          <label class="flex items-center gap-2">
            <input 
              type="checkbox" 
              v-model="filters.projector"
            > Projector
          </label>
          <label class="flex items-center gap-2">
            <input 
              type="checkbox" 
              v-model="filters.whiteboard"
            > Whiteboard
          </label>
        </div>

        <!-- Room Grid -->
        <div class="grid grid-cols-3 gap-4">
          <div 
            v-for="room in rooms" 
            :key="room.id"
            class="border rounded p-4"
          >
            <div class="bg-gray-200 aspect-video mb-2">Image</div>
            <div class="flex justify-between">
              <div>
                <h3 class="font-medium">{{ room.name }}</h3>
                <p class="text-sm text-gray-600">Capacity: {{ room.capacity }}</p>
                <p class="text-sm text-gray-600">Floor {{ room.floor }}</p>
                <p class="text-sm text-gray-600 mb-2">Projector Available</p>
              </div>
              <CvButton
                @click="bookRoom(room.id)"
                kind="secondary"
                class="self-end"
              >
                Book
              </CvButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import ResourceCard from '../components/ResourceCard.vue';
import { CvButton } from '@carbon/vue';

const router = useRouter();

const upcomingBookings = ref([
  {
    title: 'Team Meeting',
    room: '275',
    date: 'Dec 9, 5 pm'
  }
]);

const rooms = ref([
  {
    id: 1,
    name: 'Conference A',
    capacity: 20,
    floor: 1,
    hasProjector: true,
    image: '/room-placeholder.jpg'
  },
  {
    id: 2,
    name: 'Conference A',
    capacity: 20,
    floor: 1,
    hasProjector: true,
    image: '/room-placeholder.jpg'
  },
  {
    id: 3,
    name: 'Conference A',
    capacity: 20,
    floor: 1,
    hasProjector: true,
    image: '/room-placeholder.jpg'
  }
]);

const filters = ref({
  projector: false,
  whiteboard: false
});

const openBookingModal = () => {
  // TODO: Implement booking modal
};

const bookRoom = (roomId) => {
  // TODO: Implement room booking
  router.push('/room');
};
</script>

<style scoped>
/* Add any component-specific styles here */
</style>