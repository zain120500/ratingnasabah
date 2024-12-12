<template>
    <div v-if="anggota.loading" class="text-center text-primary">
        <span class="loading loading-spinner text-center loading-lg"></span>
        <p>LOADING...</p>
    </div>
    <div v-else>
        <div class="sm:w-1/2 text-sm">
            <div class="grid grid-cols-2">
                <label>No. Anggota</label>
                <label>{{ anggota.anggotaDetail?.no || '-' }}</label>
            </div>
            <div class="grid grid-cols-2">
                <label>No. Member</label>
                <label>{{ anggota.anggotaDetail?.noMember || '-' }}</label>
            </div>
            <div class="grid grid-cols-2">
                <label>Terdaftar di</label>
                <label>{{ anggota.anggotaDetail?.cabang?.name || '-' }}</label>
            </div>
        </div>

        <h1 class="my-4 text-base font-bold text-primary">Data KTP</h1>
        <div class="sm:w-1/2 text-sm">
            <div class="grid grid-cols-2">
                <label>Nama Anggota</label>
                <label>{{ anggota.anggotaDetail?.nama || '-' }}</label>
            </div>
            <div class="grid grid-cols-2">
                <label>Jenis Identitas</label>
                <label>{{ anggota.anggotaDetail?.jenisIdentitas?.name || '-' }}</label>
            </div>
            <div class="grid grid-cols-2">
                <label>No. Identitas</label>
                <label>{{ anggota.anggotaDetail?.noIdentitas || '-' }}</label>
            </div>
            <div class="grid grid-cols-2">
                <label>Jenis Kelamin</label>
                <label>{{ anggota.anggotaDetail?.detail?.jenisKelamin || '-' }}</label>
            </div>
            <div class="grid grid-cols-2">
                <label>Status Perkawinan</label>
                <label>{{ anggota.anggotaDetail?.detail?.statusPerkawinan || '-' }}</label>
            </div>
            <div class="grid grid-cols-2">
                <label>Kewarganegaraan</label>
                <label>{{ anggota.anggotaDetail?.detail?.kewarganegaraan || '-' }}</label>
            </div>
            <div class="grid grid-cols-2">
                <label>Kota Lahir</label>
                <label>{{ anggota.anggotaDetail?.detail?.kotaLahir?.name || '-' }}</label>
            </div>
            <div class="grid grid-cols-2">
                <label>Tanggal Lahir</label>
                <label>{{ changeDateFormat(anggota.anggotaDetail?.detail?.tanggalLahir) || '-' }}</label>
            </div>
            <div class="grid grid-cols-2">
                <label>Kota</label>
                <label>{{ anggota.anggotaDetail?.detail?.kotaKtp?.name || '-' }}</label>
            </div>
            <div class="grid grid-cols-2">
                <label>kecamatan</label>
                <label>{{ anggota.anggotaDetail?.detail?.kecamatanKtp?.name || '-' }}</label>
            </div>
            <div class="grid grid-cols-2">
                <label>kelurahan</label>
                <label>{{ anggota.anggotaDetail?.detail?.kelurahanDesaKtp?.name || '-' }}</label>
            </div>
            <div class="grid grid-cols-2">
                <label>RT / RW</label>
                <label>{{ anggota.anggotaDetail?.detail?.rtKtp || '-' }} / {{ anggota.anggotaDetail?.detail?.rwKtp || '-'
                }}</label>
            </div>
            <div class="grid grid-cols-2">
                <label>Alamat KTP</label>
                <label>{{ anggota.anggotaDetail?.detail?.alamatKtp || '-' }}</label>
            </div>
            <div class="grid grid-cols-2">
                <label>Alamat Tempat Kerja</label>
                <label>{{ anggota.anggotaDetail?.detail?.alamatTempatKerja || '-' }}</label>
            </div>
            <div class="grid grid-cols-2">
                <label>Telpon Tempat Kerja</label>
                <label>{{ anggota.anggotaDetail?.detail?.teleponTempatKerja || '-' }}</label>
            </div>
            <div class="grid grid-cols-2">
                <label>Pekerjaan</label>
                <label>{{ anggota.anggotaDetail?.detail?.pekerjaanBaru?.name || '-' }}</label>
            </div>
        </div>
        <h1 class="my-4 text-base font-bold text-primary">Data Anggota</h1>
        <div class="sm:w-1/2 text-sm">
            <div class="grid grid-cols-2">
                <label>No. Handphone</label>
                <label>{{ anggota.anggotaDetail?.detail?.noHandphoneSekarang || '-' }}</label>
            </div>
            <div class="grid grid-cols-2">
                <label>Kota</label>
                <label>{{ anggota.anggotaDetail?.detail?.kotaSekarang?.name || '-' }}</label>
            </div>
            <div class="grid grid-cols-2">
                <label>Kecamatan</label>
                <label>{{ anggota.anggotaDetail?.detail?.kecamatanSekarang?.name || '-' }}</label>
            </div>
            <div class="grid grid-cols-2">
                <label>Kelurahan</label>
                <label>{{ anggota.anggotaDetail?.detail?.kelurahanDesaSekarang?.name || '-' }}</label>
            </div>
            <div class="grid grid-cols-2">
                <label>RT / RW</label>
                <label>{{ anggota.anggotaDetail?.detail?.rtSekarang || '-' }} / {{ anggota.anggotaDetail?.detail?.rwSekarang
                    || '-' }}</label>
            </div>
            <div class="grid grid-cols-2">
                <label>Alamat Sekarang</label>
                <label>{{ anggota.anggotaDetail?.detail?.alamatSekarang || '-' }}</label>
            </div>
        </div>

        <h1 class="my-4 text-base font-bold text-primary">Data Kerabat</h1>
        <div class="sm:w-1/2 text-sm">
            <div class="grid grid-cols-2">
                <label>Nama Suami / Istri</label>
                <label>{{ anggota.anggotaDetail?.detail?.namaSuamiAtauIstri || '-' }}</label>
            </div>
            <div class="grid grid-cols-2">
                <label>No. Handphone Suami / Istri</label>
                <label>{{ anggota.anggotaDetail?.detail?.noHandphoneSuamiIstri || '-' }}</label>
            </div>
            <div class="grid grid-cols-2">
                <label>Ayah</label>
                <label>{{ anggota.anggotaDetail?.detail?.namaAyah || '-' }}</label>
            </div>
            <div class="grid grid-cols-2">
                <label>No. Handphone Ayah</label>
                <label>{{ anggota.anggotaDetail?.detail?.noHandphoneAyah || '-' }}</label>
            </div>
            <div class="grid grid-cols-2">
                <label>Ibu</label>
                <label>{{ anggota.anggotaDetail?.detail?.namaIbu || '-' }}</label>
            </div>
            <div class="grid grid-cols-2">
                <label>No. Handphone Ibu</label>
                <label>{{ anggota.anggotaDetail?.detail?.noHandphoneIbu || '-' }}</label>
            </div>
        </div>

        <h1 class="my-4 text-base font-bold text-primary">PIHAK LAIN (Keluarga yang Tidak Serumah)</h1>
        <div class="sm:w-1/2 text-sm">
            <div class="grid grid-cols-2">
                <label>Nama</label>
                <label>{{ anggota.anggotaDetail?.detail?.namaPihakLain || '-' }}</label>
            </div>
            <div class="grid grid-cols-2">
                <label>Hubungan</label>
                <label>{{ anggota.anggotaDetail?.detail?.hubunganPihakLain || '-' }}</label>
            </div>
            <div class="grid grid-cols-2">
                <label>>No. Handphone</label>
                <label>{{ anggota.anggotaDetail?.detail?.noHandphonePihakLain || '-' }}</label>
            </div>
            <div class="grid grid-cols-2">
                <label>Kota</label>
                <label>{{ anggota.anggotaDetail?.detail?.kotaPihakLain?.name || '-' }}</label>
            </div>
            <div class="grid grid-cols-2">
                <label>Kecamatan</label>
                <label>{{ anggota.anggotaDetail?.detail?.kecamatanPihakLain?.name || '-' }}</label>
            </div>
            <div class="grid grid-cols-2">
                <label>Kelurahan</label>
                <label>{{ anggota.anggotaDetail?.detail?.kelurahanDesaPihakLain?.name || '-' }}</label>
            </div>
            <div class="grid grid-cols-2">
                <label>RT / RW</label>
                <label>{{ anggota.anggotaDetail?.detail?.rtPihakLain || '-' }} / {{
                    anggota.anggotaDetail?.detail?.rwPihakLain || '-' }}</label>
            </div>
            <div class="grid grid-cols-2">
                <label>Alamat Sekarang</label>
                <label>{{ anggota.anggotaDetail?.detail?.alamatPihakLain || '-' }}</label>
            </div>
        </div>

        <EasyDataTable hide-footer :server-items-length="anggota.daftarGadaiAnggota?.total || 0" border-cell alternating
            theme-color="#1e73be" :loading="anggota.loading" table-class-name="pgi-table" :headers="headers"
            :items="anggota.daftarGadaiAnggota.data" :rows-per-page="100">
            <template #empty-message>
                Tidak Ada Data
            </template>
            <template #header-detail="header">
                <div class="flex mx-auto justify-center">
                    {{ header.text }}
                </div>
            </template>
        </EasyDataTable>
        <PaginateContainer>
            <div class="flex items-center gap-x-5 justify-between text-[14px]">
                <div class="flex gap-x-2 items-center">
                    <span>Tampilkan</span>
                    <select class="select-page-size" v-model="size" @change="updateRowsPerPageSelect">
                        <option v-for="item in rowsPerPageOptions" :key="item" :value="item">
                            {{ item }}
                        </option>
                    </select>
                    <span>Baris</span>
                </div>
            </div>

            <v-pagination v-model="current_page" :pages="anggota.daftarGadaiAnggota.lastPage" :range-size="1"
                @update:modelValue="updateCurrentPage" />
        </PaginateContainer>
    </div>
</template>

<script lang="ts" setup>
import { rowsPerPageOptions } from "@/data/options";
import PaginateContainer from "~/components/containers/PaginateContainer.vue";
import VPagination from "@hennge/vue3-pagination";
import EasyDataTable from "vue3-easy-data-table";
import type { Header } from "vue3-easy-data-table";

const anggota = useAnggota()


const headers: Header[] = [
    { text: "No. Faktur", value: "noFaktur", fixed: true },
    { text: "No. Anggota", value: "noAnggota" },
    { text: "Nama Anggota", value: "namaAnggota" },
    { text: "Jenis Pinjaman", value: "jenisPinjaman" },
    { text: "Barang", value: "jenisBarang" },
    { text: "Total Pinjaman", value: "nilaiPinjamanAwal" },
    { text: "Status", value: "status.name" },
];

const current_page = ref(1)
const size = ref(10)

const updateCurrentPage = async (value: number) => {
    await anggota.getDaftarGadaiAnggota(value, size.value)
}
const updateRowsPerPageSelect = async () => {
    await anggota.getDaftarGadaiAnggota(1, size.value)
    current_page.value = 1
    return
}
</script>
