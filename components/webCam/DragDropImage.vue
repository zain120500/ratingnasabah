<template>
    <div class="text-xs w-full sm:w-1/3 mt-3">
        <div v-if="file != null" class="mt-2">
            <div class="image-container border-2 border-slate-400 rounded-lg">
                <img :src=file class="centered-image p-1" />
                <div class="absolute flex justify-end items-start top-0 right-0 left-0 p-1">
                    <button class="bg-white rounded-md border" @click="remove">
                        <Icon name="material-symbols:close" class="text-red-600 w-8 h-8 p-1"></Icon>
                    </button>
                </div>
                <div class="absolute flex justify-end items-end bottom-0 right-0 left-0 p-1">
                    <button class="bg-white rounded-md p-2 border" @click="showModal">
                        <span clas="">View</span>
                    </button>
                </div>
            </div>
        </div>
        <div v-else class="dropzone-container grid grid-rows-2" :style="isDragging == true ? 'border-color: green;' : ''"
            @dragover="dragover" @dragleave="dragleave" @drop="drop">
            <div>
                <label>
                    <div v-if="isDragging">Lepaskan Foto.</div>
                    <div v-else>Tarik Foto ke sini</div>
                </label>
            </div>
            <div>
                <input type="file" name="file" :id="id" class="hidden" @change="onChange" ref="file"
                    accept="application/octet-stream .jpg, .jpeg, .png" />
                <label class="pgi-btn-blue file-label mr-2" :for="id">
                    <Icon name="ion:image-sharp" class="mr-1"></Icon> Telusuri Foto
                </label>
                <button class="pgi-btn-blue " @click="showModalWebCam">
                    <Icon name="bi:camera-fill" class="mr-1"></Icon> Kamera
                </button>
            </div>
        </div>
        <ContainersMViewImage :id="id" :ref="myModal">
            <div v-if="file != null" class="px-10">
                <img :src=file id="modal-img" class="max-h-[80vh]" />
                <a v-if="file != null" :href="file" target="_blank" class="text-white pt-2 text-md">Buka di Browser</a>
            </div>
        </ContainersMViewImage>
        <ModalWebCam :id="'cam-' + id" @photoTaken="resultcamera"></ModalWebCam>
    </div>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';
import { toBase64, resizeImage } from "~/utils/helper"
import ModalWebCam from './WebCam.vue';

export default defineComponent({
    components: {
        ModalWebCam,
    },
    emits: ['photoTaken','remove'],
    props: {
        id: {
            type: String,
            default: ''
        },
        index: {
            type: String,
            default: ''
        },
        file: {
            type: Object
        }

        
    },
    data() {
        return {
            isDragging: false,
            // file: null,

            showMessage: false,
            myModal: 'myModal'
        };
    },
    methods: {
        async resultcamera(value: any) {
            // this.file = value
            this.$emit('photoTaken', value, this.index)
        },
        showModal() {
            const mdl = useUtilStore()
            mdl.modalImageToggle(this.id)
        },
        showModalWebCam() {
            const mdl = useUtilStore()
            mdl.modalWebCamToggle('cam-' + this.id)
        },
        async onChange() {
            const fileInput = this.$refs.file as HTMLInputElement;
            let incomingFiles: File[] = Array.prototype.slice.call(fileInput.files);

            let base64 = await toBase64(incomingFiles[0])

            let resize: any = await resizeImage(base64)
            // this.file = resize

            this.$emit('photoTaken', resize , this.index)
        },
        dragover(e: DragEvent) {
            e.preventDefault();
            this.isDragging = true;
        },
        dragleave() {
            this.isDragging = false;
        },
        drop(e: DragEvent) {
            e.preventDefault();
            if (this.$refs.file instanceof HTMLInputElement) {
                const droppedFiles = e.dataTransfer?.files;
                if (droppedFiles) {
                    this.$refs.file.files = droppedFiles;
                    this.onChange();
                }
                this.onChange();
                this.isDragging = false;
            }
        },
        remove() {
            this.$emit('remove', this.index)
        },
        generateURL(file: any) {
            let fileSrc = URL.createObjectURL(file);
            setTimeout(() => {
                URL.revokeObjectURL(fileSrc);
            }, 1000);
            return fileSrc;
        },
    },
});
</script>