<!-- src/pages/RoomDetail.vue -->
<template>
  <div class="min-h-screen bg-gray-50">
    <main class="max-w-7xl mx-auto p-6">
      <!-- Breadcrumb -->
      <nav class="text-sm mb-6">
        <ol class="flex items-center space-x-2">
          <li><a href="#" class="text-blue-600 hover:underline">Home</a></li>
          <li class="text-gray-500">&gt;</li>
          <li><a href="#" class="text-blue-600 hover:underline">Room</a></li>
          <li class="text-gray-500">&gt;</li>
          <li class="text-gray-600">Group room 5</li>
        </ol>
      </nav>

      <!-- Room Info -->
      <div class="grid md:grid-cols-2 gap-8 mb-8">
        <div>
          <h2 class="text-2xl font-semibold mb-4">Room 275</h2>
          
          <div class="flex gap-6 mb-6">
            <div class="flex items-center gap-2">
              <GroupIcon32 class="w-5 h-5 text-gray-600" />
              <span>46 persons</span>
            </div>
            <div class="flex items-center gap-2">
              <TimeIcon32 class="w-5 h-5 text-green-600" />
              <span class="text-green-600">Available now</span>
            </div>
          </div>

          <div class="mb-6">
            <h3 class="font-semibold mb-3">Equipment</h3>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <div class="font-medium">Seats</div>
                <div class="text-gray-600">HDMI</div>
              </div>
              <div>
                <div class="font-medium">Table or tables</div>
                <div class="text-gray-600">Screen</div>
              </div>
            </div>
          </div>

          <div>
            <h3 class="font-semibold mb-3">Booking Details</h3>
            <ul class="text-sm text-gray-600 space-y-2">
              <li>You can make bookings 3 months in advance.</li>
              <li>The duration of the booking should be between 30 minutes - 3 hours.</li>
              <li>You can have up to one booking at a time.</li>
            </ul>
            <div class="mt-4 space-y-2">
              <button class="text-blue-600 hover:underline">Cancellation terms</button>
              <br>
              <button class="text-blue-600 hover:underline">Terms of Agreement</button>
            </div>
          </div>
        </div>

        <div class="bg-gray-100 rounded-lg">
          <img 
            src="" 
            alt="Room 275" 
            class="w-full h-full object-cover rounded-lg"
          />
        </div>
      </div>

      <!-- Bookings Section -->
      <section>
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-xl font-semibold">Bookings</h3>
          <div class="flex gap-4 items-center">
            <input 
              type="date" 
              v-model="selectedDate"
              class="border rounded px-3 py-2"
            >
            <button 
              @click="openBookingModal"
              class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Book
            </button>
          </div>
        </div>

        <!-- Bookings Table -->
        <div class="bg-white rounded-lg shadow overflow-hidden">
          <table class="w-full">
            <thead class="bg-gray-200">
              <tr>
                <th class="px-4 py-3 text-left">Room</th>
                <th class="px-4 py-3 text-left">Time</th>
                <th class="px-4 py-3 text-left">Subject</th>
                <th class="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="booking in bookings" :key="booking.id" class="border-t">
                <td class="px-4 py-3">{{ booking.room }}</td>
                <td class="px-4 py-3">{{ booking.time }}</td>
                <td class="px-4 py-3">
                  <div class="font-medium">{{ booking.subject }}</div>
                  <div class="text-sm text-gray-600">{{ booking.attendees }}</div>
                </td>
                <td class="px-4 py-3">
                  <div class="flex gap-2">
                    <button 
                      @click="editBooking(booking)"
                      class="text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
                    <button 
                      @click="deleteBooking(booking)"
                      class="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import GroupIcon32 from '@carbon/icons-vue/es/group/32';
import TimeIcon32 from '@carbon/icons-vue/es/time/32';


const selectedDate = ref(new Date().toISOString().split('T')[0]);

const bookings = ref([
  {
    id: 1,
    room: '279',
    time: '13:00 to 16:00',
    subject: 'Meeting',
    attendees: 'EIT Digital Master Students'
  },
  {
    id: 2,
    room: '275',
    time: '14:00 to 17:00',
    subject: 'Meeting',
    attendees: 'EIT Digital Master Students'
  },
  {
    id: 3,
    room: '215',
    time: '16:00 to 16:30',
    subject: 'Meeting',
    attendees: 'Roberto Lumbreras'
  },
  {
    id: 4,
    room: '249',
    time: '16:00 to 17:00',
    subject: 'Meeting',
    attendees: 'Elvira Moreno'
  },
  {
    id: 5,
    room: '215',
    time: '16:30 to 17:30',
    subject: '[Entrevista] Adrián Bellver',
    attendees: 'Andrea Iannetta'
  }
]);

const openBookingModal = () => {
  // Implement booking modal logic
  console.log('Opening booking modal');
};

const editBooking = (booking) => {
  // Implement edit logic
  console.log('Editing booking:', booking);
};

const deleteBooking = (booking) => {
  // Implement delete logic
  console.log('Deleting booking:', booking);
};
</script>