<script setup lang="ts">
import { defineProps } from 'vue';
import type { OlympicsDetail } from '@/types';




const props = defineProps<{
    olympicsdetail: OlympicsDetail
}>();
</script>

<template>
  <!-- <div class="w-full flex items-left justify-between">
 <div class="flex flex-col items-left ">
  <div class="flex items-left mb-2 ">
    <country-flag :country="props.olympicsdetail.symbol" size='big'/>
    <div class="w-96">{{ props.olympicsdetail.name }}</div>
  </div>
  </div>
</div> -->

<div class="flex items-center border-b py-2 mx-10 justify-around">
    
    <div class="w-4 text-sm font-medium text-gray-900">{{ props.olympicsdetail.id }}</div>
   
    <div class="w-8 px-2">
      <country-flag :country="props.olympicsdetail.symbol" size='big'/>
    </div>
       
      <div class="w-20 px-2 text-base font-medium text-left">{{ props.olympicsdetail.name }}</div>
   
      <div class="w-8 px-2 text-sm">{{ props.olympicsdetail.gold_medals}}</div>
      <div class="w-8 px-2 text-sm">{{ props.olympicsdetail.silver_medals }}</div>
      <div class="w-8 px-2 text-sm">{{ props.olympicsdetail.bronze_medals }}</div>
      <div class="w-8 px-2 text-sm">+</div>
    
  </div>
</template>

<style scoped>

</style>
