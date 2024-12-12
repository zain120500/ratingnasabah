<script setup lang="ts">
import { defineProps } from 'vue';
import DragDropImage from '../webCam/DragDropImage.vue';
const anggota = useAnggota()

const props = defineProps({ id: { type: String , required: true } })
const photoTaken = (file: any, index: any) => {
    let idx = anggota.dataFoto.findIndex((item: any) => item.index == index)
    anggota.dataFoto[idx].fotoBase64 = file
}

const remove = (index: any) => {
    let idx = anggota.dataFoto.findIndex((item: any) => item.index == index)
    anggota.dataFoto[idx].fotoBase64 = null
}

</script>
<template>
    <h1 class="my-4 text-base font-bold text-primary">UPLOAD FOTO</h1>
    <div v-for="item of anggota.dataFoto">
        <label for="nama">{{ item.namaFoto }}<span v-if="item.id == 0" class="text-small text-red-500">*</span></label>
        <DragDropImage :file="item.fotoBase64" :id="props.id + item.id.toString()" :index="item.index" @photoTaken="photoTaken" @remove="remove"></DragDropImage>
    </div>
</template>
