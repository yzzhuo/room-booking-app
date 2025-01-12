<template>
    <section>
      <h2 class="text-xl font-semibold mb-4">Available Room</h2>
      <div class="border-2 border-gray-200 rounded p-4">
        <div class="mb-8">
            <!-- Search -->
            <div class="mb-2">
                <label for="search">Search:</label>
                <cv-search 
                    id="search"
                    v-model="searchQuery"
                    :light="true"
                    label="Room Search"
                    placeholder="Search Here"
                    type="text" 
                />
            </div>

            <!-- Other Filters -->
            <div class="flex gap-2 mb-2 items-center">
                <label>Amenities:</label>
                <div class="flex gap-4 items-center">
                    <cv-checkbox v-for="(amenity, index) in allAmenities" :key="index" :value="amenity" :label="amenity" v-model="selectedAmenities" />
                </div>
            </div>

            <cv-select
                @change="onChange"
                label="Capacity"
                light="true"
                id="capacity" 
                v-model="selectedCapacity"
                class="mb-2"
            >
                <cv-select-option disabled selected hidden value="placeholder-item">Choose an option</cv-select-option>
                <cv-select-option v-for="capacity in capacities" :key="capacity" :value="capacity">{{ capacity }}</cv-select-option>
            </cv-select>
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

        <!-- Room Grid -->
        <div class="grid grid-cols-3 gap-4">
          <RoomCard
              v-for="room in filteredRooms" 
              :key="room.id"
              :room="room"
              @book="bookRoom"
            />
          </div>
      </div>
    </section>
</template>

<script>
import roomInfo from '../data/room-info.json';
import RoomCard from '../components/RoomCard.vue';

export default {
    data() {
        return {
            rooms: roomInfo.rooms,
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
    components: {
      RoomCard
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
    methods: {
    bookRoom(roomId) {
      this.$router.push({
        name: 'room',
        params: { id: roomId }
      });
    }
  }
};
</script>

<style>

</style>