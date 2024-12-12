<template>
    <EasyDataTable hide-footer :server-items-length="pll.pll_lists.total" border-cell alternating theme-color="#1e73be"
        :loading="pll.loading" table-class-name="pgi-table" :headers="headers" :items="pll.pll_lists.data">
        <template #header-aksi="header">
            <div class="ml-auto">
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
                {{ pll.pll_lists.from }} - {{ pll.pll_lists.to }} dari {{ pll.pll_lists.total }}
            </div>
        </div>
        <v-pagination v-model="pll.pll_lists.current_page" :pages="pll.pll_lists.last_page" :range-size="1"
            @update:modelValue="updateCurrentPage" />
    </ContainersPaginateContainer>
    <ContainersModalEdit :has-close="true" class-panel="max-w-md" title="Edit Tipe Beban Usaha">
        <form @submit.prevent="onUpdate">
            <div class="mb-3">
                <label for="name" class="form-label">Nama Akun</label>
                <Field placeholder="nama" name="name" id="name" class="form-input" type="text" v-model="formEdit.name" />
            </div>
            <div class="flex justify-end mt-4 gap-x-2">
                <AtomsButton @click="mdl.toggleModalEdit()" label="Batal" type="button" variant="dark" />
                <AtomsButton :is-loading="isLoading" label="Simpan" type="submit" variant="primary" />
            </div>
        </form>
    </ContainersModalEdit>
    <ContainersModalConfirm :hasClose="true" classPanel="max-w-md" title="Konfirmasi">
        <div class="mb-4">
            <p>Anda yakin akan menghapus data,</p>
            <h3 class="font-bold mt-1">{{ formEdit?.name }}?</h3>
        </div>
        <div class="flex justify-end gap-x-3">
            <AtomsButton type="button" @click="mdl.toggleConfirm()" label="Batal" variant="dark" />
            <AtomsButton :isLoading="isLoading" @click="confirmDelete" startIcon="mdi:trash" label="Ya, Hapus"
                variant="danger" />
        </div>
    </ContainersModalConfirm>
</template>

<script setup lang="ts">
import { rowsPerPageOptions } from "@/data/options";
import VPagination from "@hennge/vue3-pagination";
import { Field, useForm } from "vee-validate";
import EasyDataTable from "vue3-easy-data-table";
import { pllSchema } from "~/schemas/validation";
import headers from "./column";

const query: any = ref({ page: 1, per_page: 10 })
const mdl = useUtilStore()
const pll = useTipePllStore()
await pll.getTipePLL(query.value)

const isLoading = ref(false)
const formEdit: any = ref({
    id: null,
    name: null
})
const handleEdit = (item: any) => {
    formEdit.value.id = item.id
    formEdit.value.name = item.name
    mdl.toggleModalEdit()
}

const { handleSubmit } = useForm({
    validationSchema: pllSchema
})
const onUpdate = handleSubmit(async (values) => {
    isLoading.value = true
    mdl.toggleModalEdit()
    await pll.updateTipePLL(formEdit.value.id, values, query.value)
    isLoading.value = false
})


// ======== START HANDLE DELETE ========//
const handleDelete = (item: any) => {
    formEdit.value = item
    mdl.toggleConfirm()
}
const confirmDelete = async () => {
    isLoading.value = true
    mdl.toggleConfirm()
    await pll.deleteTipePLL(formEdit.value.id, query.value)
    formEdit.value.id = null
    formEdit.value.name = null
    isLoading.value = false
}
// ======== END HANDLE DELETE ========//

// PAGINATE HANDLER
const updateCurrentPage = async (value: number) => {
    query.value.page = value
    await pll.getTipePLL(query.value)
}
const updateRowsPerPageSelect = async (value: any) => {
    query.value.per_page = value.target.value
    query.value.page = 1
    await pll.getTipePLL(query.value)
}
// PAGINATE HANDLER
</script>