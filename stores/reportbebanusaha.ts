import { defineStore } from "pinia"
export const useReportBebanUsahaStore = defineStore('reportbebanusaha', () => {
    const loading = ref(false)
    const reportbebanusaha: any = ref(null)
    const getReportBabanUsaha = async (params?: any) => {
        loading.value = true
        reportbebanusaha.value = {
            "current_page": 1,
            "data": [
                {
                    "id": 2109,
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
                        "name": "Nama Akun",
                    },
                    "expence_type": {
                        "id": 1,
                        "name": "Nama Typenya",
                    },
                    "date": "2023-09-20T05:44:14.000000Z",
                    "amount": 40690899,
                    "paid_to": "CV ANUGHRAH LAIN",
                    "notes": "Penggajian karyawan Pusat Gadai Indonesia",
                    "created_by": "Admin",
                    "created_at": "2023-09-20T05:44:14.000000Z"

                },
                {
                    "id": 2110,
                    "report": {
                        "id": 1,
                        "name": "Nama Reportnya",
                    },
                    "branch": {
                        "id": 112,
                        "name": "CabangN NOK"
                    },
                    "account": {
                        "id": 1,
                        "name": "Nama Akun",
                    },
                    "expence_type": {
                        "id": 1,
                        "name": "Nama Typenya",
                    },
                    "date": "2023-09-20T05:44:14.000000Z",
                    "amount": 40690899,
                    "paid_to": "CV ANUGHRAH",
                    "notes": "Penggajian karyawan Pusat Gadai Indonesia",
                    "created_by": "Admin",
                    "created_at": "2023-09-20T05:44:14.000000Z"
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
        getReportBabanUsaha,
        loading,
        reportbebanusaha
    }
})