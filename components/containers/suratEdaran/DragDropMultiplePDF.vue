<template>
    <div class="text-xs w-full  mt-3">
        <div class="dropzone-container grid grid-rows-2" :style="isDragging == true ? 'border-color: green;' : ''"
            @dragover="dragover" @dragleave="dragleave" @drop="drop">
            <div>
                <label>
                    <div v-if="isDragging">Lepaskan File.</div>
                    <div v-else>Tarik File ke sini</div>
                </label>
            </div>
            <div>
                <input type="file" multiple name="file" :id="id" class="hidden" @change="onChange" ref="file"
                    accept="application/pdf" />
                <label class="pgi-btn-blue file-label mr-2" :for="id">
                    <Icon name="ion:image-sharp" class="mr-1"></Icon> Telusuri File
                </label>
            </div>
        </div>

        <div v-if="files?.length != 0" class="mt-2 grid sm:grid-cols-3 lg:grid-cols-4 gap-2">
            <div v-for="item of files">
                <div class="image-container border-2 border-slate-400 rounded-lg">
                    <iframe v-if="item.filepath" :src="baseFilePath + item.filepath" class="centered-image p-1" />
                    <iframe v-else :src=item.base64 class="centered-image p-1" />
                    <div class="absolute flex justify-end items-start top-0 right-0 left-0 p-1">
                        <button class="bg-white rounded-md border" @click="remove(item)">
                            <Icon name="material-symbols:close" class="text-red-600 w-8 h-8 p-1"></Icon>
                        </button>
                    </div>
                    <div class="absolute flex justify-end items-end bottom-0 right-0 left-0 p-1">
                        <button class="bg-white rounded-md p-2 border"
                            @click="showModal(!isNullOrEmpty(item.filepath) ? baseFilePath + item.filepath : item.base64)">
                            <span clas="">View</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <ContainersSuratEdaranMViewSuratEdaran mode="singleLocal" :id="'dragdropSE-' + id" :file="activeFoto">
        </ContainersSuratEdaranMViewSuratEdaran>
    </div>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';
import { toast } from 'vue3-toastify';

export default defineComponent({
    emits: ['photoTaken','remove'],
    props: {
        id: {
            type: String,
            default: ''
        },
        files: {
            type: Array,
            default: []
        },
        baseFilePath: {
            type: String,
        }
    },
    data() {
        return {
            isDragging: false,

            showMessage: false,
            myModal: 'myModal',
            activeFoto: "",
        };
    },
    watch: {
        'files.length': function () {
            this.$emit('photoTaken', this.files)
        }
    },
    methods: {
        showModal(item: any) {
            this.activeFoto = item
            const mdl = useUtilStore()
            mdl.modalImageToggle('dragdropSE-' + this.id)
        },
        showModalWebCam() {
            const mdl = useUtilStore()
            mdl.modalWebCamToggle('cam-' + this.id)
        },
        async onChange() {
            const fileInput = this.$refs.file as HTMLInputElement;
            let incomingFiles: File[] = Array.prototype.slice.call(fileInput.files);
            for (let item of incomingFiles) {
                if (item.type == 'application/pdf') {
                    if (!this.isFileAlreadyAdded(item)) {
                        this.files.push(item);
                    } else {
                        toast.error(`foto ${item.name} sudah ada`)
                    }

                } else {
                    toast.error(`format file ${item.name} bukan .pdf`)
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
            this.$emit('remove', item)
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
            return this.files.some((existingFile: any) => existingFile?.file?.name === file.name);
        },
    },
});
</script>