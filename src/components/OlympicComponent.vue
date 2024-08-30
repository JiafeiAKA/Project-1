<script setup lang="ts">
import { defineProps } from 'vue';
import type { OlympicsDetail } from '@/types';




const props = defineProps<{
    olympicsdetail: OlympicsDetail
}>();
</script>

<template>
  <div>
    <!-- TODO -->
    <country-flag country='th' size='big'/>
  </div>
  


  <RouterLink class="olympic-link" :to="{ name: 'event-detail-view', params: { id: props.olympicsdetail.id.toString() }}">
    <div class="OlympicsDetail-card">
      <h2>{{ props.olympicsdetail.name }}</h2>
      <span>
        Gold Medals {{ props.olympicsdetail.gold_medals }} |
        Silver Medals {{ props.olympicsdetail.silver_medals }} |
        Bronze Medals {{ props.olympicsdetail.bronze_medals }}
      </span>
    </div>
  </RouterLink>
</template>

<style scoped>
.OlympicsDetail-card {
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
}
</style>
