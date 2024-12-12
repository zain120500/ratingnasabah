import { defineStore } from "pinia"
import { toast } from "vue3-toastify"
import ExpensetypeService from "~/services/expensetype"
export const useExpenseTypesStore = defineStore('expense_stypes', () => {
    const loading = ref(false)
    const expensetypes: any = ref(null)
    const expenseOptions: any = ref(null)
    const getExpenseTypes = async (params?: any) => {
        try {
            loading.value = true
            const response = await ExpensetypeService.GET(params)
            expensetypes.value = response?.data?.data
        } catch (error: any) {
            toast.error(error.response.data.message)
        } finally {
            loading.value = false
        }
    }
    const getExpenseTypeOtions = async (params?: any) => {
        try {
            loading.value = true
            const response = await ExpensetypeService.GET(params, 'ALL')
            expenseOptions.value = response?.data?.data
        } catch (error: any) {
            toast.error(error.response.data.message)
        } finally {
            loading.value = false
        }
    }
    const createExpenseTypes = async (values: Object, query?: Object) => {
        try {
            loading.value = true
            const res = await ExpensetypeService.CREATE(values)
            if (res.status === 200) {
                toast.success("Sukses menambah data", { autoClose: 2000 })
                await getExpenseTypes(query)
            }
        } catch (error: any) {
            toast.error(error.response.data.message)
        } finally {
            loading.value = false
        }
    }

    const updateExpenseTypes = async (id: any, data: {}, query?: {}) => {
        try {
            loading.value = true
            const res = await ExpensetypeService.UPDATE(id, data)
            if (res.status === 200) {
                toast.success("Sukses merubah data", { autoClose: 1000 })
                await getExpenseTypes(query)
            }
        } catch (error: any) {
            toast.error(error.response.data.message, {
                autoClose: 1000
            })
        } finally {
            loading.value = false
        }
    }

    const deleteExpenseTypes = async (id: any, query?: Object) => {
        try {
            loading.value = true
            const res = await ExpensetypeService.DELETE(id)
            if (res.status === 200) {
                await getExpenseTypes(query)
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
        getExpenseTypes,
        createExpenseTypes,
        updateExpenseTypes,
        deleteExpenseTypes,
        getExpenseTypeOtions,
        expenseOptions,
        loading,
        expensetypes
    }
})