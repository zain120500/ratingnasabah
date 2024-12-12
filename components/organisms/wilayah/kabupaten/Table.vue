<script setup lang="ts">
import { rowsPerPageOptions } from "@/data/options";
import VPagination from "@hennge/vue3-pagination";
import Multiselect from "vue-multiselect";
import EasyDataTable from "vue3-easy-data-table";
import { useKabupatenStore } from "~/stores/kabupaten";
import headers from './column';
const kabupaten = useKabupatenStore()
const provOptions = useProvinceStore()
const mdl = useUtilStore()
const isLoading = ref(false)
const query: any = ref({
    page: 1,
    per_page: 10
})
const citySelected: any = ref(null)
await kabupaten.getKabupaten(query.value)
const handleFilter = async () => {
    query.value = {
        ...query.value,
        page: 1,
        province_id: citySelected.value.id
    }
    kabupaten.getKabupaten(query.value)
    mdl.toggleMdlFilter()
}
const resetFilter = async () => {
    query.value = {
        page: 1,
        per_page: 10
    }
    citySelected.value = null
    kabupaten.getKabupaten(query.value)
    mdl.toggleMdlFilter()
}


// PAGINATE HANDLER
const updateCurrentPage = async (value: number) => {
    isLoading.value = true
    query.value.page = value
    await kabupaten.getKabupaten(query.value)
    isLoading.value = false
}
const updateRowsPerPageSelect = async (value: any) => {
    isLoading.value = true
    query.value.per_page = value.target.value
    query.value.page = 1
    await kabupaten.getKabupaten(query.value)
    isLoading.value = false
}
// PAGINATE HANDLER

</script>
<template>
    <div class="flex justify-end gap-x-1 mb-2">
        <AtomsButton @click="mdl.toggleMdlFilter()" variant="primary" label="Cari" start-icon="iconamoon:search-bold" />
        <AtomsButton @click="kabupaten.getKabupaten({ page: 1, per_page: 10 })" start-icon="uiw:reload" variant="dark"
            label="Reset" />
    </div>
    <EasyDataTable hide-footer :server-items-length="kabupaten.kabupatenlists.total" border-cell alternating
        theme-color="#1e73be" :loading="isLoading" table-class-name="pgi-table" :headers="headers"
        :items="kabupaten.kabupatenlists.data">
        <template #item-aksi="{ id }">
            <div class="flex items-center gap-1">
                <button class="pgi-btn-blue">
                    <Icon name="fontisto:info" />
                </button>
            </div>
        </template>
    </EasyDataTable>
    <ContainersPaginateContainer>
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
                {{ kabupaten.kabupatenlists.from }}
                -
                {{ kabupaten.kabupatenlists.to }}
                dari
                {{ kabupaten.kabupatenlists.total }}
            </div>
        </div>
        <v-pagination v-model="kabupaten.kabupatenlists.current_page" :pages="kabupaten.kabupatenlists.last_page"
            :range-size="1" @update:modelValue="updateCurrentPage" />
    </ContainersPaginateContainer>
    <ContainersModalFilter :hasClose="true" classPanel="max-w-lg" title="Filter Kabupaten">
        <div class="mb-3">
            <div class="mb-3">
                <label class="label-multi">Filter Provinsi</label>
                <Multiselect :show-labels="false" v-model="citySelected" :options="provOptions.provinces"
                    :close-on-select="true" :clear-on-select="false" placeholder="provinsi" label="name" track-by="id"
                    :preselect-first="false">
                </Multiselect>
            </div>

            <div class="mt-3 flex gap-x-2 justify-end">
                <AtomsButton @click="resetFilter" variant="dark" label="Reset" />
                <AtomsButton @click="handleFilter" :is-loading="isLoading" variant="primary" label="Cari" />
            </div>

        </div>
    </ContainersModalFilter>
</template>
