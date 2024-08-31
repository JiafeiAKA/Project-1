<template>
    <div class="flex items-center border-b py-2 mx-10 justify-around bg-blue-500 rounded-t-xl">
    
    <div class="w-4 text-neutral-50" > Orders </div>
   
    <div class="w-8 px-2 text-neutral-50"> NOCs </div>
       
      <!-- <div class="w-20 px-2 bi bi-award-fill "> </div> -->
      <div  class="w-20 px-2 text-neutral-50">Name</div>
   
      <i class="w-8 px-2  bi bi-award-fill gold-icon">  </i>
      <i class="w-8 px-2  bi bi-award-fill silver-icon"> </i>
      <i class="w-8 px-2  bi bi-award-fill bronze-icon"> </i>
      <div class="w-8 px-2 text-sm"></div>
    
  </div>
</template>

<script setup>

</script>

<style scoped>

.gold-icon {
    color: gold;
    font-size: 30px;
}

.silver-icon {
    color: silver;
    font-size: 30px;
}

.bronze-icon {
    color: brown;
    font-size: 30px;
}

</style>