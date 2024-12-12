import SuratEdaranService from "@/services/suratEdaran"
import { defineStore } from "pinia"
import { isNullOrEmpty } from "~/utils/helper";
import { toast } from "vue3-toastify";
import suratEdaran from "@/services/suratEdaran";

export const useSuratEdaran = defineStore('suratEdaran', () => {
    const loading = ref(false)
    const data: any = ref([])
    const pdfRead = ref(true)
    const activeSuratEdaran: any = ref({})
    const hapusSuratEdaran: any = ref([])

    const suratEdaranImei : any = ref({})
    const suratEdaranSpekLaptop : any = ref({})
    const suratEdaranPassword : any = ref({})
    const suratEdaranWarna : any = ref({})
    const suratEdaranRamLaptop : any = ref({})
    const suratEdaranHardisk : any = ref({})
    const suratEdaranWarnaKendaraan : any = ref([])
    const suratEdaranStatusKendaraan : any = ref([])

    const getSuratEdaran = async (menu: string, jenis: string) => {
        try {
            loading.value = true
            const response = await SuratEdaranService.GET({ menu: menu, jenis: jenis })
            data.value = response.data
            for (var se of data.value) {
                if (se.isViewSE == "false") {
                    pdfRead.value = false
                }
            }
            return { data: data.value, pdfRead: pdfRead.value }
        } catch (error: any) {
            loading.value = false;
            return toast.error(error.response.data.reason);
        } finally {
            loading.value = false
        }
    }

    const submitSuratEdaran = async () => {
        try {

            loading.value = true
            let payload = new FormData()
            payload.append("menu", activeSuratEdaran.value.jenis)
            payload.append("jenis", activeSuratEdaran.value.jenis)

            if (!isNullOrEmpty(activeSuratEdaran.value.data)) {

                for (var file of activeSuratEdaran.value.data) {
                    if (file.base64 != null) {
                        //untuk struktur form file baru
                        payload.append("pdfFiles", file.file)
                    }
                    else {
                        //Jika tidak Update Kirim File Kosong
                        let metadata = {
                            type: 'application/pdf'
                        }
                        let fileInput = new File([], "pdf", metadata)
                        payload.append("pdfFiles", fileInput)
                    }
                }
            }

            //Hapus se jika ada
            if (!isNullOrEmpty(hapusSuratEdaran.value)) {
                for (var id of hapusSuratEdaran.value) {
                    let payloadHapus = new FormData()
                    payloadHapus.append("id", id)
                    await SuratEdaranService.DELETE_SURAT_EDARAN(payloadHapus)
                }
                hapusSuratEdaran.value = []
            }

            //----------------- Submit Semua Data -----------------

            await SuratEdaranService.SUBMIT_SURAT_EDARAN(payload)
            loading.value = false

        } catch (error: any) {
            loading.value = false;
            return toast.error(error.response.data.reason);
        }
    }

    const FetchSuratEdaranElektronik = async() => {
        suratEdaranImei.value = await getSuratEdaran('imei', 'imei')
        suratEdaranSpekLaptop.value = await getSuratEdaran('spekLaptop', 'spekLaptop')
        suratEdaranPassword.value = await getSuratEdaran('password', 'password')
        suratEdaranWarna.value = await getSuratEdaran('warna', 'warna')
        suratEdaranRamLaptop.value = await getSuratEdaran('RamLaptop', 'RamLaptop')
        suratEdaranHardisk.value = await getSuratEdaran('hardisk', 'hardisk')
    }
    
    const FetchSuratEdaranKendaraan = async() => {
        suratEdaranWarnaKendaraan.value = await getSuratEdaran('WarnaKendaraan', 'WarnaKendaraan')
        suratEdaranStatusKendaraan.value = await getSuratEdaran('StatusKendaraan', 'StatusKendaraan')
    }
    return {
        getSuratEdaran,
        data,
        loading,
        pdfRead,
        activeSuratEdaran,
        hapusSuratEdaran,
        submitSuratEdaran,
        FetchSuratEdaranElektronik,
        FetchSuratEdaranKendaraan,
        suratEdaranImei,
        suratEdaranSpekLaptop,
        suratEdaranPassword,
        suratEdaranWarna,
        suratEdaranRamLaptop,
        suratEdaranHardisk,
        suratEdaranWarnaKendaraan,
        suratEdaranStatusKendaraan
    }
})
