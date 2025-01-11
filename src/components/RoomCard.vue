<template>
  <cv-tile class="border rounded pt-2 bg-white flex flex-col">
    <img class="aspect-video" :src="room.imageUrl" alt="Room Image">
    <div class="flex justify-between mt-4 flex-1">
      <div>
        <h3 class="font-medium">{{ room.name }}</h3>
        <p class="text-sm text-gray-600">Capacity: {{ room.capacity }}</p>
        <p class="text-sm text-gray-600">Floor {{ room.floor }}</p>
        <p class="text-sm text-gray-600 mb-2">Amenities: {{ room.amenities.join(', ') }}</p>
      </div>
      <CvButton
        @click="bookRoom(room.id)"
        kind="secondary"
        class="self-end"
      >
        Book
      </CvButton>
    </div>
  </cv-tile>
</template>

<script setup>
import { CvButton } from '@carbon/vue';
import { useRouter } from 'vue-router';
const router = useRouter();

defineProps({
  room: {
    type: Object,
    required: true
  }
});

const bookRoom = (roomId) => {
  router.push({
    name: 'room',
    params: { id: roomId }
  });
};
</script>
