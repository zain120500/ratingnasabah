import { defineStore } from "pinia"
import DistrictService from "~/services/wilayah/district"
export const useKecamatanStore = defineStore('district', () => {
    const districtOptions: any = ref([])
    const districts: any = ref([])
    const district: any = ref(null)
    const isLoading: any = ref(false)
    const getKecamatan = async (params?: any) => {
        isLoading.value = true
        const response = await DistrictService.GET(params)
        const resdistricts = response.data.data
        districts.value = resdistricts
        isLoading.value = false
    }
    const getKecamatanAll = async (params?: any) => {
        isLoading.value = true
        const response = await DistrictService.GET(params, 'ALL')
        const resdistricts = response.data.data
        districtOptions.value = resdistricts
        isLoading.value = false
    }
    const getKecamatanById = async (id: number) => {
        const response = await DistrictService.GET_BY_ID(id)
        const resdistricts = response.data.data
        district.value = resdistricts
    }
    return {
        getKecamatan,
        getKecamatanById,
        getKecamatanAll,
        districts,
        district,
        districtOptions,
        isLoading
    }
})