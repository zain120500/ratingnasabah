import { defineStore } from "pinia"
// import { toast } from "vue3-toastify"
export const useHutangStore = defineStore('hutang', () => {
    const loading = ref(false)
    const hutang_lists: any = ref([])
    const getHutang = async (params?: any) => {
        hutang_lists.value = {
            "current_page": 1,
            "data": [
                {
                    "id": 1,
                    "date": "2023-09-20T05:44:14.000000Z",
                    "account": "Nama Akun CoaAnya",
                    "amount": 200000000,
                    "notes": "Hutang gak perlu dibayar",
                    "created_by": "Admin",
                    "created_at": "2023-09-20T05:44:14.000000Z"
                },
                {
                    "id": 2,
                    "date": "2023-09-20T05:44:14.000000Z",
                    "account": "Nama Akun CoaAnya",
                    "amount": 240000000,
                    "notes": "Hutang gak perlu dibayar",
                    "created_by": "Admin",
                    "created_at": "2023-09-20T05:44:14.000000Z"
                },
                {
                    "id": 3,
                    "date": "2023-09-20T05:44:14.000000Z",
                    "account": "Nama Akun CoaAnya",
                    "amount": 400000000,
                    "notes": "Hutang gak perlu dibayar",
                    "created_by": "Admin",
                    "created_at": "2023-09-20T05:44:14.000000Z"
                },
            ],
            "first_page_url": "http://api-dev.pusatgadai.id/api/admin/cabang?page=1",
            "from": 1,
            "last_page": 1,
            "last_page_url": "http://api-dev.pusatgadai.id/api/admin/cabang?page=55",
            "next_page_url": "http://api-dev.pusatgadai.id/api/admin/cabang?page=2",
            "path": "http://api-dev.pusatgadai.id/api/admin/cabang",
            "per_page": 10,
            "prev_page_url": null,
            "to": 10,
            "total": 3
        }
    }
    return {
        getHutang,
        hutang_lists,
        loading
    }
})