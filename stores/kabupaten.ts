import { defineStore } from "pinia"
import CityService from "@/services/wilayah/city"
export const useKabupatenStore = defineStore('kabupaten', () => {
    const kabupatenlists: any = ref([])
    const kabupatenOptions: any = ref([])
    const kabupatemItem: any = ref({})
    async function getKabupaten(params?: any) {
        const response = await CityService.GET(params)
        const kabupaten = response.data.data
        kabupatenlists.value = kabupaten
    }

    async function getOptionKabupatenAll(params?: any) {
        const response = await CityService.GET(params, 'ALL')
        const kabs = response.data.data
        kabupatenOptions.value = kabs?.map((item: any) => {
            return {
                id: item.id,
                name: item.name,
                code: item.code
            }
        })
    }

    async function getKabupatenById(id: number) {
        const response = await CityService.GET_BY_ID(id)
        kabupatemItem.value = response.data.data
    }
    const datas = computed(() =>
        kabupatenlists.value,
        kabupatenOptions.value
    )

    return {
        getKabupatenById,
        getOptionKabupatenAll,
        getKabupaten,
        kabupatemItem,
        kabupatenlists,
        kabupatenOptions,
        datas
    }
})