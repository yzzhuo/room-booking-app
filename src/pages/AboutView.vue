<script>
  export default {
    methods: {
      goToHome() {
        this.$router.push('/')
      },
    },
  }
</script>

<template>
  <h2>AboutView</h2>
  <cv-button @click="goToHome">Go to Home</cv-button>
</template>