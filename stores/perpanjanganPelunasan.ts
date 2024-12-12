import { defineStore } from "pinia";
import anggotaService from "~/services/anggota";
import adjustPage from "~/utils/adjustPage";
import { isNullOrEmpty, addThousandSeparator } from "~/utils/helper";
import { toast } from "vue3-toastify";
import perpanjanganPelunasanService from "~/services/perpanjanganPelunasan";
const BASE_FILE_PATH = import.meta.env.VITE_BASE_FILE_PATH;

export const usePerpanjanganPelunasan = defineStore("perpanjanganPelunasan", () => {
  const mdl = useUtilStore();
  const cabang = useCabang();
  const loading = ref(false);
  const data: any = ref({})
  const dataKeringanan: any = ref({})
  const dataHistory: any = ref({})
  const statusKeringanan: any = ref({})
  const keteranganKeringanan: any = ref({})
  const showStatusAjuan: any = ref(false)
  const showBtnCheckAjuan: any = ref(false)
  const showInputPembayaran: any = ref(false)
  const showKeringananBtn: any = ref(true)
  const showStatusKeringanan: any = ref(false)
  const angsuranPokokSajaNumber: any = ref(0)

  const bayarBulanBerikutnya: any = ref(false)
  const totalHitungPembayaran: any = ref(0)
  const disableAngsuran: any = ref(false)
  const angsuranPokokNumber: any = ref(0)

  const isCheckStatusLelang: any = ref(false)
  const statusLelangId: any = ref(null)
  const statusLelangText: any = ref("")

  const isReqKirimBalik: any = ref(false)
  const kirimBalidId: any = ref(null)
  const kirimBalikText: any = ref("")

  const dataHitungPembayaran: any = ref({
    jasaBulanBerikutnya: null,
    adminFeeBulanBerikutnya: null,
  })

  const noKwitansi: any = ref("")


  const input: any = ref(
    {
      tipePembayaran: "PP",
      tglKedatangan: null,
      isTunai: 1,
      angsuranPokok: 0,

      isTunaiAngsuranSaja: 1,
      angsuranPokokSaja: 0,

      //keringanan
      nominalKeringanan: null,
      keteranganKeringanan: "",

      fotoPendukung: []
    }
  )

  const getData = async (noFaktur: any) => {
    try {
      loading.value = true

      const response = await perpanjanganPelunasanService.GET(noFaktur)
      getDataKeringanan(response.data.id)

      data.value = response.data

      loading.value = false
    } catch (error: any) {
      console.error(error)
      loading.value = false
    }
  }

  const getHistory = async (noFaktur: any) => {
    try {
      loading.value = true

      const response = await perpanjanganPelunasanService.GET_HISTORY(noFaktur)
   
      dataHistory.value = response.data
      loading.value = false
    } catch (error: any) {
      console.error(error)
      loading.value = false
    }
  }

  const getDataKeringanan = async (id: any) => {
    try {
      loading.value = true
      showStatusAjuan.value = false
      showBtnCheckAjuan.value = false
      showInputPembayaran.value = false
      showKeringananBtn.value = true
      showStatusKeringanan.value = false

      const response = await perpanjanganPelunasanService.GET_GADAI_KERINGANAN_PEMBAYARAN(id)
      dataKeringanan.value = response.data

      if (data.value.statusGadai == 'Lunas') {
        if (dataKeringanan.value.status != null) {
          let nominal = addThousandSeparator(dataKeringanan.value.nominalApproved)
          showStatusAjuan.value = true
          statusKeringanan.value = "Ajuan keringanan diterima dengan nominal potongan Rp. " + nominal
          keteranganKeringanan.value = dataKeringanan.value.keterangan
        }
      }
      else if (data.value.statusGadai == 'Berjalan') {
        if (dataKeringanan.value.status == 0) { //pending
          showBtnCheckAjuan.value = true
        }
        else if (dataKeringanan.value.status == 1) { //approved
          showInputPembayaran.value = true
          showKeringananBtn.value = false
          let nominal = addThousandSeparator(dataKeringanan.value.nominalApproved)
          showStatusAjuan.value = true
          statusKeringanan.value = "Ajuan keringanan diterima dengan nominal potongan Rp. " + nominal
          keteranganKeringanan.value = dataKeringanan.value.keterangan
        }
        else if (dataKeringanan.value.status == 2) { //reject
          showInputPembayaran.value = true
          showKeringananBtn.value = true
          let nominal = addThousandSeparator(dataKeringanan.value.nominalRequested)
          showStatusAjuan.value = true
          statusKeringanan.value = "Ajuan keringanan ditolak dengan nominal potongan Rp. " + nominal
          keteranganKeringanan.value = dataKeringanan.keterangan
        }
        else {
          showInputPembayaran.value = true
        }
      }
      loading.value = false
    } catch (error: any) {
      console.error(error)
      loading.value = false
    }

  }

  const submitKeringanan = async (jenisPembayaran: any) => {
    try {
      loading.value = true

      let payload = new FormData()
      let nominalKeringanan = removeThousandSeparator(input.value.nominalKeringanan)

      //----------------- Append Data Payload -----------------

      payload.append("gadaiId", data.value.id)
      payload.append("nominal", nominalKeringanan.toString())
      payload.append("keterangan", input.value.keteranganKeringanan)
      payload.append("jenis", jenisPembayaran)


      const response = await perpanjanganPelunasanService.POST_KERINGANAN(payload)
      getDataKeringanan(data.value.id)
      loading.value = false
    } catch (error: any) {
      loading.value = false;
      toast.error(error.response.data.reason);
      return error
    }
  }

  const submitBatalKeringanan = async () => {
    try {
      loading.value = true
      let payload = new FormData()

      payload.append("gadaiId", data.value.id)

      const response = await perpanjanganPelunasanService.POST_BATAL_KERINGANAN(payload)
      getDataKeringanan(data.value.id)
      loading.value = false
    } catch (error: any) {
      loading.value = false;
      toast.error(error.response.data.reason);
      return error
    }
  }

  const checkStatusKeringanan = async () => {
    try {
      loading.value = true
      const response = await perpanjanganPelunasanService.GET_CEK_STATUS_KERINGANAN(data.value.id)
      let dataKeringanan = response.data

      if (dataKeringanan.status == 1) {
        showBtnCheckAjuan.value = false
        showStatusAjuan.value = true
        showInputPembayaran.value = true
        showStatusKeringanan.value = true
        showKeringananBtn.value = false

        let nominal = addThousandSeparator(dataKeringanan.nominalApproved)

        statusKeringanan.value = "Ajuan keringanan diterima dengan nominal potongan Rp. " + nominal
        if (dataKeringanan.keterangan != null) keteranganKeringanan.value = dataKeringanan.keterangan
        else keteranganKeringanan.value = "-"
      }
      else if (dataKeringanan.status == 2) {
        showBtnCheckAjuan.value = false
        showStatusAjuan.value = true
        showInputPembayaran.value = true
        showStatusKeringanan.value = true
        input.value.nominalKeringanan = 0

        let nominal = addThousandSeparator(dataKeringanan.nominalRequested)

        statusKeringanan.value = "Ajuan keringanan ditolak dengan nominal potongan Rp. " + nominal
        if (dataKeringanan.keterangan != null) keteranganKeringanan.value = dataKeringanan.keterangan
        else keteranganKeringanan.value = "-"
      }
      else {
        toast.error("Ajuan keringanan masih diproses.")
      }
      loading.value = false
    } catch (error: any) {
      loading.value = false;
      toast.error(error.response.data.reason);
      return error
    }
  }

  const ajukanAngsuranSaja = async (noFaktur: any) => {
    try {
      loading.value = true
      const response = await perpanjanganPelunasanService.GET_CEK_PEMBAYARAN_INQUIRY('PL', noFaktur)
      if (response.data.items.length != 1) {
        toast.error("Tidak dapat melakukan angsuran saja - terdapat biaya jasa yang belum terbayar!")
      } else {
        mdl.modalToggle("modal-bayar-angsuranSaja")
      }
      loading.value = false
    } catch (error: any) {
      loading.value = false;
      toast.error(error.response.data.reason);
      return error
    }
  }

  const submitPembayaranAngsuran = async (noFaktur: any) => {
    try {
      loading.value = true
      let payload = new FormData()

      //----------------- Append Data Payload -----------------

      payload.append("noFaktur", noFaktur)
      payload.append("isTunai", (input.value.isTunaiAngsuranSaja == 1) ? "true" : "false")
      payload.append("cabangPembayaranId", cabang.activeCabangId!)
      if (angsuranPokokSajaNumber.value != 0) {
        payload.append("angsuranPokok", angsuranPokokSajaNumber.value)
      }

      const response = await perpanjanganPelunasanService.POST_GADAI_PEMBAYARAN_ANGSURAN(payload)
      if (input.value.isTunaiAngsuranSaja == 3) {
        try {
          loading.value = true;
          const response2 = await perpanjanganPelunasanService.GET_GADAI_PEMBAYARAN_QRIS(response.data.id)
          noKwitansi.value = response2.data.name
        } catch (error: any) {
          loading.value = false;
          toast.error(error.response.data.reason);
          return error
        }
      }
      else {
        noKwitansi.value = response.data.name
        loading.value = false
      }
    } catch (error: any) {
      loading.value = false;
      toast.error(error.response.data.reason);
      return error
    }
  }


  const hitungPembayaran = async (jenisPembayaran: any, noFaktur: any) => {
    try {
      loading.value = true
      const response = await perpanjanganPelunasanService.GET_CEK_PEMBAYARAN_INQUIRY(jenisPembayaran, noFaktur)
      dataHitungPembayaran.value = response.data

      if (dataHitungPembayaran.value.jasaBulanBerikutnya == null) bayarBulanBerikutnya.value = 'false'
      totalHitungPembayaran.value = dataHitungPembayaran.value.total
      if (dataHitungPembayaran.value.jasaBulanBerikutnya != null && dataHitungPembayaran.value.harus2BulanUntukAngsur == true) {
        disableAngsuran.value = true
      }
      loading.value = false

    } catch (error: any) {
      loading.value = false;
      toast.error(error.response.data.reason);
      return error
    }
  }

  const submitPembayaran = async (jenisPembayaran: string, noFaktur: any) => {
    try {
      loading.value = true
      let payload = new FormData()

      //----------------- Append Data Payload -----------------

      payload.append("jenis", jenisPembayaran)
      payload.append("noFaktur", noFaktur)
      payload.append("isTunai", (input.value.isTunaiAngsuranSaja == 1) ? "true" : "false")

      payload.append("cabangPembayaranId", cabang.activeCabangId!)
      if (angsuranPokokNumber.value != 0) {
        payload.append("angsuranPokok", angsuranPokokNumber.value)
      }

      if (bayarBulanBerikutnya.value == 'true') payload.append("bayarBulanBerikutnya", "true")

      const response = await perpanjanganPelunasanService.POST_GADAI_PEMBAYARAN(payload)
      if (input.value.isTunaiAngsuranSaja == 3) {
        try {
          loading.value = true;
          const response2 = await perpanjanganPelunasanService.GET_GADAI_PEMBAYARAN_QRIS(response.data.id)
          noKwitansi.value = response2.data.name
        } catch (error: any) {
          loading.value = false;
          toast.error(error.response.data.reason);
          return error
        }
      }
      else {
        noKwitansi.value = response.data.name
        loading.value = false
      }
    } catch (error: any) {
      loading.value = false;
      toast.error(error.response.data.reason);
      return error
    }
  }

  const cekStatusLelang = async (noFaktur: any) => {
    try {
      loading.value = true
      //----------------- Append Data Payload -----------------
      isCheckStatusLelang.value = true
      const response = await perpanjanganPelunasanService.GET_STATUS_LELANG(noFaktur)
      statusLelangId.value = response.data.id
      statusLelangText.value = response.data.name
      isCheckStatusLelang.value = false
    } catch (error: any) {
      loading.value = false;
      isCheckStatusLelang.value = false
      toast.error(error.response.data.reason);
      return error
    }
  }
  const requestKirimBalik = async (noFaktur: any) => {
    try {
      loading.value = true
      //----------------- Append Data Payload -----------------
      isReqKirimBalik.value = true

      const response = await perpanjanganPelunasanService.POST_REQUEST_KIRIM_BALIK(noFaktur)
      kirimBalidId.value = response.data.id
      kirimBalikText.value = response.data.name

      if (kirimBalidId.value == 0) {
        mdl.modalToggleShow("modal-kirim-balik")
        mdl.modalToggleHide("modal-status-lelang")
      } else {
        toast.success("Pengajuan kirim balik berhasil diajukan! Hubungi HO untuk keterangan lebih lanjut")
        mdl.modalToggleHide("modal-status-lelang")
      }
      mdl.modalToggleHide("modal-status-lelang")
      isReqKirimBalik.value = false
    } catch (error: any) {
      loading.value = false;
      isReqKirimBalik.value = false
      toast.error(error.response.data.reason);
      return error
    }
  }

  const resetInput = () => {
    input.value = {
      tipePembayaran: "PP",
      tglKedatangan: null,
      isTunai: 1,
      angsuranPokok: 0,

      isTunaiAngsuranSaja: 1,
      angsuranPokokSaja: 0,

      //keringanan
      nominalKeringanan: null,
      keteranganKeringanan: "",

      fotoPendukung: []
    }
  }

  return {
    data,
    getData,
    getHistory,
    loading,
    showStatusAjuan,
    statusKeringanan,
    keteranganKeringanan,
    showInputPembayaran,
    showKeringananBtn,
    showBtnCheckAjuan,
    input,
    submitKeringanan,
    submitBatalKeringanan,
    resetInput,
    checkStatusKeringanan,
    ajukanAngsuranSaja,
    angsuranPokokSajaNumber,
    submitPembayaranAngsuran,
    noKwitansi,
    hitungPembayaran,
    bayarBulanBerikutnya,
    disableAngsuran,
    totalHitungPembayaran,
    dataHitungPembayaran,
    angsuranPokokNumber,
    submitPembayaran,
    cekStatusLelang,
    statusLelangId,
    statusLelangText,
    isCheckStatusLelang,
    requestKirimBalik,
    isReqKirimBalik,
    kirimBalidId,
    kirimBalikText
  };

});
