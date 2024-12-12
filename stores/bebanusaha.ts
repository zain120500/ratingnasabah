import { defineStore } from "pinia"
export const useBebanUsahaStore = defineStore('bebanusaha', () => {
    const loading = ref(false)
    const bebanusahalists: any = ref(null)
    const getBabanUsaha = async (params?: any) => {
        loading.value = true
        bebanusahalists.value = {
            "current_page": 1,
            "data": [
                {
                    "id": 2109,
                    "name": "Gaji Karyawan",
                },
                {
                    "id": 2110,
                    "name": "Perawatan Gedung"
                },
                {
                    "id": 2111,
                    "name": "Perwatan Kucing"
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
        getBabanUsaha,
        loading,
        bebanusahalists
    }
})