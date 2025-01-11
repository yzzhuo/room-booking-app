<script>
export default {
  methods: {
    goToAbout() {
      this.$router.push('/about')
      this.$router.push('/mybookings')
    },
    goToMyBookings() {
      this.$router.push('/mybookings'); // Navigate to the MyBookings page
    },
  },
}
</script>

<template>
  <h2>HomeView</h2>
  <cv-button @click="goToAbout">Go to About</cv-button>
  <cv-button @click="goToMyBookings">MyBookings</cv-button>
  
</template>
