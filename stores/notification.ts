import NotificationService from "@/services/notification"
import adjustPage from "~/utils/adjustPage"
import { defineStore } from "pinia"
import { number } from "yup"
export const useNotification = defineStore('notification', () => {
    const loading = ref(false)
    const data: any = ref([])
    const getPaginate = async (params?: any) => {
        
        const x = adjustPage(params)
        
        try {
            loading.value = true
            const response = await NotificationService.GET({page: x})
            data.value = response.data
            data.value.lastPage = Math.ceil(data.value.total / 10);
        } catch (error: any) {
            console.error(error)
        } finally {
            loading.value = false
        }
    }

    const deleteNotifikasi = async(id: any) => {
        try {
            loading.value = true
            let payload = new FormData
            payload.append("id", id)
            await NotificationService.DELETE(payload)
        } catch(error: any) {
            console.error(error)
        } finally {
            loading.value = false
        }
    }
   
    return {
        getPaginate,
        data,
        loading,
        deleteNotifikasi
    }
})