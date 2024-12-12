import { defineStore } from "pinia"
import { toast } from "vue3-toastify"
import CoaService from "~/services/coa"
export const useCoaStore = defineStore('coa', () => {
    const loading = ref(false)
    const coalists: any = ref(null)
    const coadetails: any = ref(null)
    const getCoa = async (params?: any) => {
        loading.value = true
        const response = await CoaService.GET(params)
        coalists.value = response?.data?.data
        loading.value = false
    }
    const getCoaDetails = async (id?: any) => {
        loading.value = true
        // coadetails.value = await CoaService.GET_BY_ID(id)
        coadetails.value = {
            "current_page": 1,
            "data": [
                {
                    "id": 2109,
                    "created_at": "2023-09-20T05:44:14.000000Z",
                    "amount": 40690899,
                    "notes": "Penggajian karyawan Pusat Gadai Indonesia",
                    "company_id": 112,
                    "company": {
                        "id": 112,
                        "name": "PT Pusat Gadai Indonesia"
                    }
                },
                {
                    "id": 2110,
                    "created_at": "2023-09-20T05:44:14.000000Z",
                    "amount": 200000,
                    "notes": "Pembelian alat perbaikan baner",
                    "company_id": 112,
                    "company": {
                        "id": 112,
                        "name": "PT Pusat Gadai Indonesia"
                    }
                },
                {
                    "id": 2111,
                    "created_at": "2023-09-20T05:44:14.000000Z",
                    "amount": 400000000,
                    "notes": "Beli Xpander 2 buah",
                    "company_id": 112,
                    "company": {
                        "id": 112,
                        "name": "PT Pusat Gadai Indonesia"
                    }
                },
                {
                    "id": 2112,
                    "created_at": "2023-09-20T05:44:14.000000Z",
                    "amount": 40690899,
                    "notes": "Penggajian karyawan Pusat Gadai Indonesia",
                    "company_id": 112,
                    "company": {
                        "id": 112,
                        "name": "PT Pusat Gadai Indonesia"
                    }
                },
                {
                    "id": 2113,
                    "created_at": "2023-09-20T05:44:14.000000Z",
                    "amount": 200000,
                    "notes": "Pembelian alat perbaikan baner",
                    "company_id": 112,
                    "company": {
                        "id": 112,
                        "name": "PT Pusat Gadai Indonesia"
                    }
                },
                {
                    "id": 2114,
                    "created_at": "2023-09-20T05:44:14.000000Z",
                    "amount": 400000000,
                    "notes": "Beli Xpander 2 buah",
                    "company_id": 112,
                    "company": {
                        "id": 112,
                        "name": "PT Pusat Gadai Indonesia"
                    }
                },
            ],
            "first_page_url": "http://api-dev.pusatgadai.id/api/admin/cabang?page=1",
            "from": 1,
            "last_page": 55,
            "last_page_url": "http://api-dev.pusatgadai.id/api/admin/cabang?page=55",
            "next_page_url": "http://api-dev.pusatgadai.id/api/admin/cabang?page=2",
            "path": "http://api-dev.pusatgadai.id/api/admin/cabang",
            "per_page": 15,
            "prev_page_url": null,
            "to": 15,
            "total": 816
        }
        loading.value = false
    }


    const createCoa = async (values: Object, query?: Object) => {
        try {
            loading.value = true
            const res = await CoaService.CREATE(values)
            if (res.status === 200) {
                toast.success("Sukses menambah data", { autoClose: 2000 })
                await getCoa(query)
            }
        } catch (error: any) {
            toast.error(error.response.data.message)
        } finally {
            loading.value = false
        }
    }
    const updateCoa = async (id: any, data: {}, query?: {}) => {
        try {
            loading.value = true
            const res = await CoaService.UPDATE(id, data)
            if (res.status === 200) {
                toast.success("Sukses merubah data", { autoClose: 1000 })
                await getCoa(query)
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
        getCoa,
        createCoa,
        getCoaDetails,
        updateCoa,
        coadetails,
        loading,
        coalists
    }
})