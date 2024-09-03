<template>
    <div class="flex justify-center items-center">

        <form @submit.prevent="submitComment">
            <div class="grid grid-cols-1 gap-4">
                <label for="page-size">Choose Country</label>
                <select v-model="countryName" @change="chooseCountry">
                    <option v-for="country in countryDetail" :key="country.name" :value="country.name">
                        {{ country.name }}
                    </option>
                </select>

                <input type="text" placeholder="user" v-model="userName">

                <textarea placeholder="datail" v-model="comment"></textarea>

                <button type="submit"
                    class="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Submit</button>



            </div>


        </form>
    </div>

    <div>
        <ul>
            <li v-for="comment in filteredComments" :key="comment.comment">
                <CommentCheerUpComponent :username="comment.username" :comment="comment.comment" />
            </li>
        </ul>
    </div>

</template>

<script setup lang="ts">

import OlympicsDetailService from '@/services/OlympicsDetailService';
import type { CommentDetail, Comments, OlympicsDetail } from '@/types';
import { commentStore } from '@/stores/counter';
import { computed, ref } from 'vue';
import CommentCheerUpComponent from '@/components/CommentCheerUpComponent.vue';

const countryDetail = ref<OlympicsDetail[] | null>(null);
const countryName = ref("");
const userName = ref("");
const comment = ref("");

// const { count, increment } = useCounterStore();
const { comments, addComment } = commentStore();


const submitComment = () => {
    console.log(countryName.value);
    console.log(userName.value);
    console.log(comment.value);

    const commentDetailV: CommentDetail = {
        comment: comment.value,
        username: userName.value
    }

    const commentsV: Comments = {
        id: 1,
        comments: [commentDetailV],
        country: countryName.value

    }


    addComment(commentsV);

}



const chooseCountry = () => {
    console.log(countryName.value)
}

const filteredComments = computed(() => {
    const com = comments.filter(comment => comment.country === countryName.value);


    const empty: CommentDetail[] = [];



    return com[0]?.comments ?? empty;

}
)


async function fetchData() {

    try {
        const response = await OlympicsDetailService.getAllCountry();
        const data = response.data;
        countryDetail.value = data;
        countryDetail.value.forEach((x) => {
            console.log(x.name);
        });

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

fetchData();
</script>

<style lang="scss" scoped></style>