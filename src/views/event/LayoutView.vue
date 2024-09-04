<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import type { OlympicsDetail } from '@/types'
import { detailCountry } from '@/stores/counter'


const olympicsdetail = ref<OlympicsDetail | null>(null)
const router = useRouter();




const { detail } = detailCountry()

var totalMedal = computed<number>(() => {
    const gold = Number(detail?.gold_medals ?? 0)
    const silver = Number(detail?.silver_medals ?? 0)
    const beonze = Number(detail?.bronze_medals ?? 0)

    return gold + silver + beonze;
});




const navigateCountryDetail = () => {

    router.push({
        name: 'event-detail-view', params: { id: detail?.id ?? 1 }
    });
}




const navigateToSportList = () => {

    router.push({
        // name: 'event-olympicdetail-view', params: { id: detail?.id ?? 1 }
        name: 'event-olympicdetail-view', params: { id: detail?.id ?? 1 }
    });

}


olympicsdetail.value = detail;

</script>

<template>
    <div class="px-8 space-y-6">
        <div class="p-4 rounded bg-white text-blue-500">
            <h2 class="text-2xl font-bold">{{ olympicsdetail?.name }}</h2>
            <p>Welcome to the {{ olympicsdetail?.name }} detail page. Explore the details and sports involved in this
                grand event.</p>
            <div class="flex space-x-4 mt-4">
                <button class="bg-blue-500 text-white hover:bg-blue-100 rounded px-4 py-2"
                    @click="navigateCountryDetail">{{ detail?.name }}
                    Details</button>
                <button class="bg-blue-500 text-white hover:bg-blue-100 rounded px-4 py-2"
                    @click="navigateToSportList">Sport List</button>
            </div>
        </div>
        <!--  -->

        <div class="bg-blue-500 text-white p-4 rounded-lg flex items-center justify-between">

            <div>
                <h2 class="text-2xl font-bold mr-4">{{ detail?.name }}</h2>
                <p class="text-sm">{{ detail?.symbol }}</p>
            </div>
            <div>
                <country-flag :country="detail?.symbol" size='big' class="h-12 w-auto" />
            </div>
        </div>
        <!--  -->

        <div class="bg-blue-100 p-4 rounded-lg">
            <h2 class="text-2xl font-bold mb-4">Medal Count</h2>
            <div class="grid grid-cols-4 gap-4">
                <div class="bg-yellow-100 text-center py-8 rounded-lg">
                    <p class="text-4xl font-bold">{{ detail?.gold_medals }}</p>
                    <p class="text-gray-500">Gold </p>
                </div>
                <div class="bg-gray-200 text-center py-8 rounded-lg">
                    <p class="text-4xl font-bold">{{ detail?.silver_medals }}</p>
                    <p class="text-gray-500">Silver </p>
                </div>
                <div class="bg-orange-100 text-center py-8 rounded-lg">
                    <p class="text-4xl font-bold">{{ detail?.bronze_medals }}</p>
                    <p class="text-gray-500">Bronze </p>
                </div>
                <div class="bg-blue-200 text-center py-8 rounded-lg">
                    <p class="text-4xl font-bold">{{ totalMedal }}</p>
                    <p class="text-gray-500">Total</p>
                </div>
            </div>
        </div>

        <!--  -->
        <RouterView />


    </div>

</template>

<style>
.icon-country-detail {
    color: blue;
    font-size: 30px;
}
</style>