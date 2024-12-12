import { defineStore } from "pinia"
export const usePendapatanStore = defineStore('income', () => {
    const loading = ref(false)
    const incomes: any = ref(null)
    const getIncomes = async (params?: any) => {
        loading.value = true
        incomes.value = {
            "current_page": 1,
            "data": [
                {
                    "id": 1,
                    "report": {
                        "id": 1,
                        "name": "Nama Reportnya",
                    },
                    "branch": {
                        "id": 112,
                        "name": "Cabang OK"
                    },
                    "account": {
                        "id": 1,
                        "name": "Akun 001",
                    },
                    "income_type": {
                        "id": 1,
                        "name": "Pendapatan Ghaib",
                    },
                    "no_faktur": 'F0099191',
                    "no_kwitansi": 'F0099191',
                    "total_amount": 40690899,
                    "date": "2023-09-20T05:44:14.000000Z",
                    "nasabah_name": "CV ANUGHRAH LAIN",
                    "nasabah_address": "Jln Mana Aja Bisa"

                },
                {
                    "id": 2,
                    "report": {
                        "id": 1,
                        "name": "Nama Reportnya",
                    },
                    "branch": {
                        "id": 112,
                        "name": "Cabang OK"
                    },
                    "account": {
                        "id": 1,
                        "name": "Akun 001",
                    },
                    "income_type": {
                        "id": 1,
                        "name": "Pendapatan Ghaib",
                    },
                    "no_faktur": 'F0099191',
                    "no_kwitansi": 'F0099191',
                    "total_amount": 10690899,
                    "date": "2023-09-20T05:44:14.000000Z",
                    "nasabah_name": "CV ANUGHRAH",
                    "nasabah_address": "Jln Mana Aja Bisa Sekarang"

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
        getIncomes,
        loading,
        incomes
    }
})