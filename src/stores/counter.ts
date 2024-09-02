import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { CommentDetail, Comments } from '@/types'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})

export const commentStore = defineStore('comments', () => {
  const com: Comments[] = []
  const comments = ref(com)

  function addComment(com: Comments) {
    const existingCommentCountryId = comments.value.findIndex((c) => c.country === com.country)

    if (existingCommentCountryId == -1) {
      comments.value.push({
        id: com.id,
        comments: com.comments,
        country: com.country
      })
    } else {
      comments.value[existingCommentCountryId].comments.push(com.comments[0])
    }
  }

  return { comments, addComment }
})
