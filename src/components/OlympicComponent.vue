<script setup lang="ts">
import { defineProps } from 'vue';
import type { OlympicsDetail } from '@/types';




const props = defineProps<{
    olympicsdetail: OlympicsDetail
}>();
</script>

<template>
  <div class="w-full flex items-left justify-between">
 <div class="flex flex-col items-left ">
  <div class="flex items-left mb-2 ">
    <country-flag :country="props.olympicsdetail.symbol" size='big'/>
    <div class="w-96">{{ props.olympicsdetail.name }}</div>
  </div>
  </div>
</div>
</template>

<style scoped>
/* .OlympicsDetail-card {
    padding: 20px;
    width: 250px;
    cursor: pointer;
    border: 1px solid #39495c;
    margin-bottom: 18px;
}
.OlympicsDetail-card:hover {
    transform: scale(1.01);
    box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2);
}
.olympic-link {
  text-decoration: none;
  color: #2c3e50;
} */
</style>
