import { defineStore } from "pinia";
import anggotaService from "~/services/anggota";
import adjustPage from "~/utils/adjustPage";
import { isNullOrEmpty } from "~/utils/helper";
import { toast } from "vue3-toastify";
const BASE_FILE_PATH = import.meta.env.VITE_BASE_FILE_PATH;

export const useAnggota = defineStore("anggota", () => {
  const mdl = useUtilStore();
  const loading = ref(false);
  const anggota: any = ref({
    id: null,
    nama: "-",
    no: "-",
    noMember: null,
    jenisBarang: "-",
    jenisIdentitas: "-",
    noIdentitas: "-",
    noHp: "-",
    noRumah: "-",
    alamat: "-",
    isComplete: false,
    shouldUpdate: false,
    tanggalLahir: "-",
    rekening: [],
  });

  const anggotaDetail: any = ref({})

  const data: any = ref({ data: [] });
  interface Identitas {
    name: string;
    email: string;
    jenisIdentitas: any;
    noIdentitas: string;
    jenisKelamin: string;
    statusKawin: string;
    kewarganegaraan: string;
    tempatLahir: string;
    tanggalLahir: string;
    kota: any;
    kecamatan: any;
    kelurahan: any;
    rt: string;
    rw: string;
    alamatKtp: string;
    alamatTempatKerja: string;
    telpTempatKerja: string;
    pekerjaan: any;

    tempatLahirOpt: Array<{ id: number; name: string }>;
    kotaOpt: Array<{ id: number; name: string }>;
    kecamatanOpt: Array<{ id: number; name: string }>;
    kelurahanOpt: Array<{ id: number; name: string }>;
    pekerjaanOpt: Array<{ id: number; name: string }>;

    loadingKota: Boolean;
    loadingKecamatan: Boolean;
    loadingKelurahan: Boolean;
  }

  const dataIdentitas = ref<Identitas>({
    name: "",
    email: "",
    jenisIdentitas: 0,
    noIdentitas: "",
    jenisKelamin: "",
    statusKawin: "",
    kewarganegaraan: "",
    tempatLahir: "",
    tanggalLahir: "",
    kota: "",
    kecamatan: null,
    kelurahan: null,
    rt: "",
    rw: "",
    alamatKtp: "",
    alamatTempatKerja: "",
    telpTempatKerja: "",
    pekerjaan: null,

    tempatLahirOpt: [],
    kotaOpt: [],
    kecamatanOpt: [],
    kelurahanOpt: [],
    pekerjaanOpt: [],

    loadingKota: false,
    loadingKecamatan: false,
    loadingKelurahan: false,
  });

  interface DataAnggota {
    pekerjaan: string;
    noHandphoneSekarang: string;
    kotaSekarang: string;
    kecamatanSekarang: any | null;
    kelurahanDesaSekarang: any | null;
    rtSekarang: string;
    rwSekarang: string;
    alamatSekarang: string;
    kota: any;

    kotaOpt: Array<{ id: number; name: string }>;
    kecamatanOpt: Array<{ id: number; name: string }>;
    kelurahanOpt: Array<{ id: number; name: string }>;

    loadingKota: boolean;
    loadingKecamatan: boolean;
    loadingKelurahan: boolean;
  }

  const dataAnggota = ref<DataAnggota>({
    pekerjaan: "",
    noHandphoneSekarang: "",
    kotaSekarang: "",
    kecamatanSekarang: null,
    kelurahanDesaSekarang: null,
    rtSekarang: "",
    rwSekarang: "",
    alamatSekarang: "",
    kota: "",

    kotaOpt: [],
    kecamatanOpt: [],
    kelurahanOpt: [],

    loadingKota: false,
    loadingKecamatan: false,
    loadingKelurahan: false,
  });

  const dataKerabat = ref({
    namaSuamiAtauIstri: "",
    namaAyah: "",
    namaIbu: "",
    noHandphoneSuamiIstri: "",
    noHandphoneAyah: "",
    noHandphoneIbu: "",
  });

  interface DataPihakLain {
    namaPihakLain: string;
    hubunganPihakLain: string;
    noHandphonePihakLain: string;
    kotaPihakLain: string;
    kecamatanPihakLain: any;
    kelurahanDesaPihakLain: any;
    rtPihakLain: string;
    rwPihakLain: string;
    alamatPihakLain: string;

    kotaOpt: [];
    kecamatanOpt: Array<{ id: number; name: string }>;
    kelurahanOpt: Array<{ id: number; name: string }>;

    loadingKota: boolean;
    loadingKecamatan: boolean;
    loadingKelurahan: boolean;
  }
  const dataPihakLain = ref<DataPihakLain>({
    namaPihakLain: "",
    hubunganPihakLain: "",
    noHandphonePihakLain: "",
    kotaPihakLain: "",
    kecamatanPihakLain: null,
    kelurahanDesaPihakLain: null,
    rtPihakLain: "",
    rwPihakLain: "",
    alamatPihakLain: "",

    kotaOpt: [],
    kecamatanOpt: [],
    kelurahanOpt: [],

    loadingKota: false,
    loadingKecamatan: false,
    loadingKelurahan: false,
  });

  interface FotoData {
    index: number;
    id: number;
    namaFoto: string;
    foto: any | null;
    fotoBase64: any | null;
  }

  const dataFoto: any = ref([
    {
      index: 0,
      id: 0,
      namaFoto: "Foto Identitas",
      foto: null,
      fotoBase64: null,
    },
    {
      index: 1,
      id: 1,
      namaFoto: "Foto Pendukung 1",
      foto: null,
      fotoBase64: null,
    },
    {
      index: 2,
      id: 2,
      namaFoto: "Foto Pendukung 2",
      foto: null,
      fotoBase64: null,
    },
    {
      index: 3,
      id: 3,
      namaFoto: "Foto Pendukung 3",
      foto: null,
      fotoBase64: null,
    },
  ]);

  interface DataSurvei {
    surveiReferensi: string;
    surveiPernahGadai: string;
    surveiKompetitor: any;
  }

  const dataSurvei = ref<DataSurvei>({
    surveiReferensi: "",
    surveiPernahGadai: "",
    surveiKompetitor: [],
  });

  const optSurveiReferensi = ref([
    "Brosur",
    "Media Sosial (Instagram / Facebook)",
    "Banner / Lokasi langsung",
    "Rekomendasi Kerabat",
  ]);

  const optSurveiPernahGadai = ref(["Ya", "Tidak"]);
  const optSurveiKompetitor = ref([
    "Pegadaian Hijau",
    "Raja Gadai",
    "KSP",
    "Indo Gadai",
    "Bijak Gadai",
  ]);

  const isKompetitorLainnyaChecked = ref(false);
  const kompetitorLainnya = ref("");

  const reset = ref(true);
  const errorForm: any = ref([]);
  const isGadaiKendaraan = ref(false);
  const daftarGadaiAnggota: any = ref({ data: [] });

  const copyStnk: any = ref({
    alamat: null,
    kota: null,
    kecamatan: null,
    kelurahan: null,
    rt: null,
    rw: null,
  })
  const searchAnggota = async (
    by?: number,
    name?: string,
    date?: string,
    page?: number,
    size: number = 10
  ) => {
    try {
      loading.value = true;
      if (page) {
        page = adjustPage(page);
      }
      const response = await anggotaService.GET(by, name, date, page, size);

      data.value = response.data;
      data.value.lastPage = Math.ceil(data.value.total / size);

      loading.value = false;
    } catch (error) {
      console.error(error);
      data.value = 400;
      loading.value = false;
    }
  };

  const selectedAnggota = async (selectedAnggota: any) => {
    try {
      loading.value = true;

      (anggota.value.id = selectedAnggota.id),
        (anggota.value.nama = selectedAnggota.nama),
        (anggota.value.no = selectedAnggota.no),
        (anggota.value.noMember = selectedAnggota.noMember),
        (anggota.value.jenisBarang = selectedAnggota.jenisBarang),
        (anggota.value.jenisIdentitas = selectedAnggota.jenisIdentitas),
        (anggota.value.noIdentitas = selectedAnggota.noIdentitas),
        (anggota.value.noHp = selectedAnggota.noHp),
        (anggota.value.noRumah = selectedAnggota.noRumah),
        (anggota.value.alamat = selectedAnggota.alamat),
        (anggota.value.isComplete = selectedAnggota.isComplete),
        (anggota.value.shouldUpdate = selectedAnggota.shouldUpdate),
        (anggota.value.tanggalLahir = selectedAnggota.tanggalLahir);

      copyStnk.value.alamat = selectedAnggota.detail.alamatKtp
      copyStnk.value.kota = selectedAnggota.detail.kotaKtp
      copyStnk.value.kecamatan = selectedAnggota.detail.kecamatanKtp.id
      copyStnk.value.kelurahan = selectedAnggota.detail.kelurahanDesaKtp.id
      copyStnk.value.rt = selectedAnggota.detail.rtKtp
      copyStnk.value.rw = selectedAnggota.detail.rwKtp


      const response = await anggotaService.GET_REKENING(anggota.value.id);
      anggota.value.rekening = response.data;

      loading.value = false;
    } catch (error) {
      console.error(error);
      loading.value = false;
    }
  };

  const searchTempatLahir = async (query: string) => {
    try {
      if (query.length >= 4) {
        loading.value = true;
        const response = await anggotaService.GET_KOTA(query);
        loading.value = false;
        return (dataIdentitas.value.tempatLahirOpt = response.data);
      }
    } catch (error) {
      console.error(error);
      loading.value = false;
    }
  };

  const searchKota = async (idForm: number, query: string) => {
    try {
      if (query.length >= 4) {
        if (idForm === 1) {
          dataIdentitas.value.loadingKota = true;
          const response = await anggotaService.GET_KOTA(query);
          dataIdentitas.value.loadingKota = false;
          return (dataIdentitas.value.kotaOpt = response.data);
        }
        if (idForm === 2) {
          dataAnggota.value.loadingKota = true;
          const response = await anggotaService.GET_KOTA(query);
          dataAnggota.value.loadingKota = false;
          return (dataAnggota.value.kotaOpt = response.data);
        }
        if (idForm === 3) {
          dataPihakLain.value.loadingKota = true;
          const response = await anggotaService.GET_KOTA(query);
          dataPihakLain.value.loadingKota = false;
          return (dataPihakLain.value.kotaOpt = response.data);
        }
      }
    } catch (error) {
      console.error(error);
      loading.value = false;
    }
  };

  const searchKecamatan = async (idForm: number, idKota: number) => {
    try {
      if (idForm === 1) {
        dataIdentitas.value.loadingKecamatan = true;
        const response = await anggotaService.GET_KECAMATAN(idKota);
        dataIdentitas.value.kecamatanOpt = response.data;
        dataIdentitas.value.loadingKecamatan = false;
      }
      if (idForm === 2) {
        dataAnggota.value.loadingKecamatan = true;
        const response = await anggotaService.GET_KECAMATAN(idKota);
        dataAnggota.value.kecamatanOpt = response.data;
        dataAnggota.value.loadingKecamatan = false;
      }
      if (idForm === 3) {
        dataPihakLain.value.loadingKecamatan = true;
        const response = await anggotaService.GET_KECAMATAN(idKota);
        dataPihakLain.value.kecamatanOpt = response.data;
        dataPihakLain.value.loadingKecamatan = false;
      }
    } catch (error) {
      console.error(error);
      loading.value = false;
    }
  };

  const searchKelurahan = async (idForm: number, idKec: number) => {
    try {
      if (idForm === 1) {
        dataIdentitas.value.loadingKelurahan = true;
        const response = await anggotaService.GET_KELURAHAN(idKec);
        dataIdentitas.value.kelurahanOpt = response.data;
        dataIdentitas.value.loadingKelurahan = true;
      }

      if (idForm === 2) {
        dataAnggota.value.loadingKelurahan = true;
        const response = await anggotaService.GET_KELURAHAN(idKec);
        dataAnggota.value.kelurahanOpt = response.data;
        dataAnggota.value.loadingKelurahan = true;
      }

      if (idForm === 3) {
        dataPihakLain.value.loadingKelurahan = true;
        const response = await anggotaService.GET_KELURAHAN(idKec);
        dataPihakLain.value.kelurahanOpt = response.data;
        dataPihakLain.value.loadingKelurahan = true;
      }
    } catch (error: any) {
      loading.value = false;
      return toast.error(error.response.data.reason);
    }
  };

  const getPekerjaan = async () => {
    try {
      const response = await anggotaService.GET_PEKERJAAN();
      dataIdentitas.value.pekerjaanOpt = response.data;
    } catch (error: any) {
      loading.value = false;
      return toast.error(error.response.data.reason);
    }
  };

  const resetDataIdentitas = () => {
    dataIdentitas.value.name = "";
    dataIdentitas.value.jenisIdentitas = 0;
    dataIdentitas.value.noIdentitas = "";
    dataIdentitas.value.jenisKelamin = "";
    dataIdentitas.value.statusKawin = "";
    dataIdentitas.value.kewarganegaraan = "";
    dataIdentitas.value.tempatLahir = "";
    dataIdentitas.value.tanggalLahir = "";
    dataIdentitas.value.kota = "";
    dataIdentitas.value.kecamatan = null;
    dataIdentitas.value.kelurahan = null;
    dataIdentitas.value.rt = "";
    dataIdentitas.value.rw = "";
    dataIdentitas.value.alamatKtp = "";
    dataIdentitas.value.alamatTempatKerja = "";
    dataIdentitas.value.telpTempatKerja = "";
    dataIdentitas.value.pekerjaan = null;

    dataIdentitas.value.tempatLahirOpt = [];
    dataIdentitas.value.kotaOpt = [];
    dataIdentitas.value.kecamatanOpt = [];
    dataIdentitas.value.kelurahanOpt = [];
  };

  const resetDataAnggota = () => {
    dataAnggota.value.pekerjaan = "";
    dataAnggota.value.noHandphoneSekarang = "";
    dataAnggota.value.kotaSekarang = "";
    dataAnggota.value.kecamatanSekarang = null;
    dataAnggota.value.kelurahanDesaSekarang = null;
    dataAnggota.value.rtSekarang = "";
    dataAnggota.value.rwSekarang = "";
    dataAnggota.value.alamatSekarang = "";
    dataAnggota.value.kota = "";

    dataAnggota.value.kotaOpt = [];
    dataAnggota.value.kecamatanOpt = [];
    dataAnggota.value.kelurahanOpt = [];
  };

  const resetDataKerabat = () => {
    dataKerabat.value.namaSuamiAtauIstri = "";
    dataKerabat.value.namaAyah = "";
    dataKerabat.value.namaIbu = "";
    dataKerabat.value.noHandphoneSuamiIstri = "";
    dataKerabat.value.noHandphoneAyah = "";
    dataKerabat.value.noHandphoneIbu = "";
  };

  const resetDataPihakLain = () => {
    dataPihakLain.value.namaPihakLain = "";
    dataPihakLain.value.hubunganPihakLain = "";
    dataPihakLain.value.noHandphonePihakLain = "";
    dataPihakLain.value.kotaPihakLain = "";
    dataPihakLain.value.kecamatanPihakLain = null;
    dataPihakLain.value.kelurahanDesaPihakLain = null;
    dataPihakLain.value.rtPihakLain = "";
    dataPihakLain.value.rwPihakLain = "";
    dataPihakLain.value.alamatPihakLain = "";

    dataPihakLain.value.kotaOpt = [];
    dataPihakLain.value.kecamatanOpt = [];
    dataPihakLain.value.kelurahanOpt = [];
  };
  const resetDataFoto = () => {
    for (var item of dataFoto.value) {
      item.foto = null;
      item.fotoBase64 = null;
    }
  };

  const resetDataSurvei = () => {
    dataSurvei.value.surveiReferensi = "";
    dataSurvei.value.surveiPernahGadai = "";
    dataSurvei.value.surveiKompetitor = [];
    kompetitorLainnya.value = "";
  };

  const salinData = async () => {
    errorForm.value = [];
    if (isNullOrEmpty(dataIdentitas.value.kota)) {
      errorForm.value.push("kotaIdentitas");
    }
    if (isNullOrEmpty(dataIdentitas.value.kecamatan)) {
      errorForm.value.push("kecamatanIdentitas");
    }
    if (isNullOrEmpty(dataIdentitas.value.kelurahan)) {
      errorForm.value.push("kelurahanIdentitas");
    }
    if (isNullOrEmpty(dataIdentitas.value.rt)) {
      errorForm.value.push("rtIdentitas");
    }
    if (isNullOrEmpty(dataIdentitas.value.rw)) {
      errorForm.value.push("rwIdentitas");
    }
    if (isNullOrEmpty(dataIdentitas.value.alamatKtp)) {
      errorForm.value.push("alamatIdentitas");
    }
    if (errorForm.value.length != 0) {
      return toast.error("Mohon lengkapi Data Identitas!");
    } else {
      reset.value = false;

      dataAnggota.value.kotaOpt = await dataIdentitas.value.kotaOpt;
      dataAnggota.value.kecamatanOpt = await dataIdentitas.value.kecamatanOpt;
      dataAnggota.value.kelurahanOpt = await dataIdentitas.value.kelurahanOpt;
      dataAnggota.value.rtSekarang = await dataIdentitas.value.rt;
      dataAnggota.value.rwSekarang = await dataIdentitas.value.rw;
      dataAnggota.value.alamatSekarang = await dataIdentitas.value.alamatKtp;
      dataAnggota.value.kota = await dataIdentitas.value.kota;
      dataAnggota.value.kecamatanSekarang = await dataIdentitas.value.kecamatan;
      dataAnggota.value.kelurahanDesaSekarang = await dataIdentitas.value
        .kelurahan;
    }
  };

  const validateDataIdentitas = () => {
    let errorVal = false;
    if (isNullOrEmpty(dataIdentitas.value.name)) {
      errorVal = true;
      errorForm.value.push("nameIdentitas");
    }
    if (isNullOrEmpty(dataIdentitas.value.jenisIdentitas)) {
      errorVal = true;
      errorForm.value.push("jenisIdentitas");
    }
    if (isNullOrEmpty(dataIdentitas.value.noIdentitas)) {
      errorVal = true;
      errorForm.value.push("noIdentitas");
    }
    if (isNullOrEmpty(dataIdentitas.value.jenisKelamin)) {
      errorVal = true;
      errorForm.value.push("jenisKelaminIdentitas");
    }
    if (isNullOrEmpty(dataIdentitas.value.statusKawin)) {
      errorVal = true;
      errorForm.value.push("kawinIdentitas");
    }
    if (isNullOrEmpty(dataIdentitas.value.kewarganegaraan)) {
      errorVal = true;
      errorForm.value.push("kewarganegaraanIdentitas");
    }
    if (isNullOrEmpty(dataIdentitas.value.tempatLahir)) {
      errorVal = true;
      errorForm.value.push("tempatLahirIdentitas");
    }
    if (isNullOrEmpty(dataIdentitas.value.tanggalLahir)) {
      errorVal = true;
      errorForm.value.push("tanggalLahirIdentitas");
    }
    if (isNullOrEmpty(dataIdentitas.value.kota)) {
      errorVal = true;
      errorForm.value.push("kotaIdentitas");
    }
    if (isNullOrEmpty(dataIdentitas.value.kecamatan)) {
      errorVal = true;
      errorForm.value.push("kecamatanIdentitas");
    }
    if (isNullOrEmpty(dataIdentitas.value.kelurahan)) {
      errorVal = true;
      errorForm.value.push("kelurahanIdentitas");
    }
    if (isNullOrEmpty(dataIdentitas.value.rt)) {
      errorVal = true;
      errorForm.value.push("rtIdentitas");
    }
    if (isNullOrEmpty(dataIdentitas.value.rw)) {
      errorVal = true;
      errorForm.value.push("rwIdentitas");
    }
    if (isNullOrEmpty(dataIdentitas.value.alamatKtp)) {
      errorVal = true;
      errorForm.value.push("alamatIdentitas");
    }
    if (isNullOrEmpty(dataIdentitas.value.pekerjaan)) {
      errorVal = true;
      errorForm.value.push("pekerjaanIdentitas");
    }

    if (errorVal) {
      return toast.error("Mohon lengkapi Data Identitas!");
    }
  };

  const validateDataAnggota = () => {
    let errorVal = false;
    if (isNullOrEmpty(dataAnggota.value.noHandphoneSekarang)) {
      errorVal = true;
      errorForm.value.push("hpAnggota");
    }
    if (isNullOrEmpty(dataAnggota.value.kota)) {
      errorVal = true;
      errorForm.value.push("kotaAnggota");
    }
    if (isNullOrEmpty(dataAnggota.value.kecamatanSekarang)) {
      errorVal = true;
      errorForm.value.push("kecamatanAnggota");
    }
    if (isNullOrEmpty(dataAnggota.value.kelurahanDesaSekarang)) {
      errorVal = true;
      errorForm.value.push("kelurahanAnggota");
    }
    if (isNullOrEmpty(dataAnggota.value.rtSekarang)) {
      errorVal = true;
      errorForm.value.push("rtAnggota");
    }
    if (isNullOrEmpty(dataAnggota.value.rwSekarang)) {
      errorVal = true;
      errorForm.value.push("rwAnggota");
    }
    if (isNullOrEmpty(dataAnggota.value.alamatSekarang)) {
      errorVal = true;
      errorForm.value.push("alamatAnggota");
    }
    if (errorVal) {
      return toast.error("Mohon lengkapi Data Anggota!");
    }
  };

  const validateDataKerabat = () => {
    let errorVal = false;
    if (isNullOrEmpty(dataKerabat.value.namaAyah)) {
      errorForm.value.push("ayahKerabat");
      errorVal = true;
    }
    if (isNullOrEmpty(dataKerabat.value.namaIbu)) {
      errorForm.value.push("ibuKerabat");
      errorVal = true;
    }
    if (isNullOrEmpty(dataKerabat.value.noHandphoneAyah)) {
      errorForm.value.push("hpAyahKerabat");
      errorVal = true;
    }
    if (isNullOrEmpty(dataKerabat.value.noHandphoneIbu)) {
      errorForm.value.push("hpIbuKerabat");
      errorVal = true;
    }
    if (errorVal) {
      return toast.error("Mohon lengkapi Data Kerabat!");
    }
  };

  const validateDataPihakLain = () => {
    let errorVal = false;
    if (isNullOrEmpty(dataPihakLain.value.namaPihakLain)) {
      errorForm.value.push("namaPihakLain");
      errorVal = true;
    }
    if (isNullOrEmpty(dataPihakLain.value.hubunganPihakLain)) {
      errorForm.value.push("hubunganPihakLain");
      errorVal = true;
    }
    if (isNullOrEmpty(dataPihakLain.value.noHandphonePihakLain)) {
      errorForm.value.push("hpPihakLain");
      errorVal = true;
    }
    if (isNullOrEmpty(dataPihakLain.value.kotaPihakLain)) {
      errorForm.value.push("kotaPihakLain");
      errorVal = true;
    }
    if (isNullOrEmpty(dataPihakLain.value.kecamatanPihakLain)) {
      errorForm.value.push("kecamatanPihakLain");
      errorVal = true;
    }
    if (isNullOrEmpty(dataPihakLain.value.kelurahanDesaPihakLain)) {
      errorForm.value.push("kelurahanPihakLain");
      errorVal = true;
    }
    if (isNullOrEmpty(dataPihakLain.value.rtPihakLain)) {
      errorForm.value.push("rtPihakLain");
      errorVal = true;
    }
    if (isNullOrEmpty(dataPihakLain.value.rwPihakLain)) {
      errorForm.value.push("rwPihakLain");
      errorVal = true;
    }
    if (isNullOrEmpty(dataPihakLain.value.alamatPihakLain)) {
      errorForm.value.push("alamatPihakLain");
      errorVal = true;
    }

    if (errorVal) {
      return toast.error("Mohon lengkapi Data Pihak Lain!");
    }
  };

  const validateDataFoto = () => {
    if (isNullOrEmpty(dataFoto.value[0].fotoBase64)) {
      errorForm.value.push("datafoto");
      return toast.error("Mohon upload Foto Identitas!");
    }
  };

  const validateDataSurvei = () => {
    let errorVal = false;
    if (isNullOrEmpty(dataSurvei.value.surveiReferensi)) {
      errorForm.value.push("radioReferensi");
      errorVal = true;
    }
    if (isNullOrEmpty(dataSurvei.value.surveiPernahGadai)) {
      errorForm.value.push("radioPernahGadai");
      errorVal = true;
    }
    if (
      isNullOrEmpty(dataSurvei.value.surveiKompetitor) ||
      (isKompetitorLainnyaChecked.value &&
        isNullOrEmpty(kompetitorLainnya.value))
    ) {
      errorForm.value.push("checkboxKompetitor");
      errorVal = true;
    }

    if (errorVal) {
      return toast.error("Mohon lengkapi Data Survei!");
    }
  };

  const confirmSubmit = (isEdit: boolean = false, isGadaiBpkb: boolean = false) => {
    errorForm.value = [];

    validateDataIdentitas();
    validateDataAnggota();
    if (isGadaiBpkb) {
      validateDataKerabat();
      validateDataPihakLain();
    }
    validateDataFoto();
    if (!isEdit) {
      validateDataSurvei();
    }

    if (errorForm.value.length != 0) {
      return false;
    } else {
      return true;
    }
  };

  const onSubmit = async () => {
    try {
      loading.value = true;
      const cabangId: any = localStorage.getItem("activeCabangId");

      const formdata = new FormData();
      formdata.append("cabangId", cabangId);
      formdata.append("nama", dataIdentitas.value.name);
      formdata.append("jenisIdentitasId", dataIdentitas.value.jenisIdentitas);
      formdata.append("noIdentitas", dataIdentitas.value.noIdentitas);
      formdata.append("alamatKtp", dataIdentitas.value.alamatKtp);
      formdata.append("kelurahanDesaKtp", dataIdentitas.value.kelurahan.id);
      formdata.append("rtKtp", dataIdentitas.value.rt);
      formdata.append("rwKtp", dataIdentitas.value.rw);
      formdata.append("jenisKelamin", dataIdentitas.value.jenisKelamin);
      formdata.append("statusPerkawinan", dataIdentitas.value.statusKawin);
      formdata.append("kewarganegaraan", dataIdentitas.value.kewarganegaraan);
      formdata.append("alamatTempatKerja", dataIdentitas.value.alamatTempatKerja);
      formdata.append(
        "teleponTempatKerja",
        dataIdentitas.value.telpTempatKerja
      );
      formdata.append("pekerjaanBaru", dataIdentitas.value.pekerjaan.id);

      formdata.append("alamatSekarang", dataAnggota.value.alamatSekarang);
      formdata.append(
        "kelurahanDesaSekarang",
        dataAnggota.value.kelurahanDesaSekarang.id
      );
      formdata.append("rtSekarang", dataAnggota.value.rtSekarang);
      formdata.append("rwSekarang", dataAnggota.value.rwSekarang);
      formdata.append("kotaLahir", dataIdentitas.value.kota.id);
      formdata.append("tanggalLahir", dataIdentitas.value.tanggalLahir);
      formdata.append(
        "noHandphoneSekarang",
        dataAnggota.value.noHandphoneSekarang
      );
      formdata.append("pekerjaan", dataAnggota.value.pekerjaan);


      //----------------- Append Data Kerabat -----------------

      if (!isNullOrEmpty(dataKerabat.value.namaSuamiAtauIstri)) formdata.append('namaSuamiAtauIstri', dataKerabat.value.namaSuamiAtauIstri)
      if (!isNullOrEmpty(dataKerabat.value.namaAyah)) formdata.append('namaAyah', dataKerabat.value.namaAyah)
      if (!isNullOrEmpty(dataKerabat.value.namaIbu)) formdata.append('namaIbu', dataKerabat.value.namaIbu)
      if (!isNullOrEmpty(dataKerabat.value.noHandphoneSuamiIstri)) formdata.append('noHandphoneSuamiIstri', dataKerabat.value.noHandphoneSuamiIstri)
      if (!isNullOrEmpty(dataKerabat.value.noHandphoneAyah)) formdata.append('noHandphoneAyah', dataKerabat.value.noHandphoneAyah)
      if (!isNullOrEmpty(dataKerabat.value.noHandphoneIbu)) formdata.append('noHandphoneIbu', dataKerabat.value.noHandphoneIbu)

      //----------------- Append Data Pihak Lain -----------------

      if (!isNullOrEmpty(dataPihakLain.value.namaPihakLain)) formdata.append('namaPihakLain', dataPihakLain.value.namaPihakLain)
      if (!isNullOrEmpty(dataPihakLain.value.hubunganPihakLain)) formdata.append('hubunganPihakLain', dataPihakLain.value.hubunganPihakLain)
      if (!isNullOrEmpty(dataPihakLain.value.alamatPihakLain)) formdata.append('alamatPihakLain', dataPihakLain.value.alamatPihakLain)
      if (!isNullOrEmpty(dataPihakLain.value.rtPihakLain)) formdata.append('rtPihakLain', dataPihakLain.value.rtPihakLain)
      if (!isNullOrEmpty(dataPihakLain.value.rwPihakLain)) formdata.append('rwPihakLain', dataPihakLain.value.rwPihakLain)
      // if (!isNullOrEmpty(dataPihakLain.value.teleponRumahPihakLain)) formdata.append('teleponRumahPihakLain', dataPihakLain.value.teleponRumahPihakLain)
      if (!isNullOrEmpty(dataPihakLain.value.noHandphonePihakLain)) formdata.append('noHandphonePihakLain', dataPihakLain.value.noHandphonePihakLain)
      // if (!isNullOrEmpty(dataPihakLain.value.teleponKantorPihakLain)) formdata.append('teleponKantorPihakLain', dataPihakLain.value.teleponKantorPihakLain)

      if (dataPihakLain.value.kelurahanDesaPihakLain != null) {
        formdata.append('kelurahanDesaPihakLain', dataPihakLain.value.kelurahanDesaPihakLain.id)
      }


      if (dataFoto.value[0].fotoBase64 != null)
        formdata.append("fotoIdentitas", dataFoto.value[0].fotoBase64);

      if (dataFoto.value[1].fotoBase64 != null)
        formdata.append("fotoPendukung1", dataFoto.value[1].fotoBase64);

      if (dataFoto.value[2].fotoBase64 != null)
        formdata.append("fotoPendukung2", dataFoto.value[2].fotoBase64);

      if (dataFoto.value[3].fotoBase64 != null)
        formdata.append("fotoPendukung3", dataFoto.value[3].fotoBase64);

      formdata.append("surveyReferensi", dataSurvei.value.surveiReferensi);
      formdata.append("surveyPernahGadai", dataSurvei.value.surveiPernahGadai);
      formdata.append(
        "surveyKompetitor",
        dataSurvei.value.surveiKompetitor.length != 0
          ? dataSurvei.value.surveiKompetitor.join(", ")
          : ""
      );

      const response = await anggotaService.CREATE_ANGGOTA(formdata);
      anggota.value.id = response.data.id
      anggota.value.nama = response.data.name
      anggota.value.no = response.data.noAnggota
      anggota.value.noMember = null
      anggota.value.jenisIdentitas = response.data.jenisIdentitas
      anggota.value.noIdentitas = response.data.noIdentitas
      anggota.value.noHp = dataAnggota.value.noHandphoneSekarang
      anggota.value.noRumah = dataAnggota.value.noHandphoneSekarang
      anggota.value.alamat = dataAnggota.value.alamatSekarang
      anggota.value.isComplete = response.data.isComplete
      anggota.value.shouldUpdatePhone = false


      loading.value = false;

      mdl.modalToggleConfirm("modal-confirm");
      mdl.modalToggle("mAddAnggota");
      resetDataIdentitas();
      resetDataAnggota();
      resetDataKerabat();
      resetDataPihakLain();
      resetDataFoto();
      resetDataSurvei();
      return toast.success("Anggota telah dibuat!");
    } catch (error: any) {
      loading.value = false;
      return toast.error(error.response.data.reason);
    }
  };

  const onSubmitEdit = async () => {
    try {

      loading.value = true

      let formdata = new FormData()
      formdata.append('id', anggotaDetail.value.id)

      //----------------- Append Data KTP -----------------

      formdata.append('nama', dataIdentitas.value.name)

      formdata.append('email', (dataIdentitas.value.email != null) ? dataIdentitas.value.email : 'Pugindo@gmail.com')
      formdata.append('jenisIdentitasId', dataIdentitas.value.jenisIdentitas)
      formdata.append('noIdentitas', dataIdentitas.value.noIdentitas)
      formdata.append('cabangId', "1")
      formdata.append('alamatKtp', dataIdentitas.value.alamatKtp)
      formdata.append('kelurahanDesaKtp', dataIdentitas.value.kelurahan.id)
      formdata.append('rtKtp', dataIdentitas.value.rt)
      formdata.append('rwKtp', dataIdentitas.value.rw)
      formdata.append('jenisKelamin', dataIdentitas.value.jenisKelamin)
      formdata.append('statusPerkawinan', dataIdentitas.value.statusKawin)
      formdata.append('kewarganegaraan', dataIdentitas.value.kewarganegaraan)
      formdata.append('alamatTempatKerja', dataIdentitas.value.alamatTempatKerja)
      formdata.append('teleponTempatKerja', dataIdentitas.value.telpTempatKerja)
      formdata.append("pekerjaanBaru", dataIdentitas.value.pekerjaan.id);


      //----------------- Append Data Anggota Sekarang -----------------

      formdata.append("alamatSekarang", dataAnggota.value.alamatSekarang);
      formdata.append(
        "kelurahanDesaSekarang",
        dataAnggota.value.kelurahanDesaSekarang.id
      );
      formdata.append("rtSekarang", dataAnggota.value.rtSekarang);
      formdata.append("rwSekarang", dataAnggota.value.rwSekarang);
      formdata.append("kotaLahir", dataIdentitas.value.kota.id);
      formdata.append("tanggalLahir", dataIdentitas.value.tanggalLahir);
      formdata.append(
        "noHandphoneSekarang",
        dataAnggota.value.noHandphoneSekarang
      );
      formdata.append("pekerjaan", dataAnggota.value.pekerjaan);


      //----------------- Append Data Kerabat -----------------

      if (!isNullOrEmpty(dataKerabat.value.namaSuamiAtauIstri)) formdata.append('namaSuamiAtauIstri', dataKerabat.value.namaSuamiAtauIstri)
      if (!isNullOrEmpty(dataKerabat.value.namaAyah)) formdata.append('namaAyah', dataKerabat.value.namaAyah)
      if (!isNullOrEmpty(dataKerabat.value.namaIbu)) formdata.append('namaIbu', dataKerabat.value.namaIbu)
      if (!isNullOrEmpty(dataKerabat.value.noHandphoneSuamiIstri)) formdata.append('noHandphoneSuamiIstri', dataKerabat.value.noHandphoneSuamiIstri)
      if (!isNullOrEmpty(dataKerabat.value.noHandphoneAyah)) formdata.append('noHandphoneAyah', dataKerabat.value.noHandphoneAyah)
      if (!isNullOrEmpty(dataKerabat.value.noHandphoneIbu)) formdata.append('noHandphoneIbu', dataKerabat.value.noHandphoneIbu)

      //----------------- Append Data Pihak Lain -----------------

      if (!isNullOrEmpty(dataPihakLain.value.namaPihakLain)) formdata.append('namaPihakLain', dataPihakLain.value.namaPihakLain)
      if (!isNullOrEmpty(dataPihakLain.value.hubunganPihakLain)) formdata.append('hubunganPihakLain', dataPihakLain.value.hubunganPihakLain)
      if (!isNullOrEmpty(dataPihakLain.value.alamatPihakLain)) formdata.append('alamatPihakLain', dataPihakLain.value.alamatPihakLain)
      if (!isNullOrEmpty(dataPihakLain.value.rtPihakLain)) formdata.append('rtPihakLain', dataPihakLain.value.rtPihakLain)
      if (!isNullOrEmpty(dataPihakLain.value.rwPihakLain)) formdata.append('rwPihakLain', dataPihakLain.value.rwPihakLain)
      // if (!isNullOrEmpty(dataPihakLain.value.teleponRumahPihakLain)) formdata.append('teleponRumahPihakLain', dataPihakLain.value.teleponRumahPihakLain)
      if (!isNullOrEmpty(dataPihakLain.value.noHandphonePihakLain)) formdata.append('noHandphonePihakLain', dataPihakLain.value.noHandphonePihakLain)
      // if (!isNullOrEmpty(dataPihakLain.value.teleponKantorPihakLain)) formdata.append('teleponKantorPihakLain', dataPihakLain.value.teleponKantorPihakLain)

      if (dataPihakLain.value.kelurahanDesaPihakLain != null) {
        formdata.append('kelurahanDesaPihakLain', dataPihakLain.value.kelurahanDesaPihakLain.id)
      }

      //----------------- Append Data Foto -----------------


      if (dataFoto.value[0].fotoBase64 != null && dataFoto.value[0].fotoBase64 != BASE_FILE_PATH + anggotaDetail.value.detail.fotoKtp)
        formdata.append("fotoIdentitas", dataFoto.value[0].fotoBase64);

      if (dataFoto.value[1].fotoBase64 != null && dataFoto.value[1].fotoBase64 != BASE_FILE_PATH + anggotaDetail.value.detail.fotoPendukung1)
        formdata.append("fotoPendukung1", dataFoto.value[1].fotoBase64);

      if (dataFoto.value[2].fotoBase64 != null && dataFoto.value[2].fotoBase64 != BASE_FILE_PATH + anggotaDetail.value.detail.fotoPendukung2)
        formdata.append("fotoPendukung2", dataFoto.value[2].fotoBase64);

      if (dataFoto.value[3].fotoBase64 != null && dataFoto.value[3].fotoBase64 != BASE_FILE_PATH + anggotaDetail.value.detail.fotoPendukung3)
        formdata.append("fotoPendukung3", dataFoto.value[3].fotoBase64);

      //----------------- Submit Semua Data -----------------            

      const response = await anggotaService.CREATE_ANGGOTA(formdata);

      anggota.value.id = response.data.id
      anggota.value.nama = response.data.name
      anggota.value.no = response.data.noAnggota
      anggota.value.noMember = null
      anggota.value.jenisIdentitas = response.data.jenisIdentitas
      anggota.value.noIdentitas = response.data.noIdentitas
      anggota.value.noHp = dataAnggota.value.noHandphoneSekarang
      anggota.value.noRumah = dataAnggota.value.noHandphoneSekarang
      anggota.value.alamat = dataAnggota.value.alamatSekarang
      anggota.value.isComplete = response.data.isComplete
      anggota.value.shouldUpdatePhone = false


      loading.value = false;

      mdl.modalToggleConfirm("modal-confirm-edit-anggota");
      mdl.modalToggle("mEditAnggota");
      resetDataIdentitas();
      resetDataAnggota();
      resetDataKerabat();
      resetDataPihakLain();
      resetDataFoto();
      resetDataSurvei();
      return toast.success("Anggota telah diubah!");
    } catch (error: any) {
      loading.value = false;
      return toast.error(error.response.data.reason);
    }
  }

  const getAnggotaDetail = async () => {
    try {
      loading.value = true
      const response = await anggotaService.GET_DETAIL_ANGGOTA(anggota.value.id)
      await getDaftarGadaiAnggota()
      anggotaDetail.value = response.data
      loading.value = false
    } catch (error: any) {
      loading.value = false;
      return toast.error(error.response.data.reason);
    }
  }

  const getDaftarGadaiAnggota = async (
    page?: number,
    size: number = 10
  ) => {
    try {
      loading.value = true;
      if (page) {
        page = adjustPage(page);
      }
      const response = await anggotaService.GET_DAFTAR_GADAI_ANGGOTA(anggota.value.id, page, size);

      daftarGadaiAnggota.value = response.data;
      daftarGadaiAnggota.value.lastPage = Math.ceil(daftarGadaiAnggota.value.total / size);

      loading.value = false;
    } catch (error: any) {
      loading.value = false;
      return toast.error(error.response.data.reason);
    }
  };

  const resetPassword = async () => {
    try {
      loading.value = true
      await anggotaService.RESET_PASSWORD_NASABAH(anggota)

      mdl.modalToggleConfirm("resetPasswordSuccess");
      loading.value = false
    } catch (error: any) {
      loading.value = false;
      return toast.error(error.response.data.reason);
    }
  }

  const editAnggota = async () => {
    try {
      await getAnggotaDetail()
      // this.anggota = response.data

      //----------------- Inisialisasi Data KTP -----------------

      dataIdentitas.value.name = anggotaDetail.value.nama
      // dataIdentitas.value.email = anggotaDetail.value.email
      dataIdentitas.value.jenisIdentitas = anggotaDetail.value.jenisIdentitas.id
      dataIdentitas.value.noIdentitas = anggotaDetail.value.noIdentitas
      dataIdentitas.value.jenisKelamin = (anggotaDetail.value.detail.jenisKelamin == null) ? null : anggotaDetail.value.detail.jenisKelamin
      dataIdentitas.value.statusKawin = (anggotaDetail.value.detail.statusKawin == null) ? null : anggotaDetail.value.detail.statusKawin
      dataIdentitas.value.kewarganegaraan = (anggotaDetail.value.detail.kewarganegaraan == null) ? null : anggotaDetail.value.detail.kewarganegaraan
      dataIdentitas.value.tempatLahir = anggotaDetail.value.detail.kotaLahir
      dataIdentitas.value.alamatTempatKerja = (anggotaDetail.value.detail.alamatTempatKerja == null) ? null : anggotaDetail.value.detail.alamatTempatKerja
      dataIdentitas.value.telpTempatKerja = (anggotaDetail.value.detail.teleponTempatKerja == null) ? null : anggotaDetail.value.detail.teleponTempatKerja
      dataIdentitas.value.pekerjaan = (anggotaDetail.value.detail.pekerjaanBaru == null) ? null : anggotaDetail.value.detail.pekerjaanBaru
      dataIdentitas.value.statusKawin = (anggotaDetail.value.detail.statusPerkawinan == null) ? null : anggotaDetail.value.detail.statusPerkawinan
      dataIdentitas.value.tanggalLahir = anggotaDetail.value.detail.tanggalLahir
      dataIdentitas.value.kota = anggotaDetail.value.detail.kotaKtp
      dataIdentitas.value.loadingKecamatan = true
      dataIdentitas.value.loadingKelurahan = true

      if (anggotaDetail.value.detail.kotaKtp.id != null) {
        const responseKecamatan = await anggotaService.GET_KECAMATAN(anggotaDetail.value.detail.kotaKtp.id)

        dataIdentitas.value.kecamatanOpt = await responseKecamatan.data
        dataIdentitas.value.kecamatan = await anggotaDetail.value.detail.kecamatanKtp
        dataIdentitas.value.loadingKecamatan = false

        if (anggotaDetail.value.detail.kecamatanKtp.id != null) {
          const responseKelurahan = await anggotaService.GET_KELURAHAN(anggotaDetail.value.detail.kecamatanKtp.id)
          dataIdentitas.value.kelurahanOpt = await responseKelurahan.data
          dataIdentitas.value.kelurahan = await anggotaDetail.value.detail.kelurahanDesaKtp
          dataIdentitas.value.loadingKecamatan = false
          dataIdentitas.value.loadingKelurahan = false
          // dataIdentitas.value.loadKelFail = true
        }
        dataIdentitas.value.loadingKecamatan = false
        // dataIdentitas.value.loadKecFail = true
      }

      dataIdentitas.value.rt = anggotaDetail.value.detail.rtKtp
      dataIdentitas.value.rw = anggotaDetail.value.detail.rwKtp
      dataIdentitas.value.alamatKtp = anggotaDetail.value.detail.alamatKtp


      //----------------- Inisialisasi Data Anggota Sekarang -----------------

      dataAnggota.value.pekerjaan = anggotaDetail.value.detail.pekerjaan
      // dataAnggota.value.teleponRumahSekarang = anggotaDetail.value.detail.teleponRumahSekarang
      dataAnggota.value.noHandphoneSekarang = anggotaDetail.value.detail.noHandphoneSekarang
      // dataAnggota.value.teleponKantorSekarang = anggotaDetail.value.detail.teleponKantorSekarang
      dataAnggota.value.kota = anggotaDetail.value.detail.kotaSekarang
      dataAnggota.value.loadingKecamatan = true
      dataAnggota.value.loadingKelurahan = true

      if (anggotaDetail.value.detail.kotaSekarang.id != null) {
        const responseKecamatan = await anggotaService.GET_KECAMATAN(anggotaDetail.value.detail.kotaSekarang.id)
        dataAnggota.value.kecamatanOpt = responseKecamatan.data
        dataAnggota.value.kecamatanSekarang = anggotaDetail.value.detail.kecamatanSekarang
        dataAnggota.value.loadingKecamatan = false

        if (anggotaDetail.value.detail.kecamatanSekarang.id != null) {
          const responseKelurahan = await anggotaService.GET_KELURAHAN(anggotaDetail.value.detail.kecamatanSekarang.id)
          dataAnggota.value.kelurahanOpt = responseKelurahan.data
          dataAnggota.value.kelurahanDesaSekarang = anggotaDetail.value.detail.kelurahanDesaSekarang
          dataAnggota.value.loadingKelurahan = false
        }
        dataAnggota.value.loadingKecamatan = false
      }

      dataAnggota.value.rtSekarang = anggotaDetail.value.detail.rtSekarang
      dataAnggota.value.rwSekarang = anggotaDetail.value.detail.rwSekarang
      dataAnggota.value.alamatSekarang = anggotaDetail.value.detail.alamatSekarang


      //----------------- Inisialisasi Data Kerabat -----------------

      dataKerabat.value.namaSuamiAtauIstri = anggotaDetail.value.detail.namaSuamiAtauIstri
      dataKerabat.value.namaAyah = anggotaDetail.value.detail.namaAyah
      dataKerabat.value.namaIbu = anggotaDetail.value.detail.namaIbu
      dataKerabat.value.noHandphoneSuamiIstri = anggotaDetail.value.detail.noHandphoneSuamiIstri
      dataKerabat.value.noHandphoneAyah = anggotaDetail.value.detail.noHandphoneAyah
      dataKerabat.value.noHandphoneIbu = anggotaDetail.value.detail.noHandphoneIbu

      //----------------- Inisialisasi Data Pihak Lain -----------------

      dataPihakLain.value.namaPihakLain = anggotaDetail.value.detail.namaPihakLain
      dataPihakLain.value.hubunganPihakLain = anggotaDetail.value.detail.hubunganPihakLain
      // dataPihakLain.value.teleponRumahPihakLain = anggotaDetail.value.detail.teleponRumahPihakLain
      dataPihakLain.value.noHandphonePihakLain = anggotaDetail.value.detail.noHandphonePihakLain
      // dataPihakLain.value.teleponKantorPihakLain = anggotaDetail.value.detail.teleponKantorPihakLain
      dataPihakLain.value.rtPihakLain = anggotaDetail.value.detail.rtPihakLain
      dataPihakLain.value.rwPihakLain = anggotaDetail.value.detail.rwPihakLain
      dataPihakLain.value.alamatPihakLain = anggotaDetail.value.detail.alamatPihakLain
      dataPihakLain.value.loadingKecamatan = true
      dataPihakLain.value.loadingKelurahan = true

      if (anggotaDetail.value.detail.kotaPihakLain.id != null) {

        dataPihakLain.value.kotaPihakLain = anggotaDetail.value.detail.kotaPihakLain
        const responseKecamatan = await anggotaService.GET_KECAMATAN(anggotaDetail.value.detail.kotaPihakLain.id)
        dataPihakLain.value.kecamatanOpt = responseKecamatan.data
        dataPihakLain.value.kecamatanPihakLain = anggotaDetail.value.detail.kecamatanPihakLain
        dataPihakLain.value.loadingKecamatan = false
        if (anggotaDetail.value.detail.kecamatanPihakLain.id != null) {
          const responseKelurahan = await anggotaService.GET_KELURAHAN(anggotaDetail.value.detail.kecamatanPihakLain.id)
          dataPihakLain.value.kelurahanOpt = responseKelurahan.data
          dataPihakLain.value.kelurahanDesaPihakLain = anggotaDetail.value.detail.kelurahanDesaPihakLain
          dataPihakLain.value.loadingKelurahan = false
        }
        dataPihakLain.value.loadingKecamatan = false
      }

      //----------------- Inisialisasi Data Foto -----------------

      dataFoto.value[0].fotoBase64 = BASE_FILE_PATH + anggotaDetail.value.detail.fotoKtp
      if (anggotaDetail.value.detail.fotoPendukung1 != null) dataFoto.value[1].fotoBase64 = await anggotaDetail.value.detail.fotoPendukung1
      if (anggotaDetail.value.detail.fotoPendukung2 != null) dataFoto.value[2].fotoBase64 = await anggotaDetail.value.detail.fotoPendukung2
      if (anggotaDetail.value.detail.fotoPendukung3 != null) dataFoto.value[3].fotoBase64 = await anggotaDetail.value.detail.fotoPendukung3

    } catch (error: any) {
      loading.value = false;
      console.log(error);

      return toast.error(error);
    }

  }

  return {
    data,
    loading,
    searchAnggota,
    anggota,
    selectedAnggota,
    searchTempatLahir,
    dataIdentitas,
    searchKota,
    dataAnggota,
    searchKecamatan,
    searchKelurahan,
    getPekerjaan,
    dataKerabat,
    dataPihakLain,
    dataFoto,
    resetDataIdentitas,
    resetDataAnggota,
    resetDataKerabat,
    resetDataPihakLain,
    resetDataSurvei,
    resetDataFoto,
    salinData,
    reset,
    errorForm,
    confirmSubmit,
    isGadaiKendaraan,
    onSubmit,
    optSurveiPernahGadai,
    optSurveiReferensi,
    optSurveiKompetitor,
    isKompetitorLainnyaChecked,
    kompetitorLainnya,
    dataSurvei,
    anggotaDetail,
    getAnggotaDetail,
    getDaftarGadaiAnggota,
    daftarGadaiAnggota,
    resetPassword,
    editAnggota,
    onSubmitEdit,
    copyStnk
  };

});
