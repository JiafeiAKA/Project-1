<script setup lang="ts">
import { ref, onMounted, defineProps } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import type { CountryDetail, OlympicsDetail } from '@/types'
import CountryDetailService from '@/services/CountryDetailService'
import OlympicsDetailService from '@/services/OlympicsDetailService'

const olympicsdetail = ref<OlympicsDetail | null>(null)
const countrydetail = ref<CountryDetail | null>(null)
const props = defineProps({
    id: {
        type: String,
        required: true
    }
})
const router = useRouter()

onMounted(() => {
    OlympicsDetailService.getOlympicsDetailById(parseInt(props.id))
    .then(response => {
        olympicsdetail.value = response.data
    })
    .catch((error) => {
        if (error.response && error.response.status === 404) {
            router.push({ name: '404-resource-view', params: { resource: 'event' } })
        } else {
            router.push({ name: 'network-error-view' })
        }
    })

    CountryDetailService.getCountryDetail(parseInt(props.id))
    .then(response => {
        countrydetail.value = response.data
    })
    .catch((error) => {
        console.error('There was an error fetching country details:', error)
    })
})
</script>

<template>
    <div class="bg-white shadow-md rounded-lg px-4 py-6 mx-10">
  <div class="flex items-center justify-between mb-4">
    <h2 class="text-lg font-medium text-gray-900">CountryDetail</h2>
    <span class="text-sm text-gray-500">id: {{ countrydetail?.id }}</span>
  </div>
  <div class="grid grid-cols-1 gap-4">
    <div class="flex items-center">
        <i class="w-6 mr-2 text-gray-400 bi bi-bank2 icon-country-detail" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        </i>
      <p class="text-gray-700 px-6">City Name: {{ countrydetail?.capital }}</p>
    </div>
    <div class="flex items-center">
      <i class="w-6 mr-2 text-gray-400 bi bi-people-fill icon-country-detail" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      </i>
      <p class="text-gray-700 px-6">Population : {{ countrydetail?.population }}</p>
    </div>

    <div class="flex items-center">
      <i class="w-6 mr-2 text-gray-400 bi bi-card-text icon-country-detail" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      </i>
      <p class="text-gray-700 px-6">Traition Food : {{ countrydetail?.traditional_food }}</p>
    </div>

    </div>
    
</div>
    <!-- <div v-if="olympicsdetail && countrydetail">
        <h1>{{ olympicsdetail.name }}</h1>

        <nav>
            <RouterLink :to="{ name: 'event-detail-view' }">CountryDetail</RouterLink> |
            <RouterLink :to="{ name: 'event-olympicdetail-view' }">OlympicDetail</RouterLink>
        </nav>
        <RouterView :countrydetail="countrydetail" />
    </div> -->
</template>

<style>
.icon-country-detail {
    color: blue;
    font-size: 30px;
}

</style>