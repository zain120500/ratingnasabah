
<template>
    <div class="form-content-wrapper md:w-2/3 lg:w-1/2 xl:w-1/4">
        <div>
            <h1 class="mt-4 text-base font-bold text-primary">DATA ANGGOTA</h1>
        </div>
        <div class="flex pt-5 justify-between sm:text-sm">
            <button @click="modalToggle('mSelectAnggota')" class="pgi-btn-blue btn-sm text-white">
                <Icon name="ion:person-outline"></Icon>
                Pilih Anggota
            </button>

            <button class="pgi-btn-blue btn-sm text-white" @click="addAnggota()">
                <Icon name="ic:baseline-plus"></Icon>
                Anggota Baru
            </button>
        </div>
        <div class="pt-5 text-sm space-y-2">

            <div class="grid grid-cols-2">
                <label>No. Anggota</label>
                <strong v-if="anggota.anggota.no != null">{{ anggota.anggota.no }}</strong>
                <strong v-else>-</strong>
            </div>
            <div class="grid grid-cols-2">
                <label>No. Member</label>
                <strong v-if="anggota.anggota.noMember != null">{{ anggota.anggota.noMember }}</strong>
                <strong v-else>-</strong>
            </div>
            <div class="grid grid-cols-2">
                <label>Jenis Identitas</label>
                <strong v-if="anggota.anggota.jenisIdentitas != null">{{ anggota.anggota.jenisIdentitas.name }}</strong>
                <strong v-else>-</strong>
            </div>
            <div class="grid grid-cols-2">
                <label>No. Identitas</label>
                <strong v-if="anggota.anggota.noIdentitas != null">{{ anggota.anggota.noIdentitas }}</strong>
                <strong v-else>-</strong>
            </div>
            <div class="grid grid-cols-2">
                <label>Nama</label>
                <strong v-if="anggota.anggota.nama != null">{{ anggota.anggota.nama }}</strong>
                <strong v-else>-</strong>
            </div>
            <div class="grid grid-cols-2">
                <label>No. Hp</label>
                <strong v-if="anggota.anggota.noHp != null">{{ anggota.anggota.noHp }}</strong>
                <strong v-else>-</strong>
            </div>
            <div class="grid grid-cols-2">
                <label>Alamat</label>
                <strong v-if="anggota.anggota.alamat != null">{{ anggota.anggota.alamat }}</strong>
                <strong v-else>-</strong>
            </div>

        </div>
        <div v-if="anggota.anggota.id" class="grid grid-cols-3 gap-2 pt-5">
            <button class="pgi-btn-blue btn-sm text-white text-xs" @click="editAnggota()">
                <!-- <Icon name="ion:person-outline"></Icon> -->
                Edit Anggota
            </button>
            <button @click="detailAnggota" class="pgi-btn-blue btn-sm text-white text-xs">
                <!-- <Icon name="ic:baseline-plus"></Icon> -->
                Detail Anggota
            </button>
            <button class="pgi-btn-blue btn-sm text-white text-xs" @click="mdl.modalToggle('resetPassword')">
                <!-- <Icon name="ic:baseline-plus"></Icon> -->
                Reset Password
            </button>
        </div>

    </div>

    <ContainersBaseModal id="mSelectAnggota" class-panel="w-11/12 max-w-5xl" title="Pilih Anggota!"
        :loading="anggota.loading">
        <MSelectAnggota @selectedAnggota="selectedAnggota" />
    </ContainersBaseModal>
    <ContainersBaseModal id="mAddAnggota" class-panel="w-11/12 max-w-5xl" title="Tambah Anggota" :loading="anggota.loading">
        <MAddAnggota />
    </ContainersBaseModal>
    <ContainersBaseModal id="mEditAnggota" class-panel="w-11/12 max-w-5xl" title="Edit Anggota" :loading="anggota.loading" >
        <MEditAnggota />
    </ContainersBaseModal>
    <ContainersBaseModal id="detailAnggota" class-panel="w-11/12 max-w-5xl" title="Detail Anggota"
        :loading="anggota.loading">
        <MDetailAnggota />
    </ContainersBaseModal>
    <ContainersBaseModal id="resetPassword" class-panel="sm:w-1/2 w-11/12 max-w-5xl" title="Reset Password Nasabah"
        :loading="anggota.loading">
        <MResetPassword />
    </ContainersBaseModal>
</template>
<script setup lang="ts">

import MSelectAnggota from './MSelectAnggota.vue'
import MAddAnggota from './MAddAnggota.vue'
import MEditAnggota from './MEditAnggota.vue'
import MDetailAnggota from './MDetailAnggota.vue'
import MResetPassword from './MResetPassword.vue'

const props = defineProps({
    isGadaiKendaraan: { type: Boolean, default: false }
})
const mdl = useUtilStore()

const suratEdaran = useSuratEdaran()
const anggota = useAnggota()
anggota.isGadaiKendaraan = props.isGadaiKendaraan

const modalToggle = (modal: any) => {
    mdl.modalToggle(modal)
}

const addAnggota = () => {
    anggota.resetDataIdentitas();
    anggota.resetDataAnggota();
    anggota.resetDataKerabat();
    anggota.resetDataPihakLain();
    anggota.resetDataFoto();
    anggota.resetDataSurvei();
    mdl.modalToggle('mAddAnggota')
}
const selectedAnggota = () => {
    mdl.modalToggle('mSelectAnggota')
}

const detailAnggota = () => {
    mdl.modalToggle('detailAnggota')
    anggota.getAnggotaDetail()
}

const editAnggota = async () => {
    mdl.modalToggle('mEditAnggota')
    anggota.editAnggota();
}

</script>