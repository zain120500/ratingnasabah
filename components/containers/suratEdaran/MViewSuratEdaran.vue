<template>
    <ContainersMViewImage :id="id" :ref="id" class-panel="">
        <div class="text-3xl">
            <div v-if="props.mode == 'singleLocal'">
                <iframe class="h-screen w-screen" allowfullscreen :src='props.file' frameborder="0"></iframe>
            </div>
            <div v-if="props.mode == 'multiFetch'">
                <iframe class="h-screen w-screen" allowfullscreen :src='BASE_FILE_PATH + props.file[idx]?.filepath'
                    frameborder="0"></iframe>
                <div class="fixed h-[8rem] bottom-0 right-0 left-0">
                    <div class="flex items-center justify-center h-full bg-black">
                        <div class="flex items-center justify-center p-8 w-80">
                            <button v-if="idx > 0" class="btn-sm" @click="prev()">
                                <Icon class="text-white w-20 h-20" name="iconamoon:arrow-left-2-bold"></Icon>
                            </button>
                            <div class="text-white font-semibold items-center">{{ (idx + 1) }}</div>
                            <button class="btn-sm" v-if="idx < (props.file.length - 1)" @click="next()">
                                <Icon class="text-white w-20 h-20" name="iconamoon:arrow-right-2-bold"></Icon>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </ContainersMViewImage> 
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
const mdl = useUtilStore()
const BASE_FILE_PATH = import.meta.env.VITE_BASE_FILE_PATH;
const props: any = defineProps(
    {
        file: {
            type: Array
        },
        id: {
            type: String
        },
        mode: {
            type: String,
            require: true,
        }
    }
)
const idx = ref(0)

watch(() => props.file, () => {
    idx.value = 0
})

const prev = () => {
    idx.value--
}
const next = () => {
    idx.value++
}

</script>