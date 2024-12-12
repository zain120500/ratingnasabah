<template>
    <div>
        <EasyDataTable hide-footer :server-items-length="tbu.expensetypes.total" border-cell alternating
            theme-color="#1e73be" :loading="tbu.loading" table-class-name="pgi-table" :headers="headers"
            :items="tbu.expensetypes.data">
            <template #header-aksi="header">
                <div class="flex ml-auto justify-center">
                    {{ header.text }}
                </div>
            </template>
            <template #item-aksi="item">
                <div class="flex items-center justify-end gap-x-2">
                    <button @click="handleEdit(item)" class="pgi-btn-orange">
                        <Icon name="akar-icons:edit" />
                        <span class="text-xs hidden md:flex">Edit</span>
                    </button>
                    <button @click="handleDelete({ id: item.id, name: item.name })" class="pgi-btn-red">
                        <Icon name="material-symbols:delete" />
                        <span class="text-xs hidden md:flex">Hapus</span>
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
                    {{ tbu.expensetypes.from }} - {{ tbu.expensetypes.to }} dari {{ tbu.expensetypes.total }}
                </div>
            </div>
            <v-pagination v-model="tbu.expensetypes.current_page" :pages="tbu.expensetypes.last_page" :range-size="1"
                @update:modelValue="updateCurrentPage" />
        </ContainersPaginateContainer>
        <ContainersModalEdit :has-close="true" class-panel="max-w-md" title="Edit Tipe Beban Usaha">
            <form @submit.prevent="onUpdate">
                <div class="mb-3">
                    <label for="name" class="form-label">Nama Akun</label>
                    <Field placeholder="nama" name="name" id="name" :class="errors.name ? 'error' : ''" class="form-input"
                        type="text" v-model="formEdit.name" />
                    <div class="text-red-400 text-xs">{{ errors.name }}</div>
                </div>
                <div class="flex justify-end mt-4 gap-x-2">
                    <AtomsButton @click="mdl.toggleModalEdit()" label="Batal" type="button" variant="dark" />
                    <AtomsButton :is-loading="isLoading" @click="handleSubmit" label="Simpan" type="submit"
                        variant="primary" />
                </div>
            </form>
        </ContainersModalEdit>
        <ContainersModalConfirm :hasClose="true" classPanel="max-w-md" title="Konfirmasi">
            <div class="mb-4">
                <p>Anda yakin akan menghapus data,</p>
                <h3 class="font-bold mt-1">{{ selectedItem?.name }}?</h3>
            </div>
            <div class="flex justify-end gap-x-3">
                <AtomsButton type="button" @click="mdl.toggleConfirm()" label="Batal" variant="dark" />
                <AtomsButton :isLoading="isLoading" @click="confirmDelete" startIcon="mdi:trash" label="Ya, Hapus"
                    variant="danger" />
            </div>
        </ContainersModalConfirm>
    </div>
</template>

<script setup lang="ts">
import headers from "./column";
import { rowsPerPageOptions } from "@/data/options";
import VPagination from "@hennge/vue3-pagination";
import { Field, useForm } from "vee-validate";
import EasyDataTable from "vue3-easy-data-table";
import { expenseTypeSchema } from "~/schemas/validation";
const query: any = ref({ page: 1, per_page: 10 })
const mdl = useUtilStore()
const tbu = useExpenseTypesStore()
await tbu.getExpenseTypes(query.value)

const isLoading = ref(false)
const selectedItem: any = ref({
    id: null,
    name: null
})
const formEdit = ref({
    name: null
})

// ======== START HANDLE EDIT ========//
const handleEdit = (item: any) => {
    formEdit.value.name = item.name
    selectedItem.value.id = item.id
    mdl.toggleModalEdit()
}
const { handleSubmit, errors } = useForm({
    validationSchema: expenseTypeSchema
})
const onUpdate = handleSubmit(async (values) => {
    isLoading.value = true
    mdl.toggleModalEdit()
    await tbu.updateExpenseTypes(selectedItem.value.id, values, query.value)
    selectedItem.value.id = null
    selectedItem.value.name = null
    isLoading.value = false
})
// ======== END HANDLE EDIT ========//


// ======== START HANDLE DELETE ========//
const handleDelete = (item: any) => {
    selectedItem.value = item
    mdl.toggleConfirm()
}
const confirmDelete = async () => {
    isLoading.value = true
    await tbu.deleteExpenseTypes(selectedItem.value.id, query.value)
    selectedItem.value.id = null
    selectedItem.value.name = null
    isLoading.value = false
    mdl.toggleConfirm()
}
// ======== END HANDLE DELETE ========//


// PAGINATE HANDLER
const updateCurrentPage = async (value: number) => {
    query.value.page = value
    await tbu.getExpenseTypes(query.value)
}
const updateRowsPerPageSelect = async (value: any) => {
    query.value.per_page = value.target.value
    query.value.page = 1
    await tbu.getExpenseTypes(query.value)
}
// PAGINATE HANDLER

</script>