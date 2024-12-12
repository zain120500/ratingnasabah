import { defineStore } from "pinia"
import { toast } from "vue3-toastify"
import OtherincometypesService from "~/services/otherincometypes"
export const useTipePllStore = defineStore('tipepll', () => {
    const loading = ref(false)
    const pll_lists: any = ref(null)
    const getTipePLL = async (params?: any) => {
        try {
            loading.value = true
            const response = await OtherincometypesService.GET(params)
            pll_lists.value = response?.data?.data
        } catch (error: any) {
            toast.error(error.response.data.message)
        } finally {
            loading.value = false
        }
    }

    const createTipePLL = async (values: Object, query?: Object) => {
        try {
            loading.value = true
            const res = await OtherincometypesService.CREATE(values)
            if (res.status === 200) {
                toast.success("Sukses menambah data", { autoClose: 2000 })
                await getTipePLL(query)
            }
        } catch (error: any) {
            toast.error(error.response.data.message)
        } finally {
            loading.value = false
        }
    }

    const updateTipePLL = async (id: any, data: {}, query?: {}) => {
        try {
            loading.value = true
            const res = await OtherincometypesService.UPDATE(id, data)
            if (res.status === 200) {
                toast.success("Sukses merubah data", { autoClose: 1000 })
                await getTipePLL(query)
            }
        } catch (error: any) {
            toast.error(error.response.data.message, {
                autoClose: 1000
            })
        } finally {
            loading.value = false
        }
    }

    const deleteTipePLL = async (id: any, query?: Object) => {
        try {
            loading.value = true
            const res = await OtherincometypesService.DELETE(id)
            if (res.status === 200) {
                await getTipePLL(query)
                toast.success("Sukses menghapus data", { autoClose: 2000 })
            }
        } catch (error: any) {
            toast.error(error.response.data.message, {
                autoClose: 1000
            })
        } finally {
            loading.value = false
        }
    }
    return {
        getTipePLL,
        createTipePLL,
        updateTipePLL,
        deleteTipePLL,
        loading,
        pll_lists
    }
})