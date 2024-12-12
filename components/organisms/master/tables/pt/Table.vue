<template>
    <div v-if="pt.companies.data">
        <EasyDataTable hide-footer :server-items-length="pt.companies.total" border-cell alternating theme-color="#1e73be"
            :loading="isLoading || pt.loading" table-class-name="pgi-table" :headers="headers" :items="pt.companies.data">
            <template #header-detail="header">
                <div class="flex mx-auto justify-center">
                    {{ header.text }}
                </div>
            </template>
            <template #item-detail="item">
                <div class="flex items-center justify-center gap-x-2">
                    <!-- <button @click="handleDetail(item)" class="pgi-btn-blue">
                        <Icon name="fontisto:info" />
                    </button> -->
                    <button @click="handleShowCabang(item)" class="pgi-btn-blue">
                        <Icon name="pepicons-pop:map" />Lihat Cabang
                    </button>
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
                    <select class="select-page-size" @change="updateRowsPerPageSelect">
                        <option v-for="item in rowsPerPageOptions" :key="item" :value="item">
                            {{ item }}
                        </option>
                    </select>
                    <span>Baris</span>
                </div>
                <div>
                    {{ pt.companies.from }} - {{ pt.companies.to }} dari {{ pt.companies.total }}
                </div>
            </div>
            <v-pagination v-model="pt.companies.current_page" :pages="pt.companies.last_page" :range-size="1"
                @update:modelValue="updateCurrentPage" />
        </PaginateContainer>
        <ContainersModal :title="'Daftar Cabang : ' + companySelected.name" class-panel="max-w-4xl" :has-close="true">
            <OrganismsMasterTablesPtDetailcabangTableDetailCabang :company="companySelected" />
        </ContainersModal>
    </div>
</template>

<script setup lang="ts">
const mdl = useUtilStore()
import headers from "./column";
import { rowsPerPageOptions } from "@/data/options";
import VPagination from "@hennge/vue3-pagination";
import EasyDataTable from "vue3-easy-data-table";
import PaginateContainer from "~/components/containers/PaginateContainer.vue";
import { useBranchStore } from "~/stores/branch";
const isLoading = ref(false)
const pt = useCompanyStore()

const companySelected: any = ref({
    id: null,
    name: null
})
const cabang = useBranchStore()
const query: any = ref({
    page: 1,
    per_page: 10
})
await pt.getCompanies(query.value)
const handleShowCabang = async (item: any) => {
    isLoading.value = true
    companySelected.value.id = item.id
    companySelected.value.name = item.name
    await cabang.getBranches({
        company_id: item.id
    })
    mdl.toggleModal()
    isLoading.value = false
}


// PAGINATE HANDLER
const updateCurrentPage = async (value: number) => {
    isLoading.value = true
    query.value.page = value
    await pt.getCompanies(query.value)
    isLoading.value = false
}
const updateRowsPerPageSelect = async (value: any) => {
    isLoading.value = true
    query.value.per_page = value.target.value
    query.value.page = 1
    await pt.getCompanies(query.value)
    isLoading.value = false
}
// PAGINATE HANDLER
</script>