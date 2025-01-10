<!-- src/components/ClickableCard.vue -->
<template>
  <div
    class="bg-white p-8 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
    @click="handleClick"
    @keydown.enter="handleClick"
    tabindex="0"
    role="button"
    :aria-label="title"
  >
    <h3 class="">{{ title }}</h3>
    <div class="flex justify-between items-center">
      <slot name="icon">
        <!-- Default Hexagon Icon -->
         <div></div>
      </slot>
      
      <slot name="arrow">
        <!-- Default Arrow Icon -->
        <ArrowRight32 />
      </slot>
    </div>
  </div>
</template>

<script setup>
import ArrowRight32 from '@carbon/icons-vue/es/arrow--right/32';
import { useRouter } from 'vue-router';

const router = useRouter();

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  to: {
    type: [String, Object],
    default: null
  },
  link: {
    type: String,
    default: null
  }
});


const handleClick = () => {
  if (props.link) {
    router.push(props.link);
  }
};


</script>