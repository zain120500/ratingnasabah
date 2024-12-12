<template>
    <div class="text-xs w-full  mt-3">
        <div v-if="$props.files?.length < 20" class="dropzone-container grid grid-rows-2"
            :style="isDragging == true ? 'border-color: green;' : ''" @dragover="dragover" @dragleave="dragleave"
            @drop="drop">
            <div>
                <label>
                    <div v-if="isDragging">Lepaskan Foto.</div>
                    <div v-else>Tarik Foto ke sini max 20</div>
                </label>
            </div>
            <div>
                <input type="file" multiple name="file" :id="id" class="hidden" @change="onChange" ref="file"
                    accept="application/octet-stream .jpg, .jpeg, .png" />
                <label class="pgi-btn-blue file-label mr-2" :for="id">
                    <Icon name="ion:image-sharp" class="mr-1"></Icon> Telusuri Foto
                </label>
                <button type="button" class="pgi-btn-blue " @click="showModalWebCam">
                    <Icon name="bi:camera-fill" class="mr-1"></Icon> Kamera
                </button>
            </div>
        </div>
        <div v-else>
            <label class="text-red-600">* Foto Pendukung Maksimal 20</label>
        </div>
        <div v-if="$props.files?.length != 0" class="mt-2 grid sm:grid-cols-3 lg:grid-cols-4 gap-2">
            <div v-for="item of $props.files">
                <div class="image-container border-2 border-slate-400 rounded-lg">
                    <img :src=item.fotoBase64 class="centered-image p-1" />
                    <div class="absolute flex justify-end items-start top-0 right-0 left-0 p-1">
                        <button class="bg-white rounded-md border" @click="remove(item.fotoBase64)">
                            <Icon name="material-symbols:close" class="text-red-600 w-8 h-8 p-1"></Icon>
                        </button>
                    </div>
                    <div class="absolute flex justify-end items-end bottom-0 right-0 left-0 p-1">
                        <button class="bg-white rounded-md p-2 border" @click="showModal(item.fotoBase64)">
                            <span clas="">View</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <ContainersMViewImage :id="'view-' + id" :ref="myModal">
            <img :src=activeFoto id="modal-img" class="max-h-[80vh]" />
            <a v-if="activeFoto != null" :href="activeFoto" target="_blank" class="text-white pt-2 text-md">Buka di
                Browser</a>
        </ContainersMViewImage>
        <ModalWebCam :id="'cam-' + id" @photoTaken="resultcamera"></ModalWebCam>
    </div>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';
import { toBase64, resizeImage } from "~/utils/helper"
import ModalWebCam from './WebCam.vue';
import { toast } from 'vue3-toastify';

export default defineComponent({
    components: {
        ModalWebCam,
    },
    emits: ['photoTaken', 'removeFoto'],
    props: {
        id: {
            type: String,
            required: true
        },
        files: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            isDragging: false,
            // files: [] as File[],
            showMessage: false,
            myModal: 'myModal',
            activeFoto: ""
        };
    },
    methods: {
        async resultcamera(value: any) {
            if (this.$props.files.length < 20) {
                let timeStamp: any = await timeStampImage(value)
                this.$emit('photoTaken', timeStamp)
            } else {
                toast.error(`Foto Pendukung Maksimal 20`)
            }
        },
        showModal(item: any) {
            this.activeFoto = item
            const mdl = useUtilStore()
            mdl.modalImageToggle('view-' + this.id)
        },
        showModalWebCam() {
            const mdl = useUtilStore()
            mdl.modalWebCamToggle('cam-' + this.id)
        },
        async onChange() {
            const fileInput = this.$refs.file as HTMLInputElement;
    
            let incomingFiles: File[] = Array.prototype.slice.call(fileInput.files);
        
            for (let item of incomingFiles) {
                if (item.type == 'image/jpeg' || item.type == 'image/png' || item.type == 'image/jpg') {
                    if (this.$props.files.length < 20) {
                        let itemBase64: any = (await toBase64(item))
                        let resize: any = await resizeImage(itemBase64)
                        let timeStamp: any = await timeStampImage(resize)
                        if (!this.isFileAlreadyAdded(item.name)) {
                            this.$emit('photoTaken', timeStamp, item.name)
                        } else {
                            toast.error(`foto ${item.name} sudah ada`)
                        }
                    } else {
                        toast.error(`Foto Pendukung Maksimal 20`)
                    }
                } else {
                    toast.error(`format foto ${item.name} harus .jpg / .png`)
                }
            }
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
                this.isDragging = false;
            }
        },
        remove(item: any) {
            this.$emit('removeFoto', item)
        },
        generateURL(file: any) {
            let fileSrc = URL.createObjectURL(file);
            setTimeout(() => {
                URL.revokeObjectURL(fileSrc);
            }, 1000);
            return fileSrc;
        },
        getFileUrl(file: any) {
            return URL.createObjectURL(file);
        },
        isFileAlreadyAdded(file: any) {
            return this.$props.files.some((existingFile: any) => existingFile.name == file);
        },
    },
});
</script>