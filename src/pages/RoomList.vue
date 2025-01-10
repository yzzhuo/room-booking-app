<template>
    <section>
      <h2 class="text-xl font-semibold mb-4">Available Room</h2>
      <div class="border-2 border-gray-200 rounded p-4">
        <div class="filters">
            <!-- Search -->
            <div class="filter">
            <label for="search">Search:</label>
            <input 
            type="text" 
            id="search"
            v-model="searchQuery"
            placeholder="Search Here"
            class="w-full border-2 border-gray-200 rounded p-2 mb-4"
            >
            </div>

            <!-- Other Filters -->
            <div class="filter">
                <div class="flex gap-4 mb-4">
                    <label for="amenities">Amenities:</label>
                        <div v-for="(amenity, index) in allAmenities" :key="index">
                        <input type="checkbox" :id="'amenity_' + index" :value="amenity" v-model="selectedAmenities">
                        <label :for="'amenity_' + index" class="w-full border-2 border-gray-200 rounded p-2 mb-4">{{ amenity }}</label>
                        </div>
                </div>
            </div>
            <div class="filter">
                <div class="w-full border-2 border-gray-200 rounded p-2 mb-4">
                    <cv-select
                        @change="onChange"
                        label="Capacity"
                        light="true"
                        id="capacity" 
                        v-model="selectedCapacity"
                        >
                        <cv-select-option disabled selected hidden value="placeholder-item">Choose an option</cv-select-option>
                        <cv-select-option v-for="capacity in capacities" :key="capacity" :value="capacity">{{ capacity }}</cv-select-option>
                    </cv-select>
                </div>
            </div>
            <div class="filter">
                <div class="w-full border-2 border-gray-200 rounded p-2 mb-4">
                    <cv-select
                        @change="onChange"
                        label="Floor"
                        light="true"
                        id="floor" 
                        v-model="selectedFloor"
                        >
                        <cv-select-option disabled selected hidden value="placeholder-item">Choose an option</cv-select-option>
                        <cv-select-option v-for="floor in floors" :key="floor" :value="floor">{{ floor }}</cv-select-option>
                    </cv-select>
                </div>
            </div>
        </div>

        <!-- Room Grid -->
        <div class="grid grid-cols-3 gap-4">
          <div 
            v-for="room in filteredRooms" :key="room.id"
            class="border rounded p-4"
          >
            <div class="bg-gray-200 aspect-video mb-2">Image</div>
            <img :src="room.imageUrl" alt="Room Image">
            <div class="flex justify-between">
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
          </div>
        </div>
      </div>
    </section>
</template>

<script>
  import { CvButton } from '@carbon/vue';
    export default {
        data() {
        return {
            rooms: [
            {
                id: 1,
                name: 'Conference A',
                capacity: 5,
                floor: 1,
                amenities: ["Whiteboard", "Projector", "Video Conferencing"],
                image: '/room-placeholder.jpg'
            },
            {
                id: 2,
                name: 'Conference B',
                capacity: 10,
                floor: 2,
                amenities: ["Whiteboard"],
                image: '/room-placeholder.jpg'
            },
            {
                id: 3,
                name: 'Main Conference Room',
                capacity: 30,
                floor: 3,
                amenities: ["Projector"],
                image: '/room-placeholder.jpg'
            },
            {
                id: 4,
                name: 'Training Room',
                capacity: 25,
                floor: 1,
                amenities: ["Whiteboard", "Projector", "Screen"],
                image: '/room-placeholder.jpg'
            },
            {
                id: 5,
                name: 'Meeting Room 1',
                capacity: 8,
                floor: 2,
                amenities: ["Whiteboard", "Video Conferencing"],
                image: '/room-placeholder.jpg'
            },
            {
                id: 6,
                name: 'Meeting Room 2',
                capacity: 14,
                floor: 3,
                amenities: ["Whiteboard"],
                image: '/room-placeholder.jpg'
            },
            {
                id: 7,
                name: 'Boardroom',
                capacity: 10,
                floor: 1,
                amenities: ["Whiteboard", "Projector", "Video Conferencing", "Screen"],
                image: '/room-placeholder.jpg'
            },
            {
                id: 8,
                name: 'Call Room 1',
                capacity: 2,
                floor: 4,
                amenities: ["Video Conferencing", "Screen"],
                image: '/room-placeholder.jpg'
            },
            {
                id: 9,
                name: 'Call Room 2',
                capacity: 2,
                floor: 4,
                amenities: ["Video Conferencing", "Screen"],
                image: '/room-placeholder.jpg'
            },
            ],
            capacities: [
            '', // All capacities
            '2',
            '4',
            '6',
            '8',
            '10',
            '12',
            '14', 
            '16', 
            '18', 
            '20', 
            '25',
            '30',
            '35',
            '40', 
            ],
            floors: ['', // All floors
              '1', 
              '2', 
              '3', 
              '4', 
              '5', 
              '6',
                    ],
            selectedFloor: '',
            selectedCapacity: '',
            selectedAmenities: [],
            searchQuery: '',
            };
        },
        computed: {
        allAmenities() {
            return [...new Set(this.rooms.flatMap(room => room.amenities))];
        },
        filteredRooms() {
        return this.rooms
            .filter(room => 
            room.name.toLowerCase().includes(this.searchQuery.toLowerCase()) 
            )
            .filter(room => {
            if (this.selectedFloor) {
                return parseInt(this.selectedFloor) == room.floor;
            }
            return true;
            })
            .filter(room => {
            if (this.selectedCapacity) {
                return room.capacity >= parseInt(this.selectedCapacity); 
            } else {
                return true; 
            }
            })
            .filter(room => {
            if (this.selectedAmenities.length > 0 && !this.selectedAmenities.every(amenity => room.amenities.includes(amenity))) {
                return false;
            }
            return true;
            })
            .sort((a, b) => a.capacity - b.capacity); 
        },
        },
    };
</script>

<style>

</style>