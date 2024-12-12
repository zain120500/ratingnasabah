<template>
    <div>
        <EasyDataTable hide-footer :server-items-length="detail.coadetails.total" border-cell alternating
            theme-color="#1e73be" :loading="detail.loading" table-class-name="pgi-table" :headers="headers"
            :items="detail.coadetails.data">
            <template #header-aksi="header">
                <div class="flex mx-auto justify-center">
                    {{ header.text }}
                </div>
            </template>
            <template #item-date="{ created_at }">
                <div class="">
                    {{ ddMMMYYYY(created_at) }}
                </div>
            </template>
            <template #item-time="{ created_at }">
                <h2 class="font-semibold">
                    {{ pgiHIS(created_at) }}
                </h2>
            </template>
            <template #item-amount="{ amount }">
                <div class="flex items-center justify-between">
                    <span>Rp</span>
                    <h2 class="font-semibold text-[14px]">{{ rupiah(amount) }}</h2>
                </div>
            </template>
            <template #item-is_active="{ is_active }">
                <AtomsStatusBadge :variant="is_active === 1 ? 'primary' : 'danger'"
                    :label="is_active === 1 ? 'Aktif' : 'Non Aktif'" />
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
                    {{ detail.coadetails.from }} - {{ detail.coadetails.to }} dari {{ detail.coadetails.total }}
                </div>
            </div>
            <v-pagination v-model="detail.coadetails.current_page" :pages="detail.coadetails.last_page" :range-size="1"
                @update:modelValue="updateCurrentPage" />
        </ContainersPaginateContainer>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    id: {
        type: Number
    }
})
import headers from "./detail_column";
import { rowsPerPageOptions } from "@/data/options";
import VPagination from "@hennge/vue3-pagination";
import EasyDataTable from "vue3-easy-data-table";
const detail = useCoaStore()
detail.getCoaDetails(props.id)

const updateRowsPerPageSelect = () => { }
const updateCurrentPage = () => { }
</script>