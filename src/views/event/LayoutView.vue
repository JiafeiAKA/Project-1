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
    <div v-if="olympicsdetail && countrydetail">
        <h1>{{ olympicsdetail.name }}</h1>
        <nav>
            <RouterLink :to="{ name: 'event-detail-view' }">CountryDetail</RouterLink> |
            <RouterLink :to="{ name: 'event-olympicdetail-view' }">OlympicDetail</RouterLink>
        </nav>
        <RouterView :countrydetail="countrydetail" />
    </div>
</template>
