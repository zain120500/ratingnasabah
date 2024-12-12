<template>
    <div>
        <div class="md:flex items-center justify-between border-b mb-2 pb-3">
            <AtomsLabelPage label="Provinsi" />
            <form @submit.prevent="handleSearch" class="flex gap-x-2">
                <MoleculesFormSearch v-model="formSearch" />
                <AtomsButton label="cari" variant="primary" />
            </form>
        </div>
        <EasyDataTable hide-footer :server-items-length="province.provlists.total" border-cell alternating
            theme-color="#1e73be" :loading="isLoading" table-class-name="pgi-table" :headers="headers"
            :items="province.provlists.data">
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
                    {{ province.provlists.from }} - {{ province.provlists.to }} dari {{ province.provlists.total }}
                </div>
            </div>
            <v-pagination v-model="province.provlists.current_page" :pages="province.provlists.last_page" :range-size="1"
                @update:modelValue="updateCurrentPage" />
        </PaginateContainer>
        <ContainersModal title="Info Provinsi" :has-close="true" class-panel="max-w-md">
            <div class="my-4">
                DETAIL HERE...
            </div>
        </ContainersModal>
    </div>
</template>

<script setup lang="ts">
import { rowsPerPageOptions } from "@/data/options";
import VPagination from "@hennge/vue3-pagination";
import EasyDataTable from "vue3-easy-data-table";
import PaginateContainer from "~/components/containers/PaginateContainer.vue";
import headers from "./column";
import { useProvinceStore } from "~/stores/provinsi";
const isLoading = ref(false)
const query = ref({
    page: 1,
    per_page: 10
})
const province = useProvinceStore()
await province.getProv(query.value)
const formSearch: any = ref(null)
const handleSearch = async () => {
    isLoading.value = true
    await province.getProv({
        ...query.value,
        name: formSearch.value
    })
    isLoading.value = false
}

// PAGINATE HANDLER
const updateCurrentPage = async (value: number) => {
    isLoading.value = true
    query.value.page = value
    await province.getProv(query.value)
    isLoading.value = false
}
const updateRowsPerPageSelect = async (value: any) => {
    isLoading.value = true
    query.value.per_page = value.target.value
    query.value.page = 1
    await province.getProv(query.value)
    isLoading.value = false
}
// PAGINATE HANDLER
</script>