<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import OlymoicsDetailService from '@/services/OlympicsDetailService'
import type { OlympicsDetail } from '@/types'

const olympicsDetail = ref<OlympicsDetail | null>(null)
const route = useRoute()

onMounted(() => {
    const id = parseInt(route.params.id as string)
    if (!isNaN(id)) {
        OlymoicsDetailService.getOlympicsDetailById(id)
        .then(response => {
            olympicsDetail.value = response.data
        })
        .catch(error => {
            console.error('Failed to fetch olympic details', error)
        })
    }
})  
</script>

<template>
    <div v-if="olympicsDetail">
        <div v-for="detail in olympicsDetail.detail" :key="detail.name">
          <p>Sport: {{ detail.sport }}</p>
          <p>Gender: {{ detail.gender }}</p>
          <p>Athlete: {{ detail.name }}</p>
          <p>Medal: {{ detail.medal }}</p>
          <br>
        </div>
    </div>
</template>
