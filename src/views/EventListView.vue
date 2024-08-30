<script setup lang="ts">
import OlympicComponent from '@/components/OlympicComponent.vue';
import type { OlympicsDetail } from '@/types';
import { ref, onMounted, computed, watchEffect } from 'vue';
import OlympicsDetailService from '@/services/OlympicsDetailService';

const Olympics = ref<OlympicsDetail[] | null>(null);
const totalEvent = ref(0);
const page = computed(() => props.page);
const pageSize = computed(() => props.pageSize);

const hasNextPage = computed(() => {
  const totalPage = Math.ceil(totalEvent.value / pageSize.value);
  return page.value < totalPage;
});

const props = defineProps({
  page: {
    type: Number,
    required: true
  },
  pageSize: {
    type: Number,
    required: true
  }
});

onMounted(() => {
  watchEffect(() => {
    Olympics.value = null;
    OlympicsDetailService.getOlympicsDetails(pageSize.value, page.value)
      .then((response) => {
        Olympics.value = response.data;
        totalEvent.value = parseInt(response.headers['x-total-count'], 10);
      })
      .catch((error) => {
        console.error('There was an error!', error);
      });
  });
});
</script>

<template>
  <h1>Olympics</h1>
  <div class="OlympicsDetail">
    <OlympicComponent v-for="olympic in Olympics" :key="olympic.id" :olympicsdetail="olympic"/>
    <div class="pagination">
      <RouterLink id="page-prev" :to="{ name: 'Event-List-View', query: { page: page - 1, pageSize: pageSize } }" rel="prev" v-if="page > 1">&#60; Prev Page</RouterLink>
      <RouterLink id="page-next" :to="{ name: 'Event-List-View', query: { page: page + 1, pageSize: pageSize } }" rel="next" v-if="hasNextPage">Next Page &#62;</RouterLink>
    </div>
  </div>
</template>
<style scoped>
.OlympicsDetail {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.pagination {
  display: flex;
  width: 290px;
}
.pagination a {
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
}
#page-prev {
  text-align: left;
}
#page-next {
  text-align: right;
}
</style>