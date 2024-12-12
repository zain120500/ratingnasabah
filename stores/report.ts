import { defineStore } from "pinia"
// import { toast } from "vue3-toastify"
export const useReportStore = defineStore('report', () => {
    const loading = ref(false)
    const reports: any = ref([])
    const getReports = async (params?: any) => {
        reports.value = {
            "current_page": 1,
            "data": [
                {
                    "id": 1,
                    "month": 1,
                    "year": 2023,
                    "status": 2,
                    "company_id": 112,
                    "company": {
                        "id": 112,
                        "name": "PT Pusat Gadai Indonesia"
                    }
                },
                {
                    "id": 2,
                    "month": 2,
                    "year": 2023,
                    "status": 2,
                    "company_id": 112,
                    "company": {
                        "id": 112,
                        "name": "PT Pusat Gadai Indonesia"
                    }
                },
                {
                    "id": 3,
                    "month": 3,
                    "year": 2023,
                    "status": 1,
                    "company_id": 112,
                    "company": {
                        "id": 112,
                        "name": "PT Pusat Gadai Indonesia"
                    }
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
            "total": 13
        }
    }
    return {
        getReports,
        reports,
        loading
    }
})