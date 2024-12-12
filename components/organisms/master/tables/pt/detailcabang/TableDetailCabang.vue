<template>
    <EasyDataTable hide-footer :server-items-length="cabang.branches.total" border-cell alternating theme-color="#1e73be"
        :loading="cabang.loading" table-class-name="pgi-table" :headers="headers" :items="cabang.branches.data">
        <template #header-detail="header">
            <div class="flex mx-auto justify-center">
                {{ header.text }}
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
                {{ cabang.branches.from }} - {{ cabang.branches.to }} dari {{ cabang.branches.total }}
            </div>
        </div>
        <v-pagination v-model="cabang.branches.current_page" :pages="cabang.branches.last_page" :range-size="1"
            @update:modelValue="updateCurrentPage" />
    </PaginateContainer>
</template>

<script setup lang="ts">
import { rowsPerPageOptions } from "@/data/options";
import VPagination from "@hennge/vue3-pagination";
import EasyDataTable from "vue3-easy-data-table";
import { useBranchStore } from "~/stores/branch";
import headers from "./column";
import PaginateContainer from "~/components/containers/PaginateContainer.vue";

const props = defineProps({
    company: Object
})
const isLoadingDetail = ref(false)
const query: any = ref({
    page: 1,
    per_page: 10
})
const cabang = useBranchStore()

// PAGINATE HANDLER
const updateCurrentPage = async (value: number) => {
    isLoadingDetail.value = true
    query.value.page = value
    await cabang.getBranches({
        ...query.value,
        company_id: props.company?.id
    })
    isLoadingDetail.value = false
}
const updateRowsPerPageSelect = async (value: any) => {
    isLoadingDetail.value = true
    query.value.per_page = value.target.value
    query.value.page = 1
    await cabang.getBranches({ ...query.value, company_id: props.company?.id })
    isLoadingDetail.value = false
}
// PAGINATE HANDLER
</script>