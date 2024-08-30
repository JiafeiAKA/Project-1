<script setup lang="ts">
import { toRefs, defineProps } from 'vue'
import { type CountryDetail } from '@/types'

const props = defineProps<{
    countrydetail: CountryDetail
}>()
const { countrydetail } = toRefs(props)
</script>

<template>
    <div v-if="countrydetail">
        <p>{{ countrydetail.capital }}</p>
        <p>{{ countrydetail.population }}</p>
        <p>{{ countrydetail.traditional_food }}</p>
    </div>
</template>
