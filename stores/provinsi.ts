import ProvinceService from "@/services/wilayah/province"
import { defineStore } from "pinia"
export const useProvinceStore = defineStore('province', () => {
    const provlists: any = ref([])
    const provinces: any = ref([])
    const loading = ref(false)
    const provinceDetail: any = ref(null)
    async function getProv(params?: any) {
        const response = await ProvinceService.GET(params)
        provlists.value = response.data.data
    }
    async function getProvinceAll(params?: any) {
        loading.value = true
        const response = await ProvinceService.GET(params, 'ALL')
        provinces.value = response.data.data
        loading.value = false
    }
    async function getProvinceById(id: any) {
        const response = await ProvinceService.GET_BY_ID(id)
        provinceDetail.value = response.data.data
    }

    const datas = computed(() =>
        provlists.value,
        provinces.value,
    )
    return {
        getProvinceById,
        provinceDetail,
        getProvinceAll,
        provlists,
        provinces,
        getProv,
        datas,
        loading
    }
})