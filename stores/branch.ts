import BranchService from "~/services/branch"
import { defineStore } from "pinia"
import { toast } from "vue3-toastify"
export const useBranchStore = defineStore('branch', () => {
    const loading = ref(false)
    const branches: any = ref([])
    const getBranches = async (params?: any) => {
        try {
            loading.value = true
            const response = await BranchService.GET(params)
            branches.value = response.data.data
        } catch (error: any) {
            console.error(error)
            toast.error(error.response.data.message, {
                autoClose: 2000,
                position: toast.POSITION.TOP_CENTER
            })
        } finally {
            loading.value = false
        }
    }
    // const getCompanyById = async (id: any) => {
    //     const response = await BranchService.GET_BY_ID(id)
    //     companyItem.value = response.data.data
    // }
    return {
        loading,
        branches,
        getBranches
    }
})