<template>
    <DataIdentitas />
    <DataAnggota />
    <DataKerabat />
    <DataPihakLain />
    <DataPendukung id="MAddAnggota" />
    <ContainersBaseModal id="modal-confirm" class-panel="w-11/12 md:w-2/3 max-w-5xl" title="Konfirmasi Tambah Anggota"
        :loading="anggota.loading">
        Apakah anda yang anda yakin untuk menambahkan anggota ini ?
        <div class="flex justify-end gap-2">
            <button class="pgi-btn-red btn-md" @click="mdl.modalToggleConfirm('modal-confirm')">Batal</button>
            <button class="pgi-btn-blue btn-md" @click="submit">Ya</button>
        </div>
    </ContainersBaseModal>
    <DataSurvei />
    <div class="flex justify-center mt-3">
        <button class="pgi-btn-blue btn-md px-10" :disabled="anggota.loading" @click="confirmSubmit">SUBMIT</button>
    </div>
</template>

<script lang="ts" setup>
const mdl = useUtilStore()
import DataIdentitas from './DataIdentitas.vue'
import DataAnggota from './DataAnggota.vue'
import DataKerabat from './DataKerabat.vue'
import DataPihakLain from './DataPihakLain.vue'
import DataPendukung from './DataPendukung.vue'
import DataSurvei from './DataSurvei.vue'
const anggota = useAnggota()

const confirmSubmit = () => {
    if (anggota.confirmSubmit()) {
        mdl.modalToggleConfirm('modal-confirm')
    }
}

const submit = () => {
    anggota.onSubmit()
}

</script>
