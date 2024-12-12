<template>
    <div class="relative">
        <div class="mb-2">
            <EasyDataTable hide-footer border-cell alternating theme-color="#1e73be" table-class-name="pgi-table"
                :headers="headers" :items="menu.menuAll">
                <template #item-name="{ name }">
                    <span>{{ name }}</span>
                </template>
                <template :key="k" v-for="(i, k) in role.roleOptions" #item="item">
                    <div class="flex items-center justify-center">
                        <div class="form-control">
                            <label class="label cursor-pointer">
                                <input type="checkbox" :checked="false" class="checkbox checkbox-primary" />
                            </label>
                        </div>
                    </div>
                </template>
            </EasyDataTable>
        </div>
        <div class="sticky bottom-0 z-40 flex justify-end items-center h-16 bg-white">
            <AtomsButton start-icon="material-symbols:upload" variant="primary" label="UPDATE" />
        </div>
    </div>
</template>

<script setup lang="ts">
import EasyDataTable, { Header } from "vue3-easy-data-table";
const menu = useMenuStore()
const role = useRoleStore()
role.getRoles()
menu.getMenus()




const roleHeader: Header[] = role.roleOptions.map((item: any) => {
    return {
        text: item.name,
        value: item.name,
        width: 170,
    }
})

const headers: Header[] = [
    {
        text: 'Nama Menu',
        value: 'name',
        fixed: true, width: 170
    },
    ...roleHeader
]
</script>