import { defineStore } from "pinia"
export const usePendapatanLainStore = defineStore('otherincome', () => {
    const loading = ref(false)
    const incomes: any = ref(null)
    const getOtherIncomes = async (params?: any) => {
        loading.value = true
        incomes.value = {
            "current_page": 1,
            "data": [
                {
                    "id": 1,
                    "date": "2023-09-20T05:44:14.000000Z",
                    "account": {
                        "id": 1,
                        "name": "Akun 001",
                    },
                    "income_type": {
                        "id": 1,
                        "name": "Pendapatan Ghaib",
                    },
                    "amount": 40690899,
                    "note": "Ini catatan ipsum",
                    "created_at": "2023-09-20T05:44:14.000000Z",
                    "created_by": "Admin Jo"
                },
                {
                    "id": 2,
                    "date": "2023-09-20T05:44:14.000000Z",
                    "account": {
                        "id": 2,
                        "name": "Akun 002",
                    },
                    "income_type": {
                        "id": 1,
                        "name": "Pendapatan Ghaib",
                    },
                    "amount": 40690899,
                    "note": "Ini catatan lorem",
                    "created_at": "2023-09-20T05:44:14.000000Z",
                    "created_by": "Admin"
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
    return {
        getOtherIncomes,
        loading,
        incomes
    }
})