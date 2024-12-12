<script setup lang="ts">
import type { Header } from "vue3-easy-data-table";
import { rowsPerPageOptions } from "@/data/options";
import PaginateContainer from "~/components/containers/PaginateContainer.vue";
import VPagination from "@hennge/vue3-pagination";
import EasyDataTable from "vue3-easy-data-table";

const anggota = useAnggota()
const size = ref(10)
const current_page = ref(0)

const updateRowsPerPageSelect = async () => {
}

const updateCurrentPage = async (value: number) => {
}

const headers: Header[] = [
    { value: "no", text: "No" },
    { value: "namaBank", text: "Nama Bank" },
    { value: "noRekening", text: "No. Rekening" },
    { value: "namaRekening", text: "A/N Rekening" },
    { value: "status", text: "Status" },
    { value: "aksi", text: "Aksi" },
];
</script>

<template>
    <h1 class="my-4 text-base font-bold text-primary">Data Rekening</h1>
    <button class="pgi-btn-blue" @click="">Tambah Rekening</button>
    <div class="overflow-x-auto mt-5">
        <div v-if="anggota.data == 400" class="text-center my-3">
            <p> Mohon Maaf Terjadi Kesalahan !!!</p>
            <button class="pgi-btn-blue btn-sm text-white my-3" :disabled="anggota.loading" @click="">Coba
                Lagi <span v-if="anggota.loading" class="loading loading-spinner loading-xs"></span></button>
        </div>

        <EasyDataTable v-else hide-footer :server-items-length="anggota.data.total || 0" border-cell alternating
            theme-color="#1e73be" :loading="anggota.loading" table-class-name="pgi-table" :headers="headers"
            :items="anggota.data.data" :rows-per-page="100">
            <template #empty-message>
                Tidak Ada Data
            </template>
            <template #header-detail="header">
                <div class="flex mx-auto justify-center">
                    {{ header.text }}
                </div>
            </template>
            <template #item-aksi="item">
            </template>
            <template #item-created="{ created_by, created_at }">
            </template>
            <template #item-is_active="{ is_active }">
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

            <v-pagination v-model="current_page" :pages="anggota.data.lastPage" :range-size="1"
                @update:modelValue="updateCurrentPage" />
        </PaginateContainer>
    </div>
</template>
