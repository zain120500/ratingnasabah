import CompanySevice from "@/services/company"
import { defineStore } from "pinia"
import { toast } from "vue3-toastify"
export const useCompanyStore = defineStore('company', () => {
    const loading = ref(false)
    const companyItem: any = ref(null)
    const companies: any = ref([])
    const companyAll: any = ref([])
    const getCompanies = async (params?: any) => {
        try {
            loading.value = true
            const response = await CompanySevice.GET(params)
            companies.value = response.data.data
            // companies.value = {
            //     "current_page": 1,
            //     "data": [
            //         {
            //             "id": 2109,
            //             "name": "Pusat",
            //             "code": "PST-01",
            //             "address": "Jln Jembatan Indah",
            //             "phone": "+621380363569",
            //             "company_id": 112,
            //             "company": {
            //                 "id": 112,
            //                 "name": "PT Pusat Gadai Indonesia"
            //             },
            //             "type": "HO",
            //             "is_active": 1,
            //             "class": 1,
            //             "city_id": 1,
            //             "city": {
            //                 id: 1,
            //                 name: "Jakarta Barat"
            //             }
            //         },
            //         {
            //             "id": 2110,
            //             "name": "JKB001",
            //             "code": "001",
            //             "address": "Jln Jembatan Indah",
            //             "phone": "+621380363569",
            //             "company_id": 112,
            //             "company": {
            //                 "id": 112,
            //                 "name": "PT Pusat Gadai Indonesia"
            //             },
            //             "type": "HO",
            //             "is_active": 1,
            //             "class": 1,
            //             "city_id": 1,
            //             "city": {
            //                 id: 1,
            //                 name: "Jakarta Barat"
            //             }
            //         },
            //     ],
            //     "first_page_url": "http://api-dev.pusatgadai.id/api/admin/cabang?page=1",
            //     "from": 1,
            //     "last_page": 55,
            //     "last_page_url": "http://api-dev.pusatgadai.id/api/admin/cabang?page=55",
            //     "next_page_url": "http://api-dev.pusatgadai.id/api/admin/cabang?page=2",
            //     "path": "http://api-dev.pusatgadai.id/api/admin/cabang",
            //     "per_page": 15,
            //     "prev_page_url": null,
            //     "to": 15,
            //     "total": 100
            // }
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
    const getCompanyAll = async (params?: any) => {
        loading.value = true
        const response = await CompanySevice.GET(params, 'ALL')
        companyAll.value = response.data.data
        loading.value = false
    }
    const getCompanyById = async (id: any) => {
        const response = await CompanySevice.GET_BY_ID(id)
        companyItem.value = response.data.data
    }
    const createCompany = async (values: Object, query?: Object) => {
        try {
            loading.value = true
            const res = await CompanySevice.CREATE(values)
            if (res.status === 200) {
                toast.success("Sukses menambah data", { autoClose: 2000 })
                await getCompanies(query)
            }
        } catch (error: any) {
            toast.error(error.response.data.message)
        } finally {
            loading.value = false
        }
    }
    const deleteCompany = async (id: any, query?: Object) => {
        try {
            loading.value = true
            const res = await CompanySevice.DELETE(id)
            if (res.status === 200) {
                await getCompanies(query)
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

    const updateCompany = async (id: any, data: {}, query?: {}) => {
        try {
            loading.value = true
            const res = await CompanySevice.UPDATE(id, data)
            if (res.status === 200) {
                toast.success("Sukses merubah data", { autoClose: 1000 })
                await getCompanies(query)
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
        loading,
        createCompany,
        getCompanies,
        companies,
        getCompanyAll,
        companyAll,
        getCompanyById,
        companyItem,
        deleteCompany,
        updateCompany
    }
})