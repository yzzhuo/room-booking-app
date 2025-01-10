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

defineProps({
  title: {
    type: String,
    required: true
  },
  to: {
    type: [String, Object],
    default: null
  }
});

const emit = defineEmits(['click']);

const handleClick = () => {
  emit('click');
};
</script>