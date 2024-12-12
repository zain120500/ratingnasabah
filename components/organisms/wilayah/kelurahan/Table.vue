
<script setup lang="ts">
import { rowsPerPageOptions } from "@/data/options";
import VPagination from "@hennge/vue3-pagination";
import Multiselect from "vue-multiselect";
import EasyDataTable from "vue3-easy-data-table";
import PaginateContainer from "~/components/containers/PaginateContainer.vue";
import { useVillageStore } from "~/stores/kelurahan";
import headers from "./column";
const mdl = useUtilStore()
const isLoading = ref(false)
const query: any = ref({
    page: 1,
    per_page: 10
})

const provSelected: any = ref(null)
const kabSelected: any = ref(null)
const kecSelected: any = ref(null)

const provinsi = useProvinceStore()
const kabupaten = useKabupatenStore()
const kelurahan = useVillageStore()
await kelurahan.getVillages(query.value)
const kecamatan = useKecamatanStore()

const handleChangeProv = async (data: any) => {
    const province_id = data.id
    await kabupaten.getOptionKabupatenAll({ province_id })
}
const changeKabupaten = async (data: any) => {
    const city_id = data.id
    await kecamatan.getKecamatanAll({ city_id })
}

const handleFilter = async () => {
    await kelurahan.getVillages({
        ...query.value,
        district_id: kecSelected?.value?.id
    })
    mdl.toggleMdlFilter()
}


// PAGINATE HANDLER
const updateCurrentPage = async (value: number) => {
    isLoading.value = true
    query.value.page = value
    await kelurahan.getVillages(query.value)
    isLoading.value = false
}
const updateRowsPerPageSelect = async (value: any) => {
    isLoading.value = true
    query.value.per_page = value.target.value
    query.value.page = 1
    await kelurahan.getVillages(query.value)
    isLoading.value = false
}
// PAGINATE HANDLER
</script>
<template>
    <div class="mb-2 flex justify-end gap-x-2">
        <AtomsButton @click="handleFilter" label="Cari" variant="primary" start-icon="fa:search" />
        <AtomsButton label="Reset" variant="dark" start-icon="fa:refresh" />
    </div>
    <EasyDataTable hide-footer :server-items-length="kelurahan.villages.total" border-cell alternating theme-color="#1e73be"
        :loading="isLoading" table-class-name="pgi-table" :headers="headers" :items="kelurahan.villages.data">
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
                {{ kelurahan.villages.from }}
                -
                {{ kelurahan.villages.to }}
                dari
                {{ kelurahan.villages.total }}
            </div>
        </div>
        <v-pagination v-model="kelurahan.villages.current_page" :pages="kelurahan.villages.last_page" :range-size="1"
            @update:modelValue="updateCurrentPage" />
    </PaginateContainer>
    <ContainersModalFilter class-panel="max-w-xl" title="Filter Kecamatan" :has-close="true">
        <form @submit.prevent="handleFilter">
            <div class="mb-4">
                <label class="label-multi">Pilih Provinsi</label>
                <Multiselect @select="handleChangeProv" :show-labels="false" v-model="provSelected"
                    :options="provinsi.provinces" :close-on-select="true" :clear-on-select="true" :preserve-search="true"
                    placeholder="provinsi" label="name" track-by="id" :preselect-first="false">
                </Multiselect>
            </div>
            <div class="mb-4">
                <label class="label-multi">Pilih Kota/Kabupaten</label>
                <Multiselect @select="changeKabupaten" :show-labels="false" v-model="kabSelected"
                    :options="kabupaten.kabupatenOptions" :close-on-select="true" :clear-on-select="true"
                    :preserve-search="true" placeholder="kota/kabupaten" label="name" track-by="id"
                    :preselect-first="false">
                </Multiselect>
            </div>
            <div class="mb-4">
                <label class="label-multi">Pilih Kecamatan</label>
                <Multiselect :show-labels="false" v-model="kecSelected" :options="kecamatan.districtOptions"
                    :close-on-select="true" :clear-on-select="true" :preserve-search="true" placeholder="kecamatan"
                    label="name" track-by="id" :preselect-first="false">
                </Multiselect>
            </div>
            <div class="flex justify-end">
                <AtomsButton start-icon="fa:search" variant="primary" label="Cari" />
            </div>
        </form>
    </ContainersModalFilter>
</template>

