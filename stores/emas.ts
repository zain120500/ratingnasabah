import { defineStore } from "pinia";
import barangService from "~/services/barang";
import { toast } from "vue3-toastify";
import { isNullOrEmpty, removeThousandSeparator } from "~/utils/helper";

export const useEmas = defineStore("emas", () => {

  const suratEdaran = useSuratEdaran()

  const anggota = useAnggota()
  interface Input {
    jenisEmas: any,
    merkEmas: any,
    tipeEmas: any,
    karatEmas: any,
    spesifikasiBarangJenis: [],
    kelengkapanBarang: [],
    beratKering: any,
    beratBasah: any,
    jumlah: number,
    keterangan: string,
    promo: [],
    warnaBatu: any,

    fotoPendukung: any,

    batu: any,
    beratTambahan: any,
    potonganTambahan: any,

    nilaiPinjaman: number,
    useVoucher: boolean,
    voucherCode: string,
    tunai: number,
    rekeningSelect: any,
  }
  const input = ref<Input>({
    jenisEmas: null,
    merkEmas: null,
    tipeEmas: null,
    karatEmas: null,
    spesifikasiBarangJenis: [],
    kelengkapanBarang: [],
    beratKering: null,
    beratBasah: null,
    jumlah: 1,
    keterangan: "",
    promo: [],
    warnaBatu: null,

    fotoPendukung: [],

    batu: [],
    beratTambahan: null,
    potonganTambahan: [],

    nilaiPinjaman: 0,
    useVoucher: false,
    voucherCode: "",
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

    namaEmas: ''
  })

  const hargaEmasSekarang: any = ref('');
  const jasaEmas: any = ref({ entries: [] });

  const jenisEmasOpt: any = ref([]);
  const merkEmasOpt: any = ref([]);
  const tipeEmasOpt: any = ref([]);

  const kelengkapanOpt: any = ref([]);
  const spesifikasiJenisOpt: any = ref([]);
  const spesifikasiMerkOpt: any = ref([]);
  const loading = ref(false);

  const cap = ref(true)
  const kwitansi = ref(true)
  const gosok = ref(true)
  const checkBeratTambahan = ref(false)

  const suratEdaranJenis: any = ref([])
  const suratEdaranMerk: any = ref([])
  const suratEdaranKondisi: any = ref([])
  const suratEdaranTipe: any = ref([])
  const suratEdaranTahun: any = ref([])
  const showSeKondisi: any = ref(false)
  const suratEdaranKelengkapan: any = ref([])
  const optPotonganTambahan: any = ref([])


  const karatCalculated = ref(false)

  const batuOpt = [
    { name: "2/100", value: 0.02 },
    { name: "3/100", value: 0.03 },
    { name: "4/100", value: 0.04 },
    { name: "5/100", value: 0.05 },
    { name: "6/100", value: 0.06 },
    { name: "7/100", value: 0.07 },
    { name: "8/100", value: 0.08 },
    { name: "9/100", value: 0.09 },
    { name: "10/100", value: 0.1 },
    { name: "15/100", value: 0.15 },
    { name: "20/100", value: 0.2 },
    { name: "25/100", value: 0.25 },
    { name: "30/100", value: 0.3 },
    { name: "35/100", value: 0.35 },
    { name: "40/100", value: 0.4 },
    { name: "45/100", value: 0.45 },
    { name: "50/100", value: 0.5 },
    { name: "55/100", value: 0.55 },
    { name: "60/100", value: 0.6 },
    { name: "65/100", value: 0.65 },
    { name: "70/100", value: 0.7 },
    { name: "75/100", value: 0.75 },
    { name: "80/100", value: 0.8 },
    { name: "85/100", value: 0.85 },
    { name: "90/100", value: 0.9 },
    { name: "1", value: 1 },
    { name: "1,25", value: 1.25 },
    { name: "1,50", value: 1.5 },
    { name: "1,75", value: 1.75 },
    { name: "2", value: 2 },
    { name: "2,5", value: 2.5 },
    { name: "3", value: 3 },
    { name: "3,5", value: 3.5 },
    { name: "4", value: 4 },
    { name: "4,5", value: 4.5 },
    { name: "5", value: 5 },
  ]

  const getJenisEmas = async () => {
    try {
      const response = await barangService.GET_JENIS_EMAS();
      jenisEmasOpt.value = response.data;
    } catch (error: any) {
      loading.value = false;
      console.log(error);
    }
  };

  const getMerkEmas = async () => {
    try {
      loading.value = true;
      const response = await barangService.GET_MERK_BARANG(
        input.value.jenisEmas.id
      );
      merkEmasOpt.value = response.data;
      loading.value = false;
    } catch (error: any) {
      loading.value = false;
      console.log(error);
    }
  };

  const getTipeEmas = async () => {
    try {
      loading.value = true;
      const response = await barangService.GET_TIPE_BARANG(
        input.value.merkEmas.id
      );
      tipeEmasOpt.value = response.data;
      loading.value = false;
    } catch (error: any) {
      loading.value = false;
      console.log(error);
    }
  };

  const getHargaEmasSekarang = async () => {
    try {
      loading.value = true;
      const response = await barangService.GET_HARGA_EMAS_SEKARANG();
      hargaEmasSekarang.value = response.data.id;
      loading.value = false;
    } catch (error: any) {
      loading.value = false;
      console.log(error);
    }
  };

  const getKelengkapan = async () => {
    try {
      loading.value = true;
      const response = await barangService.GET_KELENGKAPAN_BARANG(
        input.value.jenisEmas.id
      );
      suratEdaranKelengkapan.value = await suratEdaran.getSuratEdaran(`kelengkapan${input.value.jenisEmas.id}`, 'kelengkapan')
      kelengkapanOpt.value = response.data;
      loading.value = false;
    } catch (error: any) {
      loading.value = false;
      console.log(error);
    }
  };

  const getSpesifikasi = async () => {
    try {
      loading.value = true;
      const response = await barangService.GET_SPESIFIKASI_BARANG(
        input.value.jenisEmas.id
      );
      spesifikasiJenisOpt.value = response.data;
      loading.value = false;
    } catch (error: any) {
      loading.value = false;
      console.log(error);
    }
  };

  const getSpesifikasiMerk = async () => {
    try {
      loading.value = true;
      const response = await barangService.GET_SPESIFIKASI_MERK_BARANG(
        input.value.merkEmas.id
      );
      spesifikasiMerkOpt.value = response.data;
      loading.value = false;
    } catch (error: any) {
      loading.value = false;
      console.log(error);
    }
  };

  const preparePayload = (data: any = null, finalizePayment: any = false) => {
    const anggota = useAnggota()
    const cabang = useCabang()
    let payload = new FormData()

    payload.append("nasabahId", anggota.anggota.id)

    payload.append("jenisId", input.value.jenisEmas.id)
    if (input.value.jenisEmas.id == 251) {
      payload.append("merkId", input.value.merkEmas.id)
      payload.append("tipeId", input.value.tipeEmas.id)
      payload.append("berat", input.value.jumlah.toString())
    }
    if (input.value.jenisEmas.id == 252) {
      payload.append("berat", input.value.beratKering)
      payload.append("beratKering", input.value.beratKering)
      payload.append("adaCap", cap.value.toString())
      payload.append("adaKwitansi", kwitansi.value.toString())
      payload.append("dataBatu", JSON.stringify(input.value.batu))
      if (cap.value == true) {
        payload.append("karatBerbatu", input.value.karatEmas.value)
      }
    }
    else if (input.value.jenisEmas.id == 246) {
      payload.append("merkId", input.value.merkEmas.id)
      payload.append("berat", input.value.beratKering)
      payload.append("beratKering", input.value.beratKering)
      payload.append("beratBasah", input.value.beratBasah)
    }

    if (input.value.jenisEmas.id == 257) {
      payload.append("merkId", input.value.merkEmas.id)
      payload.append("tipeId", input.value.karatEmas.id)
      const inputBatu = input.value.batu
      const batu = Array.from(inputBatu, (item: any) => ({ ...item, ukuran: item.ukuran }));

      payload.append("berat", input.value.beratKering)
      payload.append("beratKering", input.value.beratKering)
      payload.append("gosokanHilang", gosok.value.toString())
      payload.append("adaCap", cap.value.toString())
      payload.append("adaKwitansi", kwitansi.value.toString())
      payload.append("dataBatu", JSON.stringify(batu))
      // payload.append("adaPotonganPengait", (input.value.potonganTambahan.findIndex(item => item.id == 1) != -1) ?true :false)
      //payload.append("capTempelan", (input.value.potonganTambahan.findIndex(item => item.id == 2) != -1) ?true :false)
      payload.append("listSpekEmas", input.value.potonganTambahan.toString())

      if (checkBeratTambahan.value == true) {
        payload.append("beratBatuTambahan", input.value.beratTambahan)
      }

    }
    payload.append("cabangId", cabang.activeCabangId!)
    payload.append("finalizePayment", finalizePayment)
    payload.append("keterangan", input.value.keterangan)

    // Kelengkapan
    if (input.value.kelengkapanBarang.length != 0) {
      input.value.kelengkapanBarang.forEach((item: any) => {
        payload.append("kelengkapan", item.name)
      })
    }


    // Append all checked spesifikasi
    for (let spek of input.value.spesifikasiBarangJenis) {
      payload.append("spesifikasiId", spek)
    }

    // Append promo, if any is selected
    input.value.promo.forEach(promoId => {
      payload.append("promoIds", promoId)
    })

    // Append peminjaman dan voucher code, if data is not null
    if (data != null) {

      input.value.voucherCode = data.voucherCode
      input.value.useVoucher = data.useVoucher

      payload.append("jumlahPinjaman", removeThousandSeparator(data.nilaiPinjaman).toString())
      payload.append("paymentType", data.tunai)
      if (data.rekeningSelect != null) {
        payload.append("rekeningNasabah", data.rekeningSelect)
      }
      if (data.useVoucher == true) {
        payload.append("voucherCode", data.voucherCode)
      }

    }

    // Upload photo and no referensi antrian only if on final step
    if (finalizePayment) {

      let jsonFoto: any = []
      input.value.fotoPendukung.forEach(function (entry: any) {
        jsonFoto.push(entry.fotoBase64)
      })
      payload.append("foto", JSON.stringify(jsonFoto))

      // if(this.$route.query.ref != null) {
      //     payload.append("noRefAntrian", this.$route.query.ref)
      // }


    }
    return payload
  }

  const calculateGadai = async (dataRincian: any = null, finalizePayment: any = false) => {
    try {
      loading.value = true;
      const payload = preparePayload(dataRincian, finalizePayment)
      const response = await barangService.GADAI_CALCULATE_EMAS(payload)


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
      if (input.value.jenisEmas.id == 251) {
        rincian.value.namaEmas = "Emas " + input.value.jenisEmas.name + " - " + input.value.merkEmas.name + " " + input.value.tipeEmas.name + ", " + input.value.jumlah + " keping"
      }
      else if (input.value.jenisEmas.id == 252) {
        let kwitansiCapGosok = ""
        if (cap.value == true) {
          kwitansiCapGosok = " ( Ada Cap )"
        }
        if (kwitansi.value == true) {
          kwitansiCapGosok = " ( Ada Kwitansi )"
        }
        if (cap.value == true && kwitansi.value == true) {
          kwitansiCapGosok = " ( Ada cap ) ( Ada kwitansi )"
        }
        rincian.value.namaEmas = "Emas " + input.value.jenisEmas.name + kwitansiCapGosok + ". Total Berat Keseluruhan: " + input.value.beratKering + " Gram, Total Potongan Berat : " + data.beratBatu + " Gram. Taksiran " + data.karatEmas + " karat"
      }
      else if (input.value.jenisEmas.id == 257) {

        rincian.value.namaEmas = `Emas ${input.value.jenisEmas.name}, ${input.value.karatEmas.name}.`;

        rincian.value.namaEmas += (gosok.value == false) ? " Gosokan Tidak Hilang" : " Gosokan Hilang";
        rincian.value.namaEmas += (cap.value == true) ? ", Ada Cap" : ", Tidak Ada Cap";
        rincian.value.namaEmas += (kwitansi.value == true) ? ", Ada Kwitansi" : ", Tidak Ada Kwitansi";

        rincian.value.namaEmas += `\nBerat Kering : ${input.value.beratKering} gr. Potongan Berat : ${data.beratBatu} gr. Berat Bersih : ${data.beratEmas} gr.`

        let namaBarang = `Emas ${input.value.jenisEmas.name}, ${input.value.karatEmas.name}.`;
        let gosokCapKwitansi = (gosok.value == false) ? " Gosokan Tidak Hilang" : " Gosokan Hilang";
        gosokCapKwitansi += (cap.value == true) ? ", Ada Cap" : ", Tidak Ada Cap";
        gosokCapKwitansi += (kwitansi.value == true) ? ", Ada Kwitansi" : ", Tidak Ada Kwitansi";

        let batuBarang = `\nBerat Kering : ${input.value.beratKering} gr. Potongan Berat : ${data.beratBatu} gr. Berat Bersih : ${data.beratEmas} gr.`

        rincian.value.namaBarang = namaBarang
        rincian.value.gosokCapKwitansi = gosokCapKwitansi
        rincian.value.batuBarang = batuBarang

        rincian.value.batu = input.value.batu
        if (checkBeratTambahan.value == true) {
          rincian.value.beratTambahan = input.value.beratTambahan
        }
      }
      else {
        rincian.value.namaEmas = "Emas " + input.value.jenisEmas.name + ", " + input.value.merkEmas.name + " - " + input.value.beratKering + " Gram (Volume " + input.value.beratBasah + ") - " + rincian.value.karatEmas + " karat"
      }

      loading.value = false;
    } catch (error: any) {
      loading.value = false;
      toast.error(error.response.data.reason);
      return error
    }
  }

  const confirmGadai = () => {
    return calculateGadai(input.value)
  }

  const submitGadai = async () => {
    return await calculateGadai(input.value, true)
  }

  const resetInput = () => {
    input.value.jenisEmas = null
    input.value.merkEmas = null
    input.value.tipeEmas = null
    input.value.karatEmas = null
    input.value.spesifikasiBarangJenis = []
    input.value.kelengkapanBarang = []
    input.value.beratKering = null
    input.value.beratBasah = null
    input.value.jumlah = 1
    input.value.keterangan = ""
    input.value.promo = []
    input.value.warnaBatu = null

    input.value.fotoPendukung = []

    input.value.batu = []
    input.value.beratTambahan = null
    input.value.potonganTambahan = []

    input.value.nilaiPinjaman = 0
    input.value.useVoucher = false
    input.value.voucherCode = ""
    input.value.tunai = 0
    input.value.rekeningSelect = null

    karatCalculated.value = false
    checkBeratTambahan.value = false
  }

  const resetRincian = () => {
    rincian.value.namaBarang = ""
    rincian.value.hargaBarang = 0
    rincian.value.maksimumPinjaman = 0
    rincian.value.minimumPinjaman = 0
    rincian.value.perhitunganPromo = null
    rincian.value.perhitunganKondisi = {}
    rincian.value.perhitunganSpek = []
    rincian.value.perhitunganBonusGadaiPertama = {}
    rincian.value.perhitunganStatusAnggota = {}
    rincian.value.biayaAdmin = 0
    rincian.value.noFaktur = ""
    rincian.value.showAlertNoFakturGanda = "false"
    rincian.value.alertNoImei = ""
    rincian.value.alertNoFakturGanda = ""
    rincian.value.alertGadai = "elek"
    rincian.value.warnCpuZ = false
  }

  const getBarangJenis = async () => {
    try {
      loading.value = true;

      const response = await barangService.GET_DETAIL_BARANG_JENIS(input.value.jenisEmas.id);
      if (response.data.suratEdaran.length != 0) {
        suratEdaranJenis.value = response.data.suratEdaran
      } else {
        suratEdaranJenis.value = []
      }
      kelengkapanOpt.value = response.data.kelengkapan;
      loading.value = false;
    } catch (error: any) {
      loading.value = false;
      console.log(error);
    }
  }

  const getBarangMerk = async () => {
    try {
      loading.value = true;

      const response = await barangService.GET_DETAIL_BARANG_MERK(input.value.merkEmas.id);

      if (response.data.kondisi[0].suratEdaran.length != 0) {
        let seKondisi: any = []
        for (var se of response.data.kondisi[0].suratEdaran) {
          seKondisi.push(se)
        }
        suratEdaranKondisi.value = seKondisi
      } else {
        suratEdaranKondisi.value = []
      }
      suratEdaranMerk.value = response.data.suratEdaran
      loading.value = false;
    } catch (error: any) {
      loading.value = false
      console.log(error);
    }
  }

  const getBarangTipe = async () => {
    try {
      loading.value = true;

      const response = await barangService.GET_DETAIL_BARANG_TIPE(input.value.tipeEmas.id);
      if (response.data.suratEdaran.length != 0) {
        let seKondisi: any = []
        let seTipe: any = []
        let seTahun: any = []
        for (var se of response.data.suratEdaran) {

          if (se.jenis == "kondisi") {
            seKondisi.push(se)
          }
          if (se.jenis == "tahun") {
            seTahun.push(se)
          }
          if (se.jenis == "tipe") {
            seTahun.push(se)
          }
          seTipe.push(se)
        }

        if (seKondisi != null && seKondisi.length != 0) {
          suratEdaranKondisi.value = seKondisi
        }

        suratEdaranTipe.value = seTipe
        suratEdaranTahun.value = seTahun
        showSeKondisi.value = true
      } else {
        suratEdaranTipe.value = []
      }
      loading.value = false;
    } catch (error: any) {
      loading.value = false;
      console.log(error);
    }
  }

  const getJasaEmas = async () => {
    try {
      loading.value = true;
      const response = await barangService.GET_JASA_EMAS();
      jasaEmas.value.dibawah = addThousandSeparator(response.data.dibawah)
      jasaEmas.value.diatas = addThousandSeparator(response.data.diatas)
      jasaEmas.value.dibawahJasa1 = response.data.dibawahJasa1
      jasaEmas.value.dibawahJasa2 = response.data.dibawahJasa2
      jasaEmas.value.diatasJasa1 = response.data.diatasJasa1
      jasaEmas.value.diatasJasa2 = response.data.diatasJasa2
      jasaEmas.value.entries = []

      jasaEmas.value.entries.push({
        dari: "Dibawah",
        sampai: 'Rp. ' + addThousandSeparator(jasaEmas.value.dibawah),
        jasa1: jasaEmas.value.dibawahJasa1 + " %",
        jasa2: jasaEmas.value.dibawahJasa2 + " %"
      })

      for (var x of response.data.entries) {
        let nominalDari, nominalSampai = null
        nominalDari = 'Rp. ' + addThousandSeparator(x.dari);
        nominalSampai = 'Rp. ' + addThousandSeparator(x.sampai);

        jasaEmas.value.entries.push({
          dari: nominalDari,
          sampai: nominalSampai,
          jasa1: x.jasa1 + " %",
          jasa2: x.jasa2 + " %"
        })
      }

      jasaEmas.value.entries.push({
        dari: "Diatas",
        sampai: 'Rp. ' + addThousandSeparator(jasaEmas.value.diatas),
        jasa1: jasaEmas.value.diatasJasa1 + " %",
        jasa2: jasaEmas.value.diatasJasa2 + " %"
      })

      loading.value = false;

    } catch (error: any) {
      loading.value = false;
      console.log(error);
    }
  };

  const getKaratOpt = async () => {
    try {
      loading.value = true
      const response = await barangService.GET_KARAT_OPT(input.value.merkEmas.id, gosok.value, cap.value, kwitansi.value)
      tipeEmasOpt.value = response.data
      loading.value = false
    } catch (error) {
      loading.value = false
    }
  }

  const getOptPotonganTambahan = async () => {
    try {
      loading.value = true
      const response = await barangService.GET_OPT_POTONGAN_TAMBAHAN()
      optPotonganTambahan.value = response.data
      loading.value = false
    } catch (error) {
      loading.value = false
    }
  }


  return {
    input,
    loading,
    getJenisEmas,
    jenisEmasOpt,
    getMerkEmas,
    merkEmasOpt,
    tipeEmasOpt,
    getTipeEmas,
    getKelengkapan,
    kelengkapanOpt,
    getSpesifikasi,
    spesifikasiJenisOpt,
    getSpesifikasiMerk,
    spesifikasiMerkOpt,

    preparePayload,
    calculateGadai,
    rincian,
    confirmGadai,
    submitGadai,
    resetInput,
    resetRincian,
    getBarangJenis,
    suratEdaranJenis,
    getBarangMerk,
    suratEdaranMerk,
    suratEdaranKondisi,
    getBarangTipe,
    suratEdaranTipe,
    suratEdaranTahun,
    showSeKondisi,
    suratEdaranKelengkapan,
    getHargaEmasSekarang,
    hargaEmasSekarang,
    getJasaEmas,
    jasaEmas,
    gosok,
    cap,
    kwitansi,
    getKaratOpt,
    batuOpt,
    checkBeratTambahan,
    optPotonganTambahan,
    getOptPotonganTambahan,
    karatCalculated
  };
});
