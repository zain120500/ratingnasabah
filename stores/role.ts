import { defineStore } from "pinia"
import { toast } from "vue3-toastify"
import RoleService from "@/services/role"
export const useRoleStore = defineStore('role', () => {
    const loading = ref(false)
    const roles: any = ref({})
    const role: any = ref([])
    const roleOptions: any = ref([])
    const getRoles = async (params?: any) => {
        // try {
        //     loading.value = true
        //     const response = await RoleService.GET(params)
        //     roles.value = response.data.data
        // } catch (error: any) {
        //     toast.error(error.response.data.message, { autoClose: 2000 })
        // } finally {
        //     loading.value = false
        // }

        roleOptions.value = [
            {
                "id": 1,
                "is_active": 1,
                "name": "Pramuniaga",
                "level": 1
            },
            {
                "id": 2,
                "is_active": 1,
                "name": "Kasir",
                "level": 2
            },
            {
                "id": 3,
                "is_active": 1,
                "name": "Kepala Unit",
                "level": 3
            },
            {
                "id": 4,
                "is_active": 1,
                "name": "Kepala Cabang",
                "level": 4
            },
            {
                "id": 5,
                "is_active": 1,
                "name": "Kepala Cabang Senior",
                "level": 5
            },
            {
                "id": 6,
                "is_active": 1,
                "name": "Head Office",
                "level": 6
            },
            {
                "id": 7,
                "is_active": 1,
                "name": "Super Admin",
                "level": 7
            },
            {
                "id": 8,
                "is_active": 1,
                "name": "Lelang",
                "level": 8
            },
            {
                "id": 9,
                "is_active": 1,
                "name": "General Affair",
                "level": null
            },
            {
                "id": 11,
                "is_active": 1,
                "name": "Admin Audit",
                "level": 9
            },
            {
                "id": 13,
                "is_active": 1,
                "name": "Audit Reguler",
                "level": 10
            },
            {
                "id": 16,
                "is_active": 1,
                "name": "Collection",
                "level": 11
            },
            {
                "id": 19,
                "is_active": 1,
                "name": "simulasi gadai",
                "level": 12
            },
            {
                "id": 22,
                "is_active": 1,
                "name": "Accounting",
                "level": 13
            },
            {
                "id": 23,
                "is_active": 1,
                "name": "Sync Master Barang",
                "level": 90
            },
            {
                "id": 26,
                "is_active": 1,
                "name": "Eksekutif",
                "level": 100
            },
            {
                "id": 28,
                "is_active": 1,
                "name": "GM Support",
                "level": null
            },
            {
                "id": 29,
                "is_active": 1,
                "name": "Finance",
                "level": null
            },
            {
                "id": 56,
                "is_active": 1,
                "name": "Area Manager",
                "level": null
            },
            {
                "id": 100,
                "is_active": 1,
                "name": "Maintenance",
                "level": 1
            },
            {
                "id": 102,
                "is_active": 1,
                "name": "GM General Affair",
                "level": null
            },
            {
                "id": 103,
                "is_active": 1,
                "name": "Admin Portal",
                "level": 103
            },
            {
                "id": 104,
                "is_active": 1,
                "name": "Wakil Direktur",
                "level": null
            }
        ]
    }
    return {
        getRoles,
        roleOptions,
        loading,
        roles,
        role
    }
})