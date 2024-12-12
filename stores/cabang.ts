import CabangService from "@/services/cabang"
import { defineStore } from "pinia"
import { addThousandSeparator } from "~/utils/helper";
export const useCabang = defineStore('cabang', () => {
    
    const activeCabangId = ref(null)
    const activeCabang: any = ref(null)
    const activeCashVirtual = ref(false)
    const loading = ref(false)
    const data: any = ref([])
    const cashInHand = ref("")
    const cashVirtual = ref("")
    const getCabangId = async (id?: number) => {
        try {    
            loading.value = true
            const response = await CabangService.GET_BY_ID(id)
            data.value = response.data   
            
        } catch (error: any) {
            console.error(error)
        } finally {
            loading.value = false
        }
    }

    const pushActiveCashVirtual = async (params: string) => {
        try {
            if (params === 'true') {
                activeCashVirtual.value = true
            }else{
                activeCashVirtual.value = false
            }
        } catch (error: any) {
            console.error(error)
        } finally {
            loading.value = false
        }
    }

    const getBalance = async (id: number) => {
        try {
            loading.value = true
           await getCabangId(id) 
           cashInHand.value = addThousandSeparator(data.value.cashInHand)   
           cashVirtual.value = addThousandSeparator(data.value.cashVirtual)   
        } catch (error: any) {
            console.error(error)
        } finally {
            loading.value = false
        }
    }
   
    const refreshBalance = async (id: number) => {
        try {
            loading.value = true
            cashInHand.value = "-"
            cashVirtual.value = "-"
            const response = await CabangService.REFRESH_BALANCE(id)  
            cashInHand.value = addThousandSeparator(response.data.cashInHandBerjalan)   
            cashVirtual.value = addThousandSeparator(response.data.cashVirtual)   
            
        } catch (error: any) {
            console.error(error)
        } finally {
            loading.value = false
        }
    }
    return {
        getCabangId,
        data,
        loading,
        activeCashVirtual,
        pushActiveCashVirtual,
        getBalance,
        cashInHand,
        cashVirtual,
        refreshBalance,
        activeCabangId,
        activeCabang
    }
})