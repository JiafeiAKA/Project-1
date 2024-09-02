import axios, { type AxiosResponse } from 'axios'
import type { CommentDetail, Comments } from '@/types'

const apiClient = axios.create({
  baseURL: 'https://github.com/MRSMIRROR/331-MockServer-Project',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  postComment(comment: Comments): Promise<AxiosResponse<Comments>> {
    return apiClient.post(`/CountryDetail/comments`, comment)
  }
}
