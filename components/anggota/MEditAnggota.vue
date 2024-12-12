<template>
    <div v-if="anggota.loading" class="text-center text-primary">
        <span class="loading loading-spinner text-center loading-lg"></span>
        <p>LOADING...</p>
    </div>
    <div v-else>
        <DataIdentitas />
        <!-- <DataRekening /> -->
        <DataAnggota />
        <DataKerabat />
        <DataPihakLain />
        <DataPendukung id="MEditAnggota" />
        <ContainersBaseModal id="modal-confirm-edit-anggota" class-panel="w-11/12 md:w-2/3 max-w-5xl"
            title="Konfirmasi Edit Anggota" :loading="anggota.loading">
            Apakah anda yang anda yakin untuk mengubah anggota ini ?
            <div class="flex justify-end gap-2">
                <button class="pgi-btn-red btn-md"
                    @click="mdl.modalToggleConfirm('modal-confirm-edit-anggota')">Batal</button>
                <button type="button" class="pgi-btn-blue btn-md" @click="submit">Ya</button>
            </div>
        </ContainersBaseModal>
        <div class="flex justify-center mt-3">
            <button type="button" class="pgi-btn-blue btn-md px-10" :disabled="anggota.loading"
                @click="confirmSubmit">SUBMIT</button>
        </div>
    </div>
</template>

<script lang="ts" setup>
const mdl = useUtilStore()
import DataIdentitas from './DataIdentitas.vue'
import DataRekening from './DataRekening.vue'
import DataAnggota from './DataAnggota.vue'
import DataKerabat from './DataKerabat.vue'
import DataPihakLain from './DataPihakLain.vue'
import DataPendukung from './DataPendukung.vue'

const anggota = useAnggota()

const confirmSubmit = () => {
    if (anggota.confirmSubmit(true)) {
        mdl.modalToggleConfirm('modal-confirm-edit-anggota')
    }
}

const submit = () => {
    anggota.onSubmitEdit()
}

onMounted(() => {

});

</script>
