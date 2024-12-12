import { defineStore } from "pinia"
// import { toast } from "vue3-toastify"
export const usePiutangStore = defineStore('piutang', () => {
    const loading = ref(false)
    const piutang_lists: any = ref([])
    const getPiutang = async (params?: any) => {
        piutang_lists.value = {
            "current_page": 1,
            "data": [
                {
                    "id": 1,
                    "date": "2023-09-20T05:44:14.000000Z",
                    "faktur": "F001202300302A",
                    "branch_id": 112,
                    "branch": {
                        "id": 112,
                        "name": "CABANG JOS"
                    },
                    "nasabah": "CV Jumono",
                    "amount": 200000000
                },
                {
                    "id": 2,
                    "date": "2023-09-20T05:44:14.000000Z",
                    "faktur": "F001202300302A",
                    "branch_id": 112,
                    "branch": {
                        "id": 112,
                        "name": "CABANG OK"
                    },
                    "nasabah": "CV Jumono",
                    "amount": 200000000
                },
                {
                    "id": 3,
                    "date": "2023-09-20T05:44:14.000000Z",
                    "faktur": "F001202300302A",
                    "branch_id": 112,
                    "branch": {
                        "id": 112,
                        "name": "CABANG JOS"
                    },
                    "nasabah": "UD Winata Joy",
                    "amount": 200000000
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
        getPiutang,
        piutang_lists,
        loading
    }
})