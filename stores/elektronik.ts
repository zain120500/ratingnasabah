import { defineStore } from "pinia";
import barangService from "~/services/barang";
import { toast } from "vue3-toastify";
import { isNullOrEmpty, removeThousandSeparator } from "~/utils/helper";

export const useElektronik = defineStore("elektronik", () => {

  const suratEdaran = useSuratEdaran()

  const anggota = useAnggota()
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
    alasanPerubahan: string;
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
    alasanPerubahan: "",
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

  const jenisBarangOpt: any = ref([]);
  const merkBarangOpt: any = ref([]);
  const tipeBarangOpt: any = ref([]);
  const kondisiOpt: any = ref([]);
  const warnaOpt: any = ref([]);
  const kelengkapanOpt: any = ref([]);
  const spesifikasiJenisOpt: any = ref([]);
  const spesifikasiMerkOpt: any = ref([]);
  const optElektTahun: any = ref([]);
  const optRAM = ref([1, 2, 3, 4, 6, 8, 16, 32, 64, 128]);
  const loading = ref(false);
  const optJenisHardisk = ref(["HDD", "SSD"]);
  const optHardiskHDD = ref([
    "< 199 (128GB)",
    "200 - 450 (250GB)",
    "451 - 900 (500GB)",
    "901 - 1900 (1TB)",
    "> 1901 (2TB)",
  ]);
  const optHardiskSSD = ref([
    "100 - 450 (250GB)",
    "451 - 900 (500GB)",
    "901 - 1900 (1TB)",
    "> 1901 (2TB)",
  ]);

  const suratEdaranJenis: any = ref([])
  const suratEdaranMerk: any = ref([])
  const suratEdaranKondisi: any = ref([])
  const suratEdaranTipe: any = ref([])
  const suratEdaranTahun: any = ref([])
  const showSeKondisi: any = ref(false)
  const suratEdaranKelengkapan: any = ref([])
  const idxFoto = ref(0)

  const fotoTipeBarang: any = ref([])
  const BASE_FILE_PATH = import.meta.env.VITE_BASE_FILE_PATH;

  const getJenisElektronik = async () => {
    try {
      const response = await barangService.GET_JENIS_ELEKTRONIK();
      jenisBarangOpt.value = response.data;
    } catch (error: any) {
      loading.value = false;
      console.log(error);
    }
  };

  const getMerkElektronik = async () => {
    try {
      loading.value = true;
      const response = await barangService.GET_MERK_BARANG(
        input.value.jenisBarang.id
      );
      merkBarangOpt.value = response.data;
      loading.value = false;
    } catch (error: any) {
      loading.value = false;
      console.log(error);
    }
  };

  const getTipeElektronik = async () => {
    try {
      loading.value = true;
      const response = await barangService.GET_TIPE_BARANG(
        input.value.merkBarang.id
      );
      tipeBarangOpt.value = response.data.types;
      loading.value = false;
    } catch (error: any) {
      loading.value = false;
      console.log(error);
    }
  };

  const getKondisiGrade = async () => {
    try {
      loading.value = true;
      const response = await barangService.GET_KONDISI_BARANG(
        input.value.tipeBarang.id
      );
      kondisiOpt.value = response.data;

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
      warnaOpt.value = response.data;
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
        input.value.jenisBarang.id
      );
      suratEdaranKelengkapan.value = await suratEdaran.getSuratEdaran(`kelengkapan${input.value.jenisBarang.id}`, 'kelengkapan')
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
        input.value.jenisBarang.id
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
        input.value.merkBarang.id
      );
      spesifikasiMerkOpt.value = response.data;
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
        input.value.tipeBarang.id
      );
      optElektTahun.value = response.data;
      loading.value = false;
    } catch (error: any) {
      loading.value = false;
      console.log(error);
    }
  };

  const getHardisk = () => {
    if (input.value.jenisBarang.id == 2) {
      optJenisHardisk.value = ["HDD", "SSD"];
      optHardiskSSD.value = [
        "100 - 450 (250GB)",
        "451 - 900 (500GB)",
        "901 - 1900 (1TB)",
        "> 1901 (2TB)",
      ];
      optHardiskHDD.value = [
        "< 199 (128GB)",
        "200 - 450 (250GB)",
        "451 - 900 (500GB)",
        "901 - 1900 (1TB)",
        "> 1901 (2TB)",
      ];
      input.value.gadaiJenisHardisk = null;
    } else if (
      input.value.jenisBarang.id == 69 ||
      input.value.jenisBarang.id == 73 ||
      input.value.jenisBarang.id == 77 ||
      input.value.jenisBarang.id == 81
    ) {
      optJenisHardisk.value = ["HDD", "SSD"];
      optHardiskSSD.value = [
        "≤ 128 (128GB)",
        "129 - 256 (256GB)",
        "257 - 512 (512GB)",
        "513 - 1000 (1TB)",
        "1001 - 2000 (2TB)",
      ];
      optHardiskHDD.value = [];
      input.value.gadaiJenisHardisk = null;
    }
  };

  const preparePayload = (data: any = null, finalizePayment: any = false) => {
    const anggota = useAnggota()
    const cabang = useCabang()
    let payload = new FormData()

    payload.append("nasabahId", anggota.anggota.id)
    payload.append("jenisPinjamanId", '1') // MARK HARDCODE
    payload.append("jenisBarangId", input.value.jenisBarang.id)
    payload.append("merkId", input.value.merkBarang.id)
    payload.append("tipeId", input.value.tipeBarang.id)
    payload.append("kondisiId", input.value.kondisi.id)
    payload.append("cabangId", cabang.activeCabangId!)
    payload.append("finalizePayment", finalizePayment)
    payload.append("warnaId", input.value.warnaBarang.id)
    payload.append("imeiSn", input.value.noImei)
    payload.append("keterangan", input.value.keterangan)

    let nominalHargaLainnya: any = removeThousandSeparator(input.value.nominalHargaLainnya)
    let nominalAdminFeeLainnya: any = removeThousandSeparator(input.value.nominalAdminFeeLainnya)

    if (!isNullOrEmpty(input.value.nominalHargaLainnya)) payload.append("hargaBarangLainnya", nominalHargaLainnya)
    if (!isNullOrEmpty(input.value.nominalAdminFeeLainnya)) payload.append("adminFeeLainnya", nominalAdminFeeLainnya)

    for (let spek of input.value.spesifikasiBarangJenis) {
      payload.append("spesifikasiId", spek)
    }

    for (let spek of input.value.spesifikasiBarangMerk) {
      payload.append("spesifikasiId", spek)
    }

    input.value.promo.forEach((promoId: any) => {
      payload.append("promoIds", promoId)
    })

    if (input.value.kelengkapanBarang.length != 0) {
      input.value.kelengkapanBarang.forEach((item: any) => {
        payload.append("kelengkapan", item)
      })

    }

    if (!isNullOrEmpty(input.value.tahun)) {
      payload.append("tahunId", input.value.tahun.id)
    }

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
      if (!isNullOrEmpty(input.value.password)) {
        payload.append("password", input.value.password)
      }

      // if(this.$route.query.ref != null) {
      //     payload.append("noRefAntrian", this.$route.query.ref)
      // }

      if (input.value.jenisBarang.id == 2) {
        payload.append("ram", input.value.ram)
        payload.append("spesifikasiLaptop", input.value.spesifikasiLaptop)
        payload.append("gadaiJenisHardisk", input.value.gadaiJenisHardisk)
        payload.append("gadaiSizeHardisk", input.value.gadaiSizeHardisk)
      }

      if (input.value.jenisBarang.id == 69 || input.value.jenisBarang.id == 73 || input.value.jenisBarang.id == 77 || input.value.jenisBarang.id == 81) {
        payload.append("gadaiJenisHardisk", input.value.gadaiJenisHardisk)
        if (input.value.gadaiSizeHardisk == undefined || input.value.gadaiSizeHardisk == null) {
          payload.append("gadaiSizeHardisk", '-')
        }
        else {
          payload.append("gadaiSizeHardisk", input.value.gadaiSizeHardisk)
        }
      }

    }
    return payload
  }

  const calculateGadai = async (dataRincian: any = null, finalizePayment: any = false) => {
    try {
      loading.value = true;
      const payload = preparePayload(dataRincian, finalizePayment)
      const response = await barangService.GADAI_CALCULATE_ELEKTRONIK(payload)

      if (response.data.noFaktur == 'REFRESH_KONDISI') {
        toast.error("Harga barang baru saja diperbarui HO. Silahkan isi ulang Kondisi / Grade Barang!");

        input.kondisi = null
        const response = await barangService.GET_KONDISI_BARANG(input.value.tipeBarang.id);
        kondisiOpt.values = response.data.map((item: any) => {
          return { value: item.id, text: item.name }
        })

      } else {
        let data = response.data

        rincian.value = data

        if (input.value.tunai == 1) {
          let idx = anggota.anggota.rekening.findIndex((item: any) => item.id == input.value.rekeningSelect)
          let rekeningNasabah = anggota.anggota.rekening[idx]

          input.value.rekeningNasabah = rekeningNasabah;
        }


        if (response.data.noFakturSuspectGanda != null) {
          rincian.value.showAlertNoFakturGanda = true
          rincian.value.alertNoImei = input.value.noImei
          rincian.value.alertGadai = "elek"
          rincian.value.alertNoFakturGanda = response.data.noFakturSuspectGanda
        }

        if (response.data.shouldWarnCpuZ && response.data.shouldWarnCpuZ == true) {
          rincian.value.warnCpuZ = true
        }

        rincian.value.namaBarang = `${input.value.jenisBarang.name} - ${input.value.merkBarang.name} - ${input.value.tipeBarang.name}`
        if (input.value.tahun != null) {
          rincian.value.namaBarang += ` - ${input.value.tahun.tahun}`
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
    input.value = {
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
      alasanPerubahan: "",
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
    }
    // input.value.noImei = ""
    // input.value.password = ""
    // input.value.jenisBarang = null
    // input.value.merkBarang = null
    // input.value.tipeBarang = null
    // input.value.tahun = null
    // input.value.kondisi = null
    // input.value.kelengkapanBarang = []
    // input.value.spesifikasiBarangJenis = []
    // input.value.spesifikasiBarangMerk = []
    // input.value.warnaBarang = null
    // input.value.keterangan = ""
    // input.value.promo = []
    // input.value.nilaiPinjaman = 0
    // input.value.useVoucher = false
    // input.value.voucherCode = ""
    // input.value.ram = 1
    // input.value.spesifikasiLaptop = ""
    // input.value.gadaiJenisHardisk = null
    // input.value.gadaiSizeHardisk = null

    // input.value.fotoPendukung = []

    // input.value.nominalHargaLainnya = null
    // input.value.nominalAdminFeeLainnya = null

    // input.value.tunai = 0
    // input.value.rekeningSelect = null
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

      const response = await barangService.GET_DETAIL_BARANG_JENIS(input.value.jenisBarang.id);
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

      const response = await barangService.GET_DETAIL_BARANG_MERK(input.value.merkBarang.id);

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

      const response: any = await barangService.GET_DETAIL_BARANG_TIPE(input.value.tipeBarang.id);
      fotoTipeBarang.value = response.data.foto

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

  const editGadai = async (id: string) => {
    try {
      loading.value = true;
      const response: any = await barangService.GET_GADAI_EDIT(id);

      input.value.jenisBarang = await response.data?.barang?.jenis
      input.value.merkBarang = await response.data?.barang?.merk
      input.value.tipeBarang = await response.data?.barang?.tipe
      await getKondisiGrade()
      input.value.kondisi = await response.data?.barang?.gradeKondisi

      let idxTahunGadai = await optElektTahun.value.findIndex((item: any) => item.name == response.data?.barang?.tahun);
      input.tahunGadai = optElektTahun[idxTahunGadai]

      let dataOptKondisi = await JSON.parse(JSON.stringify(kondisiOpt.value))
      let dataGradeKondisi = await dataOptKondisi.filter((item: any) => item.name == response.data?.barang?.gradeKondisi.name)
      if (dataGradeKondisi.length != 0) {
        input.value.kondisi = dataGradeKondisi[0]
      } else {
        input.value.kondisi = null
      }

      input.value.noImei = await response.data.barang.noImei
      input.value.password = await response.data.barang.password
      input.value.warnaBarang = await response.data.barang.warna
      input.value.keterangan = await response.data.barang.keterangan

      for await (var x of response.data.barang.kelengkapan) {
        kelengkapanOpt.value.push({
          id: x.id,
          name: x.name,
          isActive: x.isActive,
          checked: false
        })
      }
      //----------------- Inisialisasi Kelengkapn -----------------
      for await (var x of response.data.barang.kelengkapan) {

        let idx = kelengkapanOpt.value.findIndex((item: any) => item.name == x.trim());
        console.log(kelengkapanOpt.value[idx]);

        kelengkapanOpt.value[idx].checked = true
        if (idx != -1) input.value.kelengkapanBarang.push(kelengkapanOpt.value[idx].name)
      }

      for await (var x of response.data.barang.spesifikasi) {
        //----------------- Inisialisasi Spesifikasi Jenis -----------------

        let idxSpekJenisPenambahan = spesifikasiJenisOpt.value.penambahan.findIndex((item: any) => item.id == x.id);
        if (idxSpekJenisPenambahan >= 0) {
          input.value.spesifikasiBarangJenis.push(spesifikasiJenisOpt.value.penambahan[idxSpekJenisPenambahan].id)
        }
        let idxSpekJenisPengurangan = spesifikasiJenisOpt.value.pengurangan.findIndex((item: any) => item.id == x.id);
        if (idxSpekJenisPengurangan >= 0) {
          input.value.spesifikasiBarangJenis.push(spesifikasiJenisOpt.value.pengurangan[idxSpekJenisPengurangan].id)
        }
      }

      for await (var x of response.data.barang.spesifikasi) {
        //----------------- Inisialisasi Spesifikasi Merk -----------------
        let idxSpekMerkPenambahan = spesifikasiMerkOpt.value.penambahan.findIndex((item: any) => item.id == x.id);
        if (idxSpekMerkPenambahan >= 0) {
          input.value.spesifikasiBarangMerk.push(spesifikasiMerkOpt.value.penambahan[idxSpekMerkPenambahan].id)
        }
        let idxSpekMerkPengurangan = spesifikasiMerkOpt.value.pengurangan.findIndex((item: any) => item.id == x.id);
        if (idxSpekMerkPengurangan >= 0) {
          input.value.spesifikasiBarangMerk.push(spesifikasiMerkOpt.value.pengurangan[idxSpekMerkPengurangan].id)
        }
      }

      input.value.fotoPendukung = []
      for await (var x of response.data.foto) {
        input.value.fotoPendukung.push({
          index: idxFoto.value++,
          id: x.id,
          namaFoto: "Foto Pendukung " + (idxFoto.value + 1),
          name: name,
          foto: null,
          fotoBase64: BASE_FILE_PATH + x.name,
        })
      }

      loading.value = false;
    } catch (error: any) {
      loading.value = false;
      console.log(error);
    }
  }

  const submitEditGadai = async (id: string) => {
    try {
      let payload = new FormData()

      //----------------- Append Data Gadai -----------------
      console.log(id);
      console.log(input.value);

      payload.append("id", id)
      payload.append("jenisPinjamanId", '1') // MARK HARDCODE
      payload.append("jenisBarangId", input.value.jenisBarang.id)
      payload.append("merkId", input.value.merkBarang.id)
      payload.append("tipeId", input.value.tipeBarang.id)
      payload.append("kondisiId", input.value.kondisi.id)
      payload.append("warnaId", input.value.warnaBarang.id)
      payload.append("imeiSn", input.value.noImei)
      payload.append("keterangan", input.value.keterangan)
      payload.append("keteranganRevisi ", input.value.alasanPerubahan)

      if (!isNullOrEmpty(input.value.password)) {
        payload.append("password", input.value.password)
      }

      if (!isNullOrEmpty(input.value.tahunGadai)) {
        console.log('ada tahun id');
        payload.append("tahunId", input.value.tahunGadai.id)
      }

      // Append all checked spesifikasi
      for (let spek of input.value.spesifikasiBarangJenis) {
        payload.append("spesifikasiId", spek)
      }

      for (let spek of input.value.spesifikasiBarangMerk) {
        payload.append("spesifikasiId", spek)
      }

      // Kelengkapan
      // if(input.value.kelengkapanGadai.length != 0) {

      //     input.value.kelengkapanGadai.forEach(item => {
      //         payload.append("kelengkapan", item.name)
      //     })

      // }

      if (kelengkapanOpt.value.length != 0) {

        for (var item of kelengkapanOpt.value) {
          if (item.checked == true) {
            payload.append("kelengkapan", item.name)
          }
        }
      }



      // Upload photo only if on final step
      let jsonFoto: any = []
      input.value.fotoPendukung.forEach(function (entry: any) {
        jsonFoto.push(entry.fotoBase64)
      })
      payload.append("foto", JSON.stringify(jsonFoto))

      if (input.value.jenisBarang.id == 2) { // TODO HARDCODED JENIS
        payload.append("ram", input.value.ram)
        payload.append("spesifikasiLaptop", input.value.spesifikasiLaptop)
        payload.append("gadaiJenisHardisk", input.value.gadaiJenisHardisk)
        payload.append("gadaiSizeHardisk", input.value.gadaiSizeHardisk)
      }

      //----------------- Submit Semua Data -----------------

      loading.value = true

      const response: any = await barangService.POST_SUBMIT_GADAI_EDIT(id, payload);

      if (response.data.noFaktur == 'REFRESH_KONDISI') {
        toast.error("Harga barang baru saja diperbarui HO. Silahkan isi ulang Kondisi / Grade Barang!");

        input.kondisi = null
        const response = await barangService.GET_KONDISI_BARANG(input.value.tipeBarang.id);
        kondisiOpt.values = response.data.map((item: any) => {
          return { value: item.id, text: item.name }
        })
      } else {
        resetInput()
        toast.success(`Perubahan gadai berhasil diajukan!`)
        return navigateTo('/gadai/daftar/' + id)
        // if (this.$route.path.includes("inquiry-faktur")) {
        //   let path = this.$route.path.split('/')
        //   path.pop()
        //   path.pop()
        //   path = path.join("/")
        //   this.$router.push({ path })
        // } else {
        //   let path = this.$route.path.split('/')
        //   path.pop()
        //   path = path.join("/")
        //   this.$router.push({ path })
        // }
      }
      loading.value = false;
    } catch (error: any) {
      loading.value = false;
      console.log(error);
    }
  }



  watch(() => input.value.jenisBarang, (newValue) => {
    if (isNullOrEmpty(newValue)) {
      return
    }
    resetMerk()
    getMerkElektronik()
    getBarangJenis()
    getKelengkapan()
    getSpesifikasi()
  })

  watch(() => input.value.merkBarang, (newValue) => {
    if (isNullOrEmpty(newValue)) {
      return
    }
    resetTipe()
    getBarangMerk()
    getSpesifikasiMerk()
    getTipeElektronik()
  })

  watch(() => input.value.tipeBarang, async (newValue) => {

    if (isNullOrEmpty(newValue)) {
      return
    }

    await resetKondisi()
    await resetTahun()
    await getBarangTipe()
    await getKondisiGrade()
    await getTipeTahun()
    await getHardisk()
  })

  watch(() => input.value.gadaiJenisHardisk, (newValue) => {
    input.value.gadaiSizeHardisk = null
  })

  const resetJenis = () => {
    input.value.jenisBarang = null
    resetMerk()
    resetKelengkapan()
    resetSpesifikasi()
  }
  const resetMerk = () => {
    input.value.merkBarang = null
    merkBarangOpt.value = []
    resetTipe()
    resetSpesifikasiMerk()

    suratEdaranMerk.value = []
  }
  const resetTipe = () => {
    input.value.tipeBarang = null
    tipeBarangOpt.value = []
    resetKondisi()
    resetTahun()

    suratEdaranTipe.value = []
    suratEdaranKondisi.value = []
    showSeKondisi.value = false
  }
  const resetKondisi = () => {
    input.value.kondisi = null
    kondisiOpt.value = []
  }
  const resetKelengkapan = () => {
    input.value.kelengkapanBarang = []
    kelengkapanOpt.value = []
    suratEdaranKelengkapan.value = []
  }
  const resetSpesifikasi = () => {
    input.value.spesifikasiBarangJenis = []
    spesifikasiJenisOpt.value = []
  }
  const resetSpesifikasiMerk = () => {
    input.value.spesifikasiBarangMerk = []
    spesifikasiMerkOpt.value = []
  }
  const resetTahun = () => {
    input.value.tahun = null
    optElektTahun.value = []
  }


  return {
    input,
    loading,
    getJenisElektronik,
    jenisBarangOpt,
    getMerkElektronik,
    merkBarangOpt,
    tipeBarangOpt,
    getTipeElektronik,
    getKondisiGrade,
    kondisiOpt,
    getWarna,
    warnaOpt,
    getKelengkapan,
    kelengkapanOpt,
    getSpesifikasi,
    spesifikasiJenisOpt,
    getSpesifikasiMerk,
    spesifikasiMerkOpt,
    optElektTahun,
    getTipeTahun,
    optRAM,
    optHardiskSSD,
    optHardiskHDD,
    optJenisHardisk,
    getHardisk,
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
    fotoTipeBarang,
    editGadai,
    submitEditGadai
  };
});
