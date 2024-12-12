
<script setup lang="ts">
import { rowsPerPageOptions } from "@/data/options";
import VPagination from "@hennge/vue3-pagination";
import EasyDataTable from "vue3-easy-data-table";
import PaginateContainer from "~/components/containers/PaginateContainer.vue";
import { useKecamatanStore } from "~/stores/kecamatan";
import headers from "./column";
import Multiselect from "vue-multiselect";
const kabupaten = useKabupatenStore()
const prov = useProvinceStore()
const mdl = useUtilStore()
const isLoading = ref(false)
const query: any = ref({
    page: 1,
    per_page: 10
})
const kecamatan = useKecamatanStore()
await kecamatan.getKecamatan(query.value)
await prov.getProvinceAll()

const provSelected: any = ref(null)
const kabSelected: any = ref(null)

const handleChangeProv = async (data: any) => {
    const province_id = data.id
    await kabupaten.getOptionKabupatenAll({ province_id })
}
const handleFilter = async () => {
    await kecamatan.getKecamatan({
        ...query.value,
        city_id: kabSelected?.value?.id
    })
    mdl.toggleMdlFilter()
}

const handleReset = async () => {
    provSelected.value = null
    kabSelected.value = null
    await kecamatan.getKecamatan(query.value)
}

const handleSearch = () => {
    mdl.toggleMdlFilter()
}


// PAGINATE HANDLER
const updateCurrentPage = async (value: number) => {
    isLoading.value = true
    query.value.page = value
    await kecamatan.getKecamatan(query.value)
    isLoading.value = false
}
const updateRowsPerPageSelect = async (value: any) => {
    isLoading.value = true
    query.value.per_page = value.target.value
    query.value.page = 1
    await kecamatan.getKecamatan(query.value)
    isLoading.value = false
}
// PAGINATE HANDLER
</script>
<template>
    <div class="flex justify-end mb-2 gap-x-1">
        <AtomsButton @click="handleSearch" label="Cari" variant="primary" start-icon="fa:search" />
        <AtomsButton @click="handleReset" label="Reset" variant="dark" start-icon="fa:refresh" />
    </div>
    <EasyDataTable hide-footer :server-items-length="kecamatan.districts.total" border-cell alternating
        theme-color="#1e73be" :loading="kecamatan.isLoading" table-class-name="pgi-table" :headers="headers"
        :items="kecamatan.districts.data">
    </EasyDataTable>
    <PaginateContainer>
        <div class="flex items-center gap-x-5 justify-between text-[14px]">
            <div class="flex gap-x-2 items-center">
                <span>Tampilkan</span>
                <select class="select-page-size" @change="updateRowsPerPageSelect">
                    <option v-for="item in rowsPerPageOptions" :key="item" :value="item">
                        {{ item }}
                    </option>
                </select>
                <span>Baris</span>
            </div>
            <div>
                {{ kecamatan.districts.from }}
                -
                {{ kecamatan.districts.to }}
                dari
                {{ kecamatan.districts.total }}
            </div>
        </div>
        <v-pagination v-model="kecamatan.districts.current_page" :pages="kecamatan.districts.last_page" :range-size="1"
            @update:modelValue="updateCurrentPage" />
    </PaginateContainer>
    <ContainersModalFilter class-panel="max-w-xl" title="Filter Kecamatan" :has-close="true">
        <form @submit.prevent="handleFilter">
            <div class="mb-4">
                <label class="label-multi">Pilih Provinsi</label>
                <Multiselect @select="handleChangeProv" :show-labels="false" v-model="provSelected"
                    :options="prov.provinces" :close-on-select="true" :clear-on-select="true" :preserve-search="true"
                    placeholder="provinsi" label="name" track-by="id" :preselect-first="false">
                </Multiselect>
            </div>
            <div class="mb-4">
                <label class="label-multi">Pilih Kota/Kabupaten</label>
                <Multiselect :show-labels="false" v-model="kabSelected" :options="kabupaten.kabupatenOptions"
                    :close-on-select="true" :clear-on-select="true" :preserve-search="true" placeholder="kota/kabupaten"
                    label="name" track-by="id" :preselect-first="false">
                </Multiselect>
            </div>
            <div class="flex justify-end">
                <AtomsButton start-icon="fa:search" variant="primary" label="Cari" />
            </div>
        </form>
    </ContainersModalFilter>
</template>

