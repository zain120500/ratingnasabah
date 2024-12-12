import { defineStore } from "pinia";
import barangService from "~/services/barang";
import { toast } from "vue3-toastify";
import { isNullOrEmpty, removeThousandSeparator } from "~/utils/helper";
import anggotaService from "~/services/anggota";

export const useKendaraan = defineStore("kendaraan", () => {
  const anggota = useAnggota()
  const suratEdaran = useSuratEdaran()
  interface Input {
    isBpkb: boolean,
    jenisKendaraan: any,
    merkKendaraan: any,
    tipeKendaraan: any,
    tahunKendaraan: any,
    kondisiKendaraan: any,
    warnaKendaraan: any,
    statusKendaraan: any,
    kelengkapanKendaraan: any,
    spesifikasiKendaraanJenis: any,
    spesifikasiKendaraanMerk: any,
    noPolisi: string,
    boxSatu: string,
    boxDua: string,
    boxTiga: string,

    namaStnk: string,
    kotaStnk: any,
    kotaStnkId: any,
    kecamatanStnk: any,
    kelurahanDesaStnk: any,
    alamatStnk: string,
    masaBerlakuStnk: string,
    submitMasaBerlakuStnk: string,
    rtStnk: string,
    rwStnk: string,
    copy: boolean,

    kotaOpt: [],
    kecamatanOpt: [],
    kelurahanOpt: [],

    noBpkb: string,
    namaBpkb: string,
    noMesin: string,
    noRangka: string,
    promo: any,
    nilaiPinjaman: number,
    useVoucher: boolean,
    voucherCode: string,
    fotoPendukung: any,

    nominalHargaLainnya: any,
    nominalAdminFeeLainnya: any,
    
    tunai: 0,
    rekeningSelect: null,

    optKendaraanTahun: any
  }

  const input: any = ref<Input>({

    isBpkb: true,
    jenisKendaraan: null,
    merkKendaraan: null,
    tipeKendaraan: null,
    tahunKendaraan: null,
    kondisiKendaraan: null,
    warnaKendaraan: null,
    statusKendaraan: null,
    kelengkapanKendaraan: [],
    spesifikasiKendaraanJenis: [],
    spesifikasiKendaraanMerk: [],
    noPolisi: "",
    boxSatu: "",
    boxDua: "",
    boxTiga: "",

    namaStnk: "",
    kotaStnk: null,
    kotaStnkId: null,
    kecamatanStnk: null,
    kelurahanDesaStnk: null,
    alamatStnk: "",
    masaBerlakuStnk: "",
    submitMasaBerlakuStnk: "",
    rtStnk: '',
    rwStnk: '',
    copy: false,

    kotaOpt: [],
    kecamatanOpt: [],
    kelurahanOpt: [],

    noBpkb: "",
    namaBpkb: "",
    noMesin: "",
    noRangka: "",
    promo: [],

    fotoPendukung: [
      {
        index: 0,
        id: 0,
        namaFoto: "Foto KTP",
        foto: null,
        fotoBase64: null,
        require: true
      },
      {
        index: 1,
        id: 1,
        namaFoto: "SS verifikasi WA (Terlihat no WA nasabah)",
        foto: null,
        fotoBase64: null,
        require: true
      },
      {
        index: 2,
        id: 2,
        namaFoto: "Foto BPKB halaman Identitas Pemilik",
        foto: null,
        fotoBase64: null,
        require: true
      },
      {
        index: 3,
        id: 3,
        namaFoto: "Foto BPKB halaman Identitas Motor",
        foto: null,
        fotoBase64: null,
        require: true
      },
      {
        index: 4,
        id: 4,
        namaFoto: "Foto BPKB halaman Identitas Perubahan (opsional)",
        foto: null,
        fotoBase64: null,
        require: false
      },
      {
        index: 5,
        id: 5,
        namaFoto: "Foto STNK tampak depan (pajak tahunan)",
        foto: null,
        fotoBase64: null,
        require: true
      },
      {
        index: 6,
        id: 6,
        namaFoto: "Foto STNK tampak belakang (pajak 5 tahun) (opsional)",
        foto: null,
        fotoBase64: null,
        require: false
      },
      {
        index: 7,
        id: 7,
        namaFoto: "Nasabah + Motor",
        foto: null,
        fotoBase64: null,
        require: true
      },

    ],

    nominalHargaLainnya: null,
    nominalAdminFeeLainnya: null,

    nilaiPinjaman: 0,
    useVoucher: false,
    voucherCode: "",
    tunai: 0,
    rekeningSelect: null,

    optKendaraanTahun:[]
  })

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
    alertNoPol: "",
    alertNoFakturGanda: "",
    alertNoMesin: "",
    alertGadai: "kend",
  })


  const loading = ref(false)

  const optKendaraanJenis: any = ref([])
  const optKendaraanMerk: any = ref([])
  const optKendaraanTipe: any = ref([])
  const optKendaraanTahun: any = ref([])
  const optKendaraanKondisi: any = ref([])
  const optKendaraanSpekJenis: any = ref({
    penambahan: [],
    pengurangan: []
  })
  const optKendaraanSpekMerk: any = ref({
    penambahan: [],
    pengurangan: []
  })
  const optKelengkapanKendaraan: any = ref([])
  const optKendaraanWarna: any = ref([])

  const optPromo: any = ref([])


  const suratEdaranJenis: any = ref([])
  const suratEdaranMerk: any = ref([])
  const suratEdaranTipe: any = ref([])
  const suratEdaranKondisi: any = ref([])
  const suratEdaranTahun: any = ref([])
  const showSeKondisi: any = ref(false)
  const suratEdaranKelengkapan: any = ref([])

  const getJenisKendaraan = async () => {
    try {
      const response = await barangService.GET_JENIS_KENDARAAN();

      optKendaraanJenis.value = response.data;
    } catch (error: any) {
      loading.value = false;

      console.log(error);
    }
  };


  const getMerkKendaraan = async () => {
    try {
      loading.value = true;
      const response = await barangService.GET_MERK_BARANG(
        input.value.jenisKendaraan.id
      );

      optKendaraanMerk.value = response.data;
      loading.value = false;
    } catch (error: any) {
      loading.value = false;
      console.log(error);
    }
  };


  const getTipeKendaraan = async () => {
    try {
      loading.value = true;
      const response = await barangService.GET_TIPE_BARANG(
        input.value.merkKendaraan.id
      );
      optKendaraanTipe.value = response.data;
      loading.value = false;
    } catch (error: any) {
      loading.value = false;
      console.log(error);
    }
  };


  const getKendaraanJenis = async () => {
    try {
      loading.value = true;

      const response = await barangService.GET_DETAIL_BARANG_JENIS(input.value.jenisKendaraan.id);
      if (response.data.suratEdaran.length != 0) {
        suratEdaranJenis.value = response.data.suratEdaran
      } else {
        suratEdaranJenis.value = []
      }
      optKelengkapanKendaraan.value = response.data.kelengkapan;
      loading.value = false;
    } catch (error: any) {
      loading.value = false;
      console.log(error);
    }
  }

  const getKelengkapan = async () => {
    try {
      loading.value = true;
      const response = await barangService.GET_KELENGKAPAN_BARANG(
        input.value.jenisKendaraan.id
      );
      suratEdaranKelengkapan.value = await suratEdaran.getSuratEdaran(`kelengkapan${input.value.jenisKendaraan.id}`, 'kelengkapan')
      optKelengkapanKendaraan.value = response.data;
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
        input.value.jenisKendaraan.id
      );
      optKendaraanSpekJenis.value = response.data;
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
        input.value.merkKendaraan.id
      );
      optKendaraanSpekMerk.value = response.data;
      loading.value = false;
    } catch (error: any) {
      loading.value = false;
      console.log(error);
    }
  };

  const getBarangMerk = async () => {
    try {
      loading.value = true;

      const response = await barangService.GET_DETAIL_BARANG_MERK(input.value.merkKendaraan.id);
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
      loading.value = false;
      console.log(error);
    }
  }

  const getBarangTipe = async () => {
    try {
      loading.value = true;

      const response = await barangService.GET_DETAIL_BARANG_TIPE(input.value.tipeKendaraan.id);

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

      console.log(error);
    }
  }

  const getKondisiGrade = async () => {
    try {
      loading.value = true;
      const response = await barangService.GET_KONDISI_BARANG(
        input.value.tipeKendaraan.id
      );
      optKendaraanKondisi.value = []
      let responseKondisi = response.data
      responseKondisi = responseKondisi.filter((item: any) => item.isActive == true)
      for (let y = 0; y < responseKondisi.length; y++) {
        let dataKondisi: any = {}
        dataKondisi.value = responseKondisi[y].id
        dataKondisi.text = responseKondisi[y].name.substring(4)
        optKendaraanKondisi.value.push(dataKondisi)
      }

      loading.value = false;
    } catch (error: any) {
      loading.value = false;
      console.log(error);
    }
  };

  const getTipeTahun = async () => {
    try {
      loading.value = true;
      const response = await barangService.GET_TIPE_TAHUN(
        input.value.tipeKendaraan.id
      );
      optKendaraanTahun.value = response.data;
      input.value.optKendaraanTahun = response.data
      loading.value = false;
    } catch (error: any) {
      loading.value = false;
      console.log(error);
    }
  };

  const getWarna = async () => {
    try {
      loading.value = true;
      const response = await barangService.GET_WARNA_BARANG();
      optKendaraanWarna.value = response.data;
      loading.value = false;
    } catch (error: any) {
      loading.value = false;
      console.log(error);
    }
  };

  const searchKota = async (query: string) => {
    try {
      if (query.length >= 4) {
        loading.value = true;
        const response = await anggotaService.GET_KOTA(query);
        input.value.kotaOpt = response.data
        loading.value = false;
      }
    } catch (error) {
      console.error(error);
      loading.value = false;
    }
  };

  const searchKecamatan = async (idKota: number) => {
    try {

      loading.value = true;
      const response = await anggotaService.GET_KECAMATAN(idKota);
      input.value.kecamatanOpt = response.data;
      loading.value = false;

    } catch (error) {
      console.error(error);
      loading.value = false;
    }
  };

  const searchKelurahan = async (idKec: number) => {
    try {

      loading.value = true;
      const response = await anggotaService.GET_KELURAHAN(idKec);
      input.value.kelurahanOpt = response.data;
      loading.value = false;

    } catch (error: any) {
      loading.value = false;
      console.log(error);
    }
  };


  const salinData = async () => {
    input.value.rtStnk = await anggota.copyStnk.rt;
    input.value.rwStnk = await anggota.copyStnk.rw;
    input.value.alamatStnk = await anggota.copyStnk.alamat;
    input.value.kotaStnk = await anggota.copyStnk.kota;
    input.value.kecamatanStnk = await anggota.copyStnk.kecamatan;
    input.value.kelurahanDesaStnk = await anggota.copyStnk.kelurahan;
  }


  const preparePayload = (data: any = null, finalizePayment: any = false) => {

    const anggota = useAnggota()
    const cabang = useCabang()
    let payload = new FormData()

    payload.append("nasabahId", anggota.anggota.id)
    payload.append("jenisPinjamanId", '2') // MARK HARDCODE
    payload.append("jenisBarangId", input.value.jenisKendaraan.id)
    payload.append("merkId", input.value.merkKendaraan.id)
    payload.append("tipeId", input.value.tipeKendaraan.id)
    payload.append("kondisiId", input.value.kondisiKendaraan.value)
    payload.append("cabangId", cabang.activeCabangId!)
    payload.append("finalizePayment", finalizePayment)
    payload.append("warnaId", input.value.warnaKendaraan.id)
    payload.append("isBpkb", input.value.isBpkb)
    payload.append("statusKendaraan", input.value.statusKendaraan)

    payload.append("stnkAtasNama", input.value.namaStnk)
    payload.append("kotaStnk", input.value.kotaStnkId)
    payload.append("kecamatanStnk", input.value.kecamatanStnk)
    payload.append("kelurahanStnk", input.value.kelurahanDesaStnk)
    payload.append("rtStnk", input.value.rtStnk)
    payload.append("rwStnk", input.value.rwStnk)
    payload.append("stnkAlamat", input.value.alamatStnk)
    payload.append("stnkMasaBerlakuPajak", input.value.masaBerlakuStnk)

    payload.append("noBpkb", input.value.noBpkb)
    payload.append("bpkbAtasNama", input.value.namaBpkb)
    payload.append("noMesin", input.value.noMesin)
    payload.append("noRangka", input.value.noRangka)
    payload.append("noPolisi", input.value.noPolisi)

    if (input.value.nominalHargaLainnya != null) payload.append("hargaBarangLainnya", input.value.nominalHargaLainnya)
    if (input.value.nominalAdminFeeLainnya != null) payload.append("adminFeeLainnya", input.value.nominalAdminFeeLainnya)

    // Append all checked spesifikasi
    for (let spek of input.value.spesifikasiKendaraanJenis) {
      payload.append("spesifikasiId", spek)
    }

    for (let spek of input.value.spesifikasiKendaraanMerk) {
      payload.append("spesifikasiId", spek)
    }

    // Append promo, if any is selected
    input.value.promo.forEach((promoId: any) => {
      payload.append("promoIds", promoId)
    })

    // Kelengkapan
    if (input.value.kelengkapanKendaraan.length != 0) {

      input.value.kelengkapanKendaraan.forEach((item: any) => {
        payload.append("kelengkapan", item.name)
      })

    }

    // Append tahun, if selected
    if (!isNullOrEmpty(input.value.tahunKendaraan)) {
      payload.append("tahunId", input.value.tahunKendaraan.id)
    }


    // Append peminjaman dan voucher code, if data is not null
    if (data != null) {
      let nilaiPinjaman = removeThousandSeparator(data.nilaiPinjaman)
      input.value.voucherCode = data.voucherCode
      input.value.useVoucher = data.useVoucher

      payload.append("jumlahPinjaman", nilaiPinjaman.toString())
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
      const response = await barangService.GADAI_CALCULATE_KENDARAAN(payload)

      if (response.data.noFaktur == 'REFRESH_KONDISI') {
        toast.error("Harga barang baru saja diperbarui HO. Silahkan isi ulang Kondisi / Grade Barang!");

        input.kondisi = null
        const response = await barangService.GET_KONDISI_BARANG(input.value.tipeBarang.id);
        optKendaraanKondisi.values = response.data.map((item: any) => {
          return { value: item.id, text: item.name }
        })

      } else {
        let data = response.data

        rincian.value = data

        if (response.data.noFakturSuspectGanda != null) {
          rincian.value.showAlertNoFakturGanda = true
          rincian.value.alertNoPol = input.value.noPolisi
          rincian.value.alertNoMesin = input.value.noMesin
          rincian.value.alertGadai = "kend"
          rincian.value.alertNoFakturGanda = response.data.noFakturSuspectGanda
        }

        // Arrange nama lengkap barang
        rincian.value.namaBarang = `${input.value.jenisKendaraan.name} - ${input.value.merkKendaraan.name} - ${input.value.tipeKendaraan.name}`
        if (input.value.tahunKendaraan != null) {
          rincian.value.namaBarang += ` - ${input.value.tahunKendaraan.tahun}`
        }

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

    input.value.isBpkb = true,
      input.value.jenisKendaraan = null,
      input.value.merkKendaraan = null,
      input.value.tipeKendaraan = null,
      input.value.tahunKendaraan = null,
      input.value.kondisiKendaraan = null,
      input.value.warnaKendaraan = null,
      input.value.statusKendaraan = null,
      input.value.kelengkapanKendaraan = [],
      input.value.spesifikasiKendaraanJenis = [],
      input.value.spesifikasiKendaraanMerk = [],
      input.value.noPolisi = "",
      input.value.boxSatu = "",
      input.value.boxDua = "",
      input.value.boxTiga = "",

      input.value.namaStnk = "",
      input.value.kotaStnk = null,
      input.value.kotaStnkId = null,
      input.value.kecamatanStnk = null,
      input.value.kelurahanDesaStnk = null,
      input.value.alamatStnk = "",
      input.value.masaBerlakuStnk = "",
      input.value.submitMasaBerlakuStnk = "",
      input.value.rtStnk = '',
      input.value.rwStnk = '',
      input.value.copy = false,

      input.value.kotaOpt = [],
      input.value.kecamatanOpt = [],
      input.value.kelurahanOpt = [],

      input.value.noBpkb = "",
      input.value.namaBpkb = "",
      input.value.noMesin = "",
      input.value.noRangka = "",
      input.value.promo = [],
      input.value.nilaiPinjaman = 0,
      input.value.useVoucher = false,
      input.value.voucherCode = "",

      input.value.fotoPendukung = [
        {
          index: 0,
          id: 0,
          namaFoto: "Foto KTP",
          foto: null,
          fotoBase64: null,
          require: true
        },
        {
          index: 1,
          id: 1,
          namaFoto: "SS verifikasi WA (Terlihat no WA nasabah)",
          foto: null,
          fotoBase64: null,
          require: true
        },
        {
          index: 2,
          id: 2,
          namaFoto: "Foto BPKB halaman Identitas Pemilik",
          foto: null,
          fotoBase64: null,
          require: true
        },
        {
          index: 3,
          id: 3,
          namaFoto: "Foto BPKB halaman Identitas Motor",
          foto: null,
          fotoBase64: null,
          require: true
        },
        {
          index: 4,
          id: 4,
          namaFoto: "Foto BPKB halaman Identitas Perubahan (opsional)",
          foto: null,
          fotoBase64: null,
          require: false
        },
        {
          index: 5,
          id: 5,
          namaFoto: "Foto STNK tampak depan (pajak tahunan)",
          foto: null,
          fotoBase64: null,
          require: true
        },
        {
          index: 6,
          id: 6,
          namaFoto: "Foto STNK tampak belakang (pajak 5 tahun) (opsional)",
          foto: null,
          fotoBase64: null,
          require: false
        },
        {
          index: 7,
          id: 7,
          namaFoto: "Nasabah + Motor",
          foto: null,
          fotoBase64: null,
          require: true
        },

      ],

      input.value.nominalHargaLainnya = null,
      input.value.nominalAdminFeeLainnya = null
  }

  const resetRincian = () => {
    rincian.value.namaBarang = "",
      rincian.value.hargaBarang = 0,
      rincian.value.maksimumPinjaman = 0,
      rincian.value.minimumPinjaman = 0,
      rincian.value.perhitunganPromo = null,
      rincian.value.perhitunganKondisi = {},
      rincian.value.perhitunganSpek = [],
      rincian.value.perhitunganBonusGadaiPertama = {},
      rincian.value.perhitunganStatusAnggota = {},
      rincian.value.biayaAdmin = 0,
      rincian.value.noFaktur = "",
      rincian.value.showAlertNoFakturGanda = "false",
      rincian.value.alertNoPol = "",
      rincian.value.alertNoFakturGanda = "",
      rincian.value.alertNoMesin = "",
      rincian.value.alertGadai = "kend"
  }

  return {
    input,
    getJenisKendaraan,
    getMerkKendaraan,
    getTipeKendaraan,
    optKendaraanJenis,
    optKendaraanMerk,
    optKendaraanTipe,
    optKendaraanTahun,
    optKendaraanKondisi,
    optKendaraanSpekJenis,
    optKendaraanSpekMerk,
    optKelengkapanKendaraan,
    optKendaraanWarna,
    optPromo,
    suratEdaranJenis,
    suratEdaranMerk,
    suratEdaranTipe,
    loading,
    getKendaraanJenis,
    getKelengkapan,
    getSpesifikasi,
    getSpesifikasiMerk,
    getBarangMerk,
    getBarangTipe,
    suratEdaranTahun,
    suratEdaranKondisi,
    showSeKondisi,
    getKondisiGrade,
    getTipeTahun,
    getWarna,
    suratEdaranKelengkapan,
    searchKota,
    searchKecamatan,
    searchKelurahan,
    salinData,
    calculateGadai,
    rincian,
    confirmGadai,
    submitGadai,
    resetInput,
    resetRincian
  };
});
