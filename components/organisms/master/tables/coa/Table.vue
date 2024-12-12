<template>
    <div>
        <EasyDataTable hide-footer :server-items-length="coa.coalists.total" border-cell alternating theme-color="#1e73be"
            :loading="coa.loading" table-class-name="pgi-table" :headers="headers" :items="coa.coalists.data">
            <template #header-aksi="header">
                <div class="flex mx-auto justify-center">
                    {{ header.text }}
                </div>
            </template>
            <template #item-amount="{ amount }">
                <div class="flex items-center justify-between">
                    <span>Rp</span>
                    <h2 class="font-semibold text-[14px]">{{ rupiah(amount) }}</h2>
                </div>
            </template>
            <template #item-aksi="item">
                <div class="flex items-center justify-center gap-x-2">
                    <button @click="handleHistory(item)" class="pgi-btn-blue">
                        <Icon name="pixelarticons:list-box" />
                        <span class="text-xs hidden md:flex">History</span>
                    </button>
                    <button @click="handleEdit(item)" class="pgi-btn-orange">
                        <Icon name="akar-icons:edit" />
                        <span class="text-xs hidden md:flex">Edit</span>
                    </button>
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
                    {{ coa.coalists.from }} - {{ coa.coalists.to }} dari {{ coa.coalists.total }}
                </div>
            </div>
            <v-pagination v-model="coa.coalists.current_page" :pages="coa.coalists.last_page" :range-size="1"
                @update:modelValue="updateCurrentPage" />
        </ContainersPaginateContainer>
        <ContainersModalDetail :has-close="true" class-panel="max-w-5xl" title="Detail History CoA">
            <OrganismsMasterTablesCoaTableDetail :id="selectedItem" />
        </ContainersModalDetail>
        <ContainersModalEdit :has-close="true" class-panel="max-w-md" title="Edit CoA">
            <form @submit.prevent="onUpdate">
                <div class="mb-3">
                    <label for="name" class="form-label">Nama Akun</label>
                    <Field placeholder="nama" :class="errors.name ? 'error' : ''" name="name" id="name" class="form-input"
                        type="text" v-model="formEdit.name" />
                    <div class="text-xs text-red-500">{{ errors.name }}</div>
                </div>
                <div class="flex justify-end mt-4 gap-x-2">
                    <AtomsButton @click="mdl.toggleModalEdit()" label="Batal" type="button" variant="dark" />
                    <AtomsButton :is-loading="isLoading" label="Simpan" type="submit" variant="primary" />
                </div>
            </form>
        </ContainersModalEdit>
    </div>
</template>

<script setup lang="ts">
import { coaEditSchema } from "@/schemas/validation"
import headers from "./column";
import { rowsPerPageOptions } from "@/data/options";
import VPagination from "@hennge/vue3-pagination";
import { Field, useForm } from "vee-validate";
import EasyDataTable from "vue3-easy-data-table";
const mdl = useUtilStore()
const coa = useCoaStore()

const isLoading = ref(false)
const selectedItem = ref(0)
const query: any = ref({ page: 1, per_page: 1 })
const formEdit = ref({
    name: null
})
await coa.getCoa(query.value)
const handleHistory = (item: any) => {
    mdl.toggleMdlDetail()
}
const handleEdit = (item: any) => {
    selectedItem.value = item.id
    formEdit.value.name = item.name
    mdl.toggleModalEdit()
}

const { handleSubmit, errors } = useForm({
    validationSchema: coaEditSchema
})
const onUpdate = handleSubmit(async (values) => {
    isLoading.value = true
    await coa.updateCoa(selectedItem.value, values, query.value)
    mdl.toggleModalEdit()
    isLoading.value = false
})

// PAGINATE HANDLER
const updateCurrentPage = async (value: number) => {
    query.value.page = value
    await coa.getCoa(query.value)
}
const updateRowsPerPageSelect = async (value: any) => {
    query.value.per_page = value.target.value
    query.value.page = 1
    await coa.getCoa(query.value)
}
// PAGINATE HANDLER

</script>