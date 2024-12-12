import { defineStore } from "pinia";
import barangService from "~/services/barang";
import { toast } from "vue3-toastify";
import { makeQuery, isNullOrEmpty, removeThousandSeparator, adjustPage } from "~/utils/helper";

export const useReject = defineStore("reject", () => {

  const anggota = useAnggota()
  const cabang = useCabang()
  const suratEdaran = useSuratEdaran()
  const elektronik = useElektronik()
  const kendaraan = useKendaraan()
  const emas = useEmas()
  const simulasi = useSimulasi()
  const BASE_FILE_PATH = import.meta.env.VITE_BASE_FILE_PATH;
  const mdl = useUtilStore();

  const loading = ref(false)

  const input: any = ref({
    alasan: null,
    jenisPerhiasan: "",
    karat: null,
    beratKering: null,
    keteranganAlasan: "",
    nasabah: null,
    noHp: null,
    imeiSn: null,
    kebutuhanNasabah: null,
    spesifikasi: null,
    isTipeTidakTerdaftar: false,
    namaTipeTidakTerdaftar: null,
    fotoPendukung: [],
  });

  const filter: any = ref({
    filterId: null,
    filterCabangId: null,
    filterStartDate: null,
    filterEndDate: null,
    filterJenisId: null,
    filterImeiSn: null,
    filterTergadai: null,
    sortBy: null,
    sortDesc: null,
    filterIsTipeTidakTerdaftar: null
  })

  const init = ref(1)
  const data: any = ref({ data: [] })

  const query = ref('')

  const alasanOpt = ref([])

  const current_page = ref(1)
  const lastPage = ref(0)
  const row = ref(10)

  const fetchRejectGadai = async (page: number = 1, size: number = 10) => {
    try {
      loading.value = true


      query.value = makeQuery(adjustPage(page), size)

      if (!isNullOrEmpty(filter.value.filterId)) query.value = query.value + "&filterId=" + filter.value.filterId
      if (!isNullOrEmpty(filter.value.filterCabangId)) query.value = query.value + "&filterCabangId=" + filter.value.filterCabangId.id
      if (!isNullOrEmpty(filter.value.filterStartDate)) query.value = query.value + "&filterStartDate=" + filter.value.filterStartDate
      if (!isNullOrEmpty(filter.value.filterEndDate)) query.value = query.value + "&filterEndDate=" + filter.value.filterEndDate
      if (!isNullOrEmpty(filter.value.filterJenisId)) query.value = query.value + "&filterJenisId=" + filter.value.filterJenisId
      if (filter.value.filterImeiSn != null) query.value = query.value + "&filterImeiSn=" + filter.value.filterImeiSn
      if (filter.value.filterTergadai != null) query.value = query.value + "&filterTergadai=" + filter.value.filterTergadai
      if (filter.value.sortBy != null) query.value = query.value + "&sortBy=" + filter.value.sortBy
      if (filter.value.sortDesc != null) query.value = query.value + "&sortDesc=" + filter.value.sortDesc
      if (filter.value.filterIsTipeTidakTerdaftar != null) query.value = query.value + "&filterIsTipeTidakTerdaftar=" + filter.value.filterIsTipeTidakTerdaftar

      const response = await barangService.GET_REJECT_GADAI(query.value)

      data.value = response.data
      data.value.data = response.data.data

      console.log(Math.ceil(data.value.total / size));

      lastPage.value = Math.ceil(data.value.total / size);

      current_page.value = page
      row.value = size

      init.value = 1
      loading.value = false
    } catch (error: any) {
      console.log(error);
      loading.value = false
    }
  }

  const getAlasanReject = async () => {
    try {
      const response = await barangService.GET_ALASAN_REJECT()
      for (var item of response.data) {
        item.requirePhoto = (item.requirePhoto.toString().toLowerCase() == "true")
      }
      alasanOpt.value = response.data
    } catch (error: any) {
      console.error(error)
    }
  }

  const rejectGadai = async () => {
    try {
      let payload = new FormData()
      payload.append("cabangId", cabang.activeCabangId!)
      payload.append("reasonId", input.value.alasan.id)
      payload.append("namaNasabah", input.value.nasabah)
      payload.append("noHpNasabah", (input.value.noHp != null || input.value.noHp != "") ? input.value.noHp : "0")
      payload.append("keterangan", input.value.keteranganAlasan)

      if (elektronik.input.jenisBarang == null && kendaraan.input.jenisKendaraan == null && emas.input.jenisEmas == null) {
        payload.append("jenisPerhiasan", input.value.jenisPerhiasan)
        payload.append("karat", input.value.karat)
        payload.append("beratKering", input.value.beratKering)
        payload.append("berat", input.value.beratKering)
      } else {
        payload.append("isTipeTidakTerdaftar", input.value.isTipeTidakTerdaftar)
        if (input.isTipeTidakTerdaftar == true) {
          payload.append("namaTipeTidakTerdaftar", input.value.namaTipeTidakTerdaftar)
        }

        if (simulasi.tab == 3) {

          payload.append("jenisId", emas.input.jenisEmas.id)
          payload.append("kondisi", "Emas")

          if (emas.input.jenisEmas.id == 246) {
            payload.append("merkId", emas.input.merkEmas.id)
            payload.append("beratBasah", emas.input.beratBasah)
            payload.append("berat", emas.input.beratKering)
          }
          if (emas.input.jenisEmas.id == 251) {
            payload.append("berat", simulasi.rincian.beratEmas)
            payload.append("merkId", emas.input.merkEmas.id)
            payload.append("tipeId", emas.input.tipeEmas.id)
          }

          if (emas.input.jenisEmas.id == 252) {
            payload.append("berat", emas.input.beratKering)
            payload.append("beratKering", emas.input.beratKering)
            payload.append("adaCap", emas.cap.toString())
            payload.append("adaKwitansi", emas.kwitansi.toString())
            payload.append("dataBatu", JSON.stringify(emas.input.batu))
            if (emas.cap == true) {
              payload.append("karatBerbatu", emas.input.karatEmas.value)
            }
          }
          if (emas.input.jenisEmas.id == 257) {

            payload.append("merkId", emas.input.merkEmas.id)
            payload.append("tipeId", emas.input.karatEmas.id)
            payload.append("jenisPerhiasan", input.jenisPerhiasan)
            payload.append("karat", emas.input.karatEmas)
            const inputBatu: any = emas.input.batu
            const batu = Array.from(inputBatu, (item: any) => ({ ...item, ukuran: item.ukuran.value }));

            payload.append("berat", emas.input.beratKering)
            payload.append("beratKering", emas.input.beratKering)
            payload.append("gosokanHilang", emas.gosok.toString())
            payload.append("adaCap", emas.cap.toString())
            payload.append("adaKwitansi", emas.kwitansi.toString())
            payload.append("dataBatu", JSON.stringify(batu))

            if (emas.checkBeratTambahan == true) {
              payload.append("beratBatuTambahan", emas.input.beratTambahan)
            }

          }
        }

        else if (emas.cap == false && emas.gosok == true) {

          payload.append("jenisId", emas.input.jenisEmas.id)
          payload.append("kondisi", "Emas")
          payload.append("merkId", emas.input.merkEmas.id)

          payload.append("jenisPerhiasan", input.value.jenisPerhiasan)
          payload.append("karat", input.value.karat)
          const inputBatu = emas.input.batu
          const batu = Array.from(inputBatu, (item: any) => ({ ...item, ukuran: item.ukuran.value }));

          payload.append("berat", emas.input.beratKering)
          payload.append("beratKering", emas.input.beratKering)
          payload.append("gosokanHilang", emas.gosok.toString())
          payload.append("adaCap", emas.cap.toString())
          payload.append("adaKwitansi", emas.kwitansi.toString())
          payload.append("dataBatu", JSON.stringify(batu))

          if (emas.checkBeratTambahan == true) {
            payload.append("beratBatuTambahan", emas.input.beratTambahan)
          }
        }
        else if (simulasi.tab != 3) {
          payload.append("tipeId", elektronik.input.tipeBarang?.id || kendaraan.input.tipeKendaraan?.id)
          payload.append("kondisi", simulasi.rincian.perhitunganKondisi.name)
          payload.append("imeiSn", input.value.imeiSn)
        }
        payload.append("spesifikasi", input.value.spesifikasi)
      }

      payload.append("pinjamanMaksimal", simulasi.rincian.maksimumPinjaman)
      payload.append("pinjamanKebutuhanNasabah", removeThousandSeparator(input.value.kebutuhanNasabah).toString())

      let jsonFoto: any = []
      input.value.fotoPendukung.forEach(function (entry: any) {
        jsonFoto.push(entry.fotoBase64)
      })
      payload.append("foto", JSON.stringify(jsonFoto))
      if (!isNullOrEmpty(input.value.password)) {
        payload.append("password", input.value.password)
      }

      loading.value = true
      if (simulasi.tab == 3) {
        await barangService.GADAI_REJECT_EMAS(payload)
        resetFormReject()
      } else if (elektronik.input.jenisBarang == null && kendaraan.input.jenisKendaraan == null && emas.input.jenisEmas == null) {

        await barangService.GADAI_REJECT_EMAS_LAINNYA(payload)
        resetFormReject()

      } else if (emas.cap == false && emas.gosok == true) {
        await barangService.GADAI_REJECT_EMAS_LAINNYA(payload)
        resetFormReject()
      }
      else {
        await barangService.GADAI_REJECT(payload)
        resetFormReject()
      }

      loading.value = false
      mdl.modalToggleConfirm('mConfirmRejectGadai')
      mdl.modalRejectToggle('mRejectGadai')
      toast.success('Data berhasil di submit');
    } catch (error: any) {
      console.error(error)
      toast.error(error.response.data.reason);
      loading.value = false
    }
  }

  const updateRowsPerPageSelect = async () => {

    await fetchRejectGadai(1, row.value)
    current_page.value = 1

    return
  }

  const updateCurrentPage = async (value: number) => {
    await fetchRejectGadai(value, row.value)
  }

  const resetFormReject = () => {
    input.value.alasan = null,
      input.value.jenisPerhiasan = "",
      input.value.karat = null,
      input.value.beratKering = null,
      input.value.keteranganAlasan = "",
      input.value.nasabah = null,
      input.value.noHp = null,
      input.value.imeiSn = null,
      input.value.kebutuhanNasabah = null,
      input.value.spesifikasi = null,
      input.value.isTipeTidakTerdaftar = false,
      input.value.namaTipeTidakTerdaftar = null,
      input.value.fotoPendukung = []
  }

  return {
    input,
    loading,
    alasanOpt,
    getAlasanReject,
    rejectGadai,
    filter,
    init,
    data,
    fetchRejectGadai,
    lastPage,
    current_page,
    row,
    updateRowsPerPageSelect,
    updateCurrentPage,
  };
});
