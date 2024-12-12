import { defineStore } from "pinia";
import barangService from "~/services/barang";
import { toast } from "vue3-toastify";
import { isNullOrEmpty, removeThousandSeparator } from "~/utils/helper";

export const useSimulasi = defineStore("simulasi", () => {

  const anggota = useAnggota()
  const cabang = useCabang()
  const suratEdaran = useSuratEdaran()
  const elektronik = useElektronik()
  const kendaraan = useKendaraan()
  const emas = useEmas()
  const BASE_FILE_PATH = import.meta.env.VITE_BASE_FILE_PATH;

  const loading = ref(false)
  interface Input {
    noImei: string;
    password: string;
    jenisBarang: any;
    merkBarang: any;
    tipeBarang: any;
    tahun: any;
    kondisi: any;
    kelengkapanBarang: any;
    spesifikasiBarangJenis: any;
    spesifikasiBarangMerk: any;
    warnaBarang: any;
    keterangan: string;
    promo: any;
    nilaiPinjaman: number;
    useVoucher: boolean;
    voucherCode: string;
    ram: number;
    spesifikasiLaptop: string;
    gadaiJenisHardisk: any;
    gadaiSizeHardisk: any;

    fotoPendukung: any;

    nominalHargaLainnya: any;
    nominalAdminFeeLainnya: any;

    tunai: number;
    rekeningSelect: any;
  }

  const input: any = ref<Input>({
    noImei: "",
    password: "",
    jenisBarang: null,
    merkBarang: null,
    tipeBarang: null,
    tahun: null,
    kondisi: null,
    kelengkapanBarang: [],
    spesifikasiBarangJenis: [],
    spesifikasiBarangMerk: [],
    warnaBarang: null,
    keterangan: "",
    promo: [],
    nilaiPinjaman: 0,
    useVoucher: false,
    voucherCode: "",
    ram: 1,
    spesifikasiLaptop: "",
    gadaiJenisHardisk: null,
    gadaiSizeHardisk: null,

    fotoPendukung: [],

    nominalHargaLainnya: null,
    nominalAdminFeeLainnya: null,

    tunai: 0,
    rekeningSelect: null,
  });

  const rincian: any = ref({
    namaBarang: "",
    hargaBarang: 0,
    maksimumPinjaman: 0,
    minimumPinjaman: 0,
    perhitunganPromo: null,
    perhitunganKondisi: {},
    perhitunganSpek: [],
    perhitunganBonusGadaiPertama: {},
    perhitunganStatusAnggota: {},
    biayaAdmin: 0,
    noFaktur: "",
    showAlertNoFakturGanda: "false",
    alertNoImei: "",
    alertNoFakturGanda: "",
    alertGadai: "elek",
    warnCpuZ: false,

    nilaiPinjaman: 0,
    useVoucher: false,
    voucherCode: "",
    tunai: 0,
    rekeningSelect: null,
  })

  const tab = ref(1)

  const calculateGadaiElektronik = async (dataRincian: any = null, finalizePayment: any = false) => {
    try {
      let payload = new FormData()
      if (anggota.anggota.id != null) {
        payload.append("nasabahId", anggota.anggota.id)
      }
      payload.append("jenisPinjamanId", '1') // MARK HARDCODE
      payload.append("jenisId", elektronik.input.jenisBarang.id)
      payload.append("merkId", elektronik.input.merkBarang.id)
      payload.append("tipeId", elektronik.input.tipeBarang.id)
      payload.append("kondisiId", elektronik.input.kondisi.id)
      payload.append("cabangId", cabang.activeCabangId!)
      // Find whether to also append tahunId according to selection
      if (elektronik.input.tahun != null) {
        payload.append("tahunId", elektronik.input.tahun.id);
      }
      // Append all checked spesifikasi
      for (let spek of elektronik.input.spesifikasiBarangJenis) {
        payload.append("spesifikasiId", spek);
      }
      for (let spek of elektronik.input.spesifikasiBarangMerk) {
        payload.append("spesifikasiId", spek);
      }
      if (!isNullOrEmpty(elektronik.input.noImei)) {
        payload.append("imeiSn", elektronik.input.noImei)
      }

      loading.value = true
      const response = await barangService.GADAI_CALCULATE_ELEKTRONIK_SIMULASI(payload)

      if (response.data.noFaktur == "REFRESH_KONDISI") {
        toast.error("Harga barang baru saja diperbarui HO. Silahkan isi ulang Kondisi / Grade Barang!");

        input.kondisi = null
        const response = await barangService.GET_KONDISI_BARANG(elektronik.input.tipeBarang.id);
        elektronik.kondisiOpt = response.data.map((item: any) => {
          return { value: item.id, text: item.name }
        })

      }
      else {
        rincian.value = response.data;
        rincian.value.namaBarang = null;
        rincian.value.namaBarang = elektronik.input.jenisBarang.name + " - " + elektronik.input.merkBarang.name + " - " + elektronik.input.tipeBarang.name;
        rincian.activeTipe = elektronik.input.tipeBarang
      }
      loading.value = false;
    } catch (error: any) {
      loading.value = false;
      console.error(error);
      toast.error(error.response.data.reason);
      return error
    }
  }

  const calculateGadaiKendaraan = async (dataRincian: any = null, finalizePayment: any = false) => {
    try {
      let payload = new FormData()
      if (anggota.anggota.id != null) {
        payload.append("nasabahId", anggota.anggota.id)
      }

      payload.append("jenisPinjamanId", "2") // MARK HARDCODE
      payload.append("jenisId", kendaraan.input.jenisKendaraan.id)
      payload.append("merkId", kendaraan.input.merkKendaraan.id)
      payload.append("tipeId", kendaraan.input.tipeKendaraan.id)
      payload.append("kondisiId", kendaraan.input.kondisiKendaraan.value)
      payload.append("cabangId", cabang.activeCabangId!)

      payload.append("bpkbOnly", kendaraan.input.isBpkb)
      // Find whether to also append tahunId according to selection
      if (kendaraan.input.tahunKendaraan != null) {
        payload.append("tahunId", kendaraan.input.tahunKendaraan.id);
      }
      // Append all checked spesifikasi
      for (let spek of kendaraan.input.spesifikasiKendaraanJenis) {
        payload.append("spesifikasiId", spek);
      }
      for (let spek of kendaraan.input.spesifikasiKendaraanMerk) {
        payload.append("spesifikasiId", spek);
      }

      loading.value = true
      const response = await barangService.GADAI_CALCULATE_KENDARAAN_SIMULASI(payload)

      if (response.data.noFaktur == "REFRESH_KONDISI") {
        toast.error("Harga barang baru saja diperbarui HO. Silahkan isi ulang Kondisi / Grade Barang!");

        input.kondisi = null
        const response = await barangService.GET_KONDISI_BARANG(kendaraan.input.tipeKendaraan.id);
        kendaraan.optKendaraanKondisi = response.data.map((item: any) => {
          return { value: item.id, text: item.name }
        })

      }
      else {
        rincian.value = response.data;
        rincian.value.namaBarang = null;
        rincian.value.namaBarang = kendaraan.input.jenisKendaraan.name + " - " + kendaraan.input.merkKendaraan.name + " - " + kendaraan.input.tipeKendaraan.name;
        rincian.activeTipe = kendaraan.input.tipeKendaraan
      }
      loading.value = false;
    } catch (error: any) {
      loading.value = false;
      console.error(error);
      toast.error(error.response.data.reason);
      return error
    }
  }

  const calculateGadaiEmas = async (dataRincian: any = null, finalizePayment: any = false) => {
    try {

      // ==== VALIDATION PASSED
      let payload = new FormData()
      payload.append("jenisId", emas.input.jenisEmas.id)
      payload.append("cabangId", cabang.activeCabangId!)
      if (emas.input.jenisEmas.id == 251) {
        payload.append("merkId", emas.input.merkEmas.id)
        payload.append("tipeId", emas.input.tipeEmas.id)
        payload.append("berat", emas.input.jumlah.toString())
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
        const inputBatu = emas.input.batu
        const batu = Array.from(inputBatu, (item: any) => ({ ...item, ukuran: item.ukuran }));

        payload.append("berat", emas.input.beratKering)
        payload.append("beratKering", emas.input.beratKering)
        payload.append("gosokanHilang", emas.gosok.toString())
        payload.append("adaCap", emas.cap.toString())
        payload.append("adaKwitansi", emas.kwitansi.toString())
        payload.append("dataBatu", JSON.stringify(batu))
        //payload.append("adaPotonganPengait", (emas.input.potonganTambahan.findIndex(item => item.id == 1) != -1) ?true :false)
        // payload.append("capTempelan", (emas.input.potonganTambahan.findIndex(item => item.id == 2) != -1) ?true :false)
        payload.append("listSpekEmas", emas.input.potonganTambahan)


        if (emas.checkBeratTambahan == true) {
          payload.append("beratBatuTambahan", emas.input.beratTambahan)
        }


      }
      else if (emas.input.jenisEmas.id == 246) {
        payload.append("merkId", emas.input.merkEmas.id)
        payload.append("berat", emas.input.beratKering)
        payload.append("beratKering", emas.input.beratKering)
        payload.append("beratBasah", emas.input.beratBasah)
      }

      // Append all checked spesifikasi
      for (let spek of emas.input.spesifikasiBarangJenis) {
        payload.append("spesifikasiId", spek)
      }

      loading.value = true
      const response = await barangService.GADAI_CALCULATE_EMAS_SIMULASI(payload)

      if (response.data.noFaktur == "REFRESH_KONDISI") {
        toast.error("Harga barang baru saja diperbarui HO. Silahkan isi ulang Kondisi / Grade Barang!");

        input.kondisi = null
        const response = await barangService.GET_KONDISI_BARANG(kendaraan.input.tipeKendaraan.id);
        kendaraan.optKendaraanKondisi = response.data.map((item: any) => {
          return { value: item.id, text: item.name }
        })

      }
      else {


        let data = response.data
        rincian.value = data
        rincian.value.batu = []
        rincian.value.beratTambahan = null

        if (response.data.noFakturSuspectGanda != null) {
          rincian.value.showAlertNoFakturGanda = true
          rincian.value.alertGadai = "emas"
          rincian.value.alertNoFakturGanda = response.data.noFakturSuspectGanda
        }

        // Arrange nama lengkap barang
        if (emas.input.jenisEmas.id == 251) {
          rincian.value.namaEmas = "Emas " + emas.input.jenisEmas.name + " - " + emas.input.merkEmas.name + " " + emas.input.tipeEmas.name + ", " + emas.input.jumlah + " keping"
        }
        else if (emas.input.jenisEmas.id == 252) {
          let kwitansiCapGosok = ""
          if (emas.cap == true) {
            kwitansiCapGosok = " ( Ada Cap )"
          }
          if (emas.kwitansi == true) {
            kwitansiCapGosok = " ( Ada Kwitansi )"
          }
          if (emas.cap == true && emas.kwitansi == true) {
            kwitansiCapGosok = " ( Ada cap ) ( Ada kwitansi )"
          }
          rincian.value.namaEmas = "Emas " + emas.input.jenisEmas.name + kwitansiCapGosok + ". Total Berat Keseluruhan: " + emas.input.beratKering + " Gram, Total Potongan Berat : " + data.beratBatu + " Gram. Taksiran " + data.karatEmas + " karat"
        }
        else if (emas.input.jenisEmas.id == 257) {

          rincian.value.namaEmas = `Emas ${emas.input.jenisEmas.name}, ${emas.input.karatEmas.name}.`;

          rincian.value.namaEmas += (emas.gosok == false) ? " Gosokan Tidak Hilang" : " Gosokan Hilang";
          rincian.value.namaEmas += (emas.cap == true) ? ", Ada Cap" : ", Tidak Ada Cap";
          rincian.value.namaEmas += (emas.kwitansi == true) ? ", Ada Kwitansi" : ", Tidak Ada Kwitansi";

          rincian.value.namaEmas += `\nBerat Kering : ${emas.input.beratKering} gr. Potongan Berat : ${data.beratBatu} gr. Berat Bersih : ${data.beratEmas} gr.`

          let namaBarang = `Emas ${emas.input.jenisEmas.name}, ${emas.input.karatEmas.name}.`;
          let gosokCapKwitansi = (emas.gosok == false) ? " Gosokan Tidak Hilang" : " Gosokan Hilang";
          gosokCapKwitansi += (emas.cap == true) ? ", Ada Cap" : ", Tidak Ada Cap";
          gosokCapKwitansi += (emas.kwitansi == true) ? ", Ada Kwitansi" : ", Tidak Ada Kwitansi";

          let batuBarang = `\nBerat Kering : ${emas.input.beratKering} gr. Potongan Berat : ${data.beratBatu} gr. Berat Bersih : ${data.beratEmas} gr.`

          rincian.value.namaBarang = namaBarang
          rincian.value.gosokCapKwitansi = gosokCapKwitansi
          rincian.value.batuBarang = batuBarang

          rincian.value.batu = emas.input.batu
          if (emas.checkBeratTambahan == true) {
            rincian.value.beratTambahan = emas.input.beratTambahan
          }
        }
        else {
          rincian.value.namaEmas = "Emas " + emas.input.jenisEmas.name + ", " + emas.input.merkEmas.name + " - " + emas.input.beratKering + " Gram (Volume " + emas.input.beratBasah + ") - " + rincian.value.karatEmas + " karat"
        }
      }
      loading.value = false;
    } catch (error: any) {
      loading.value = false;
      console.error(error);
      toast.error(error.response.data.reason);
      return error
    }
  }

  const cetakSimulasi = async () => {
    try {
      loading.value = true;
      let payload = new FormData();
      payload.append("cabangId", cabang.activeCabangId!)
      let sendToServer: any = {};
      sendToServer.barang = {};
      sendToServer.barang.barang = rincian.value.namaBarang;
      sendToServer.barang.hargaBarang = addThousandSeparator(rincian.value.hargaBarang);
      sendToServer.barang.kondisi = "Kondisi - Grade " + rincian.value.perhitunganKondisi.name;
      sendToServer.barang.potonganKondisi = addThousandSeparator(rincian.value.perhitunganKondisi.nominal);
      sendToServer.spesifikasi = [];
      rincian.value.perhitunganSpek.forEach((element: { name: any; nominal: any; }) => {
        let temp: any = {};
        temp.name = element.name;
        temp.nominal = addThousandSeparator(element.nominal);
        sendToServer.spesifikasi.push(temp);
      });
      sendToServer.pinjamanMaksimum = addThousandSeparator(rincian.value.maksimumPinjaman);
      sendToServer.pinjamanMinimum = addThousandSeparator(rincian.value.minimumPinjaman);
      sendToServer.hargaTaksiran = addThousandSeparator(rincian.value.hargaTaksiran);
      if (rincian.value.perhitunganAdjustmentSkemaDidepan != null)
        sendToServer.adjustmentJasaDidepan = addThousandSeparator(rincian.value.perhitunganAdjustmentSkemaDidepan);
      payload.append("input", JSON.stringify(sendToServer));

      const response = await barangService.CETAK_SIMULASI(payload);
      loading.value = false;
      return BASE_FILE_PATH + response.data.name;

    } catch (error: any) {
      console.error(error)
    }
  }

  return {
    input,
    rincian,
    calculateGadaiElektronik,
    calculateGadaiKendaraan,
    calculateGadaiEmas,
    cetakSimulasi,
    loading,
    tab
  };
});
