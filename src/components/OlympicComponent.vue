<script setup lang="ts">
import { computed, defineProps, ref } from 'vue';
import type { Detail, OlympicsDetail } from '@/types';
import { useRouter, type RouteParams } from 'vue-router';
import { detailCountry } from '@/stores/counter';




const isShowDetail = ref(false);

const router = useRouter();


function showDetail() {
  isShowDetail.value = !isShowDetail.value;

}


const props = defineProps<{
  olympicsdetail: OlympicsDetail
}>();


const { setDetail, detail } = detailCountry();




function navigateToCountryDetail(d: OlympicsDetail) {
  setDetail(d)
  router.push({
    name: 'event-layout-view', params: { id: d.id }
  });
}



const details: Detail[] = props.olympicsdetail.detail;



</script>


<template>


  <div class="flex items-center border-b py-2 mx-10 justify-around">

    <div class="w-4 text-sm font-medium text-gray-900">{{ props.olympicsdetail.id }}</div>

    <div class="w-8 px-2">
      <country-flag :country="props.olympicsdetail.symbol" size='big' class="cursor-pointer"
        @click="navigateToCountryDetail(props.olympicsdetail)" />
    </div>

    <div class="w-20 px-2 text-base font-medium text-left">{{ props.olympicsdetail.name }}</div>

    <div class="w-8 px-2 text-md">{{ props.olympicsdetail.gold_medals }}</div>
    <div class="w-8 px-2 text-md">{{ props.olympicsdetail.silver_medals }}</div>
    <div class="w-8 px-2 text-md">{{ props.olympicsdetail.bronze_medals }}</div>
    <div class="w-8 px-2 text-md cursor-pointer  " @click="showDetail"><i class="bi bi-plus-circle-fill icon-plus"></i>
    </div>

  </div>




  <div v-if="isShowDetail">
    <div class="flex items-center border-b py-2 mx-10 justify-around bg-stone-400">
      <div class="w-[10%] px-2 text-sm">Name</div>
      <div class="w-8 px-2 text-sm">Gender</div>
      <div class="w-[10%] px-2 text-sm">Sport</div>
      <div class="w-8 px-2 text-sm">Medal</div>
    </div>

    <div v-for="detail in details" v-bind:key="detail.gender">

      <div class="flex items-center border-b py-2 mx-10 justify-around">
        <div class="w-[10%] px-2 text-sm">{{ detail.name }}</div>
        <div class="w-8 px-2 text-sm">{{ detail.gender }}</div>
        <div class="w-[10%] px-2 text-sm">{{ detail.sport }}</div>
        <div class="w-8 px-2 text-sm">{{ detail.medal }}</div>
      </div>



    </div>
  </div>


</template>

<style scoped>
.icon-plus {
  color: blueviolet;
  font-size: 25px;
}
</style>
