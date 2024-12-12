import { defineStore } from "pinia"
import VillageService from "@/services/wilayah/village"
export const useVillageStore = defineStore('kelurahan', () => {
    const villages: any = ref([])
    const village: any = ref(null)
    const loading = ref(false)
    async function getVillages(params?: any) {
        loading.value = true
        const response = await VillageService.GET(params)
        const dataKelurahan = response.data.data
        villages.value = dataKelurahan
        loading.value = false
    }
    async function getVillageId(id: any) {
        const response = await VillageService.GET_BY_ID(id)
        const dataKelurahan = response.data.data
        village.value = dataKelurahan
    }

    const datas = computed(() =>
        villages.value
    )

    return {
        getVillages,
        getVillageId,
        villages,
        loading,
        village,
        datas
    }
})