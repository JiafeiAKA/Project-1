import axios, { type AxiosResponse } from 'axios'
import type { OlympicsDetail } from '@/types'

const apiClient = axios.create({
    baseURL: 'https://my-json-server.typicode.com/MRSMIRROR/331-MockServer-Project',
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

export default {
    getOlympicsDetails(perPage: number, page: number) {
        return apiClient.get(`/OlympicsDetail?_limit=${perPage}&_page=${page}`);
    },
    getOlympicsDetailById(id: number): Promise<AxiosResponse<OlympicsDetail>> {
        return apiClient.get<OlympicsDetail>(`/OlympicsDetail/${id}`)
    }
}