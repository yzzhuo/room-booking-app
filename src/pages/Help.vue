<template>
  <div class="min-h-screen bg-white w-10/12 mx-auto">
    <!-- Header -->
    <header class="bg-black py-16">
      <div class="px-6">
        <h1 class="text-white text-4xl font-light">Help & Contacts</h1>
      </div>
    </header>

    <!-- Navigation -->
    <nav class="mx-auto px-6 py-8">
      <ul class="space-y-4">
        <li v-for="item in navigation" :key="item.id">
          <cv-link
            :href="item.href" 
            class="text-xl text-gray-800 hover:text-blue-600 flex items-center space-x-2"
          >
            <svg 
              class="w-3 h-3 transform -rotate-90" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                stroke-linecap="round" 
                stroke-linejoin="round" 
                stroke-width="2" 
                d="M19 9l-7 7-7-7"
              />
            </svg>
            <span>{{ item.text }}</span>
          </cv-link>
        </li>
      </ul>
    </nav>

    <!-- Content -->
    <main class="mx-auto px-6 py-8">
      <section class="mb-16" id="faqs">
        <h2 class="text-3xl font-light mb-8">FAQs</h2>
        <div class="space-y-12">
          <div>
            <h3 class="text-xl font-medium mb-4">What is the website about?</h3>
            <p class="text-gray-700 leading-relaxed">
              It is a room booking website for academic purposes only. It is a project for the course of Accessibility Design and Assistive Products. All the information is fictional.
            </p>
          </div>

          <div>
            <h3 class="text-xl font-medium mb-4">Technologies used</h3>
            <p class="text-gray-700 leading-relaxed">
              This website use Vue.js with Vite as the build tool. The design is based on <cv-link href="https://carbondesignsystem.com/">Carbon Design System</cv-link> and the components are from <cv-link href="https://vue.carbondesignsystem.com/?path=/story/welcome--vue-3-carbon-10" class="text-blue-600 hover:text-blue-800">carbon-vue</cv-link>.
            </p>
          </div>

          <div>
            <h3 class="text-xl font-medium mb-4">Related Resources</h3>
            <p class="text-gray-700 leading-relaxed">
              All images used in this website are from <cv-link href="https://unsplash.com/">Unsplash</cv-link>. The icons are from <cv-link href="https://carbondesignsystem.com/elements/icons/usage/">Carbon Design System</cv-link>.
            </p>
          </div>
        </div>
      </section>

      <section class="mb-16" id="contact">
        <h2 class="text-3xl font-light mb-8">Contact Us</h2>
        <div class="space-y-12">
          <div >
              <h3 class="text-xl font-medium mb-4">Github</h3>
              <p class="text-gray-700 leading-relaxed">
                You can reach out to our team or find the source code of this project on <cv-link href="https://github.com/yzzhuo/room-booking-app">Github</cv-link>.
              </p>
          </div>
          <div>
              <h3 class="text-xl font-medium mb-4">Email</h3>
              <p class="text-gray-700 leading-relaxed">
                Messages to the email <cv-link href="mailto:yanzhu.zhuo@alumnos.upm.es">yanzhu.zhuo@alumnos.upm.es</cv-link> if you have any questions or suggestions.
              </p>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
export default {
  name: 'HelpPaage',
  data() {
    return {
      navigation: [
        { id: 2, text: 'FAQs', href: '#faqs' },
        { id: 3, text: 'Contact Us', href: '#contact' },
      ]
    }
  }
}
</script>