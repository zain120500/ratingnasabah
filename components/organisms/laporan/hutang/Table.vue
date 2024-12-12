<template>
    <EasyDataTable hide-footer :server-items-length="hutang.hutang_lists.total" border-cell alternating
        theme-color="#1e73be" :loading="hutang.loading" table-class-name="pgi-table" :headers="headers"
        :items="hutang.hutang_lists.data">
        <template #header-detail="header">
            <div class="flex mx-auto justify-center">
                {{ header.text }}
            </div>
        </template>
        <template #item-date="{ date }">
            <div>
                {{ ddMMMYYYY(date) }}
            </div>
        </template>
        <template #item-amount="{ amount }">
            <div class="flex justify-between">
                <span>Rp</span>
                <span class="font-semibold text-[14px]">{{ rupiah(amount) }}</span>
            </div>
        </template>
        <template #item-created_at="{ created_at }">
            <div class="flex gap-x-1">
                <span>{{ ddMMMYYYY(created_at) }},</span>
                <span class="font-semibold">{{ pgiHIS(created_at) }}</span>
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
                {{ hutang.hutang_lists.from }} - {{ hutang.hutang_lists.to }} dari {{ hutang.hutang_lists.total }}
            </div>
        </div>
        <v-pagination v-model="hutang.hutang_lists.current_page" :pages="hutang.hutang_lists.last_page" :range-size="1"
            @update:modelValue="updateCurrentPage" />
    </PaginateContainer>
</template>

<script setup lang="ts">
import headers from "./column";
import { rowsPerPageOptions } from "@/data/options";
import VPagination from "@hennge/vue3-pagination";
import EasyDataTable from "vue3-easy-data-table";
import PaginateContainer from "~/components/containers/PaginateContainer.vue";
const hutang = useHutangStore()
await hutang.getHutang()


const handleDetail = (item: any) => { }
const updateRowsPerPageSelect = () => { }
const updateCurrentPage = () => { }
</script>