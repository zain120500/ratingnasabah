<template>
    <!-- <h1 class="my-5 text-base font-bold text-primary">DATA BARANG</h1> -->
    <DragDropMultiplePDF :files="suratEdaran.activeSuratEdaran.data" :baseFilePath="BASE_FILE_PATH" id="surat-edaran"
        @photoTaken="photoTaken" @remove="remove"></DragDropMultiplePDF>
    <div class="text-center m-3">
        <button type="button" class="pgi-btn-blue btn-md px-10" @click="confirmSubmit">SUBMIT</button>
    </div>
    <ContainersBaseModalConfirm id="mConfirmSubmitSe" class-panel="w-11/12 md:w-2/3 max-w-5xl"
        title="Konfirmasi Tambah Surat Edaran" :loading="suratEdaran.loading">
        <p>Apakah anda yakin untuk menambahkan Surat Edaran ini ?</p>
        <div class="flex justify-end gap-2">
            <button class="pgi-btn-red btn-md" :disabled="suratEdaran.loading"
                @click="mdl.modalToggleConfirm('mConfirmSubmitSe')">Tutup</button>
            <button class="pgi-btn-blue btn-md" :disabled="suratEdaran.loading" @click="onSubmit()">{{ suratEdaran.loading
                ? 'Loading...' : 'SUBMIT' }}</button>
        </div>
    </ContainersBaseModalConfirm>
</template>

<script setup lang="ts">
import DragDropMultiplePDF from './DragDropMultiplePDF.vue';

const suratEdaran = useSuratEdaran()
const mdl = useUtilStore()
const BASE_FILE_PATH = import.meta.env.VITE_BASE_FILE_PATH;
import { isNullOrEmpty, toBase64 } from "~/utils/helper";

import { toast } from 'vue3-toastify';

const photoTaken = async (file: any) => {
    var data = []
    for (var item of file) {

        if (item.type == 'application/pdf') {
            var file: any = {}
            file.file = item
            file.base64 = await (toBase64(item))
            item = file

            data.push(item)
        } else {
            data.push(item)
        }
    }
    suratEdaran.activeSuratEdaran.data = data
}

const remove = (item: any) => {
    if (item.id) {
        suratEdaran.hapusSuratEdaran.push(item.id)
    }
    suratEdaran.activeSuratEdaran.data = suratEdaran.activeSuratEdaran.data.filter((file: any) => file != item)
}

const confirmSubmit = () => {
    mdl.modalToggleConfirm('mConfirmSubmitSe')
}

const onSubmit = async () => {

    await suratEdaran.submitSuratEdaran()
    await suratEdaran.FetchSuratEdaranElektronik()
    toast.success(`Surat Edaran berhasil ditambahkan!`)
    mdl.modalToggleConfirm('mConfirmSubmitSe')
    mdl.modalToggle('mAddSuratEdaran')
}

</script>