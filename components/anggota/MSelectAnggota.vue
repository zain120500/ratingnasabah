<template>
    <p class="">Search Anggota</p>
    <div class="md:flex md:space-x-2 text-sm">
        <select v-model="searchBy" placeholder="Pilih Berdasarkan"
            class="select select-bordered w-full max-w-xs select-sm md:w-1/4">
            <option :value="0" selected disabled>-- Pilih Berdasarkan --</option>
            <option v-for="item of searchByOpt" :value="item.id">{{ item.name }}</option>
        </select>
        <input type="text" v-model="searchName" placeholder="Pencarian..."
            class="mt-2 md:mt-0 input input-bordered w-full max-w-xs input-sm md:w-1/4" />
        <input type="date" v-model="searchDate" placeholder="Type here"
            class="mt-2 md:mt-0 input input-bordered w-full max-w-xs input-sm md:w-1/4" />
        <button @click="searchAction" class="pgi-btn-blue mt-2 mr-2 md:mt-0 md:mr-0" :disabled="anggota.loading">
            <Icon name="icon-park-outline:search"></Icon>
        </button>
        <button class="pgi-btn-blue" @click="reset" :disabled="anggota.loading">
            <Icon name="fa:repeat"></Icon>
        </button>
    </div>
    <small class="text-xs text-slate-500">Nama anggota WAJIB diisi. Tanggal lahir bersifat opsional (tidak harus
        isi, namun bila diisi harus lengkap).</small>
    <div class="overflow-x-auto mt-5">
        <div v-if="anggota.data == 400" class="text-center my-3">
            <p> Mohon Maaf Terjadi Kesalahan !!!</p>
            <button class="pgi-btn-blue btn-sm text-white my-3" :disabled="anggota.loading" @click="searchAction">Coba
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
                <button class="pgi-btn-blue btn-xs" @click="select(item)">Pilih</button>
            </template>
            <template #item-created="{ created_by, created_at }">
                <div>
                    <div>{{ created_by }}</div>
                    <div>
                        <span>{{ ddMMMYYYY(created_at) }}</span>
                        <span class="font-semibold">{{ pgiHIS(created_at) }}</span>
                    </div>
                </div>
            </template>
            <template #item-is_active="{ is_active }">
                <AtomsStatusBadge :variant="is_active === 1 ? 'primary' : 'danger'"
                    :label="is_active === 1 ? 'Aktif' : 'Non Aktif'" />
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

<script lang="ts" setup>
import { rowsPerPageOptions } from "@/data/options";
import PaginateContainer from "~/components/containers/PaginateContainer.vue";
import VPagination from "@hennge/vue3-pagination";
import EasyDataTable from "vue3-easy-data-table";
import type { Header } from "vue3-easy-data-table";
import { defineEmits } from "vue";
import { toast } from 'vue3-toastify';

const headers: Header[] = [
    { text: "No. Anggota", value: "no", fixed: true },
    { text: "No. Member", value: "noMember" },
    { text: "No. Identitas", value: "noIdentitas" },
    { text: "Nama Anggota", value: "nama" },
    { text: "Aksi", value: "aksi" },
];

const emit = defineEmits(['selectedAnggota'])


const current_page = ref(0)

const searchBy = ref(0)
const searchName = ref("")
const searchDate = ref("")
const anggota = useAnggota()
const size = ref(10)

const updateCurrentPage = async (value: number) => {
    await anggota.searchAnggota(searchBy.value, searchName.value, searchDate.value, value, size.value)
}
const updateRowsPerPageSelect = async () => {
    if (searchBy.value != 0 && searchName.value != '') {
        await anggota.searchAnggota(searchBy.value, searchName.value, searchDate.value, 1, size.value)
        current_page.value = 1
    }
    return
}
const searchByOpt = ref([
    { id: 1, name: "No. Identitas / KTP" },
    { id: 2, name: "Nama & Tgl Lahir Anggota" },
    { id: 3, name: "No. Anggota" },
    { id: 4, name: "No. Member" }
])

const searchAction = async () => {

    if (searchBy.value == 0) {
        return toast.error("Mohon pilih kolom berdasarkan!", {
            position: toast.POSITION.BOTTOM_LEFT,
            autoClose: 2000,
        })
    }

    if (searchName.value == '') {
        return toast.error("Mohon isi kolom pencarian!", {
            position: toast.POSITION.BOTTOM_LEFT,
            autoClose: 2000,
        })
    }

    await anggota.searchAnggota(searchBy.value, searchName.value, searchDate.value, 1, size.value)
    current_page.value = 1
}

const reset = async () => {
    anggota.data.data = []
    anggota.data.lastPage = 0
    anggota.data.total = 0
    size.value = 10
    current_page.value = 0
    searchBy.value = 0
    searchName.value = ''
    searchDate.value = ''
}

const select = async (selectedAnggota: any) => {
    await anggota.selectedAnggota(selectedAnggota)
    emit('selectedAnggota', anggota.anggota)
}

</script>
