<template>
    <EasyDataTable hide-footer :server-items-length="report.reports.total" border-cell alternating theme-color="#1e73be"
        :loading="report.loading" table-class-name="pgi-table" :headers="headers" :items="report.reports.data">
        <template #header-detail="header">
            <div class="flex mx-auto justify-center">
                {{ header.text }}
            </div>
        </template>
        <template #item-month="{ month }">
            <div>
                {{ pgiFullMonth(month) }}
            </div>
        </template>
        <template #item-status="{ status }">
            <div class="inline-flex w-20 px-1 gap-x-1 rounded-md items-center bg-primary" v-if="status === 1">
                <Icon name="typcn:lock-open" />
                <span class="flex-1">OPEN</span>
            </div>
            <div v-if="status === 2" class="inline-flex w-20 px-1 gap-x-1 rounded-md items-center bg-red-400 text-white">
                <Icon name="bxs:lock" />
                <span class="flex-1">CLOSED</span>
            </div>
        </template>
        <template #item-detail="item">
            <div class="flex items-center justify-center">
                <button @click="handleDetail(item)" class="pgi-btn-blue">
                    <Icon name="fontisto:info" />
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
                {{ report.reports.from }} - {{ report.reports.to }} dari {{ report.reports.total }}
            </div>
        </div>
        <v-pagination v-model="report.reports.current_page" :pages="report.reports.last_page" :range-size="1"
            @update:modelValue="updateCurrentPage" />
    </PaginateContainer>
</template>

<script setup lang="ts">
import headers from "./column";
import { rowsPerPageOptions } from "@/data/options";
import VPagination from "@hennge/vue3-pagination";
import EasyDataTable from "vue3-easy-data-table";
import PaginateContainer from "~/components/containers/PaginateContainer.vue";
const report = useReportStore()
await report.getReports()


const handleDetail = (item: any) => { }
const updateRowsPerPageSelect = () => { }
const updateCurrentPage = () => { }
</script>