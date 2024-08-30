<script setup  lang="ts">
import OlympicComponent from '@/components/OlympicComponent.vue';
import type { OlympicsDetail } from '@/types';
import { ref, onMounted, computed, watchEffect, defineComponent } from 'vue';
import OlympicsDetailService from '@/services/OlympicsDetailService';
import router from '@/router';

const Olympics = ref<OlympicsDetail[] | null>(null);
const totalEvent = ref(0);
let page = computed(() => props.page);
const pageSize = computed(() => props.pageSize);
var totalPage  = ref(0);
const hasNextPage = computed(() => {
  var total = Math.ceil(totalEvent.value / pageSize.value);  
  return page.value < total;
});

const hasNextPrev = computed(() => {

  return page.value > 1 ;
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

// onMounted(() => {
//   watchEffect(() => {
//     Olympics.value = null;
//     OlympicsDetailService.getOlympicsDetails(pageSize.value, page.value)
//       .then((response) => {
//         Olympics.value = response.data;
//         totalEvent.value = parseInt(response.headers['x-total-count'], 10);
//       })
//       .catch((error) => {
//         console.error('There was an error!', error);
//       });
//   });
// });

//

const currentPage = ref(1);

function setCurrentPage(numPage : number){
  currentPage.value = numPage

  if(currentPage.value<1){
        currentPage.value = 1
      }else if(currentPage.value > pageSize.value){
        currentPage.value = pageSize.value
      }  
   
    //  Olympics.value = null;
    // OlympicsDetailService.getOlympicsDetails(pageSize.value, currentPage.value)
    //   .then((response) => {
    //     Olympics.value = response.data;
    //     totalEvent.value = parseInt(response.headers['x-total-count'], 10);
    //   })
    //   .catch((error) => {
    //     console.error('There was an error!', error);
    //   });        
    fetchData();
}





async function fetchData() {
  try {
    const response = await  OlympicsDetailService.getOlympicsDetails(pageSize.value, currentPage.value);
    const data = await response.data;
    Olympics.value = data;
    totalEvent.value = parseInt(response.headers['x-total-count'], 10);
    totalPage.value =  Math.ceil(totalEvent.value / pageSize.value);
    
   
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

fetchData();


</script>

<template>
  <h1>Olympics</h1>
  <div class="OlympicsDetail">
    <OlympicComponent v-for="olympic in Olympics" :key="olympic.id" :olympicsdetail="olympic"/>
    
  </div>

  <!--  -->
  <nav aria-label="Page navigation example">
  <ul class="inline-flex -space-x-px text-sm">

    <li>
     
     
      <RouterLink class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
       id="page-prev" :to="{ name: 'Event-List-View', query: { page: page - 1, pageSize: pageSize } }" rel="prev"  :is="page<=1" :event="page<=1 ? '' : 'click'">&#60; Prev</RouterLink>
    </li>
    
    <li v-for="index in totalPage" v-bind:key="index">
      <div @click="setCurrentPage(index)" class="cursor-pointer flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">{{index}}</div>
    </li>
    <li>
   <RouterLink class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
      id="page-next" :to="{ name: 'Event-List-View', query: { page: page + 1, pageSize: pageSize } }" rel="next" v-if="hasNextPage">Next &#62;</RouterLink> 
  
    </li>
  </ul>
</nav>
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