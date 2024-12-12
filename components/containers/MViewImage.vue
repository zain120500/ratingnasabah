<template>
    <dialog :id="id" :ref="ref" class="modal">
        <div class="z-80 w-screen h-screen bg-black/70 flex justify-center items-center">
            <form method="dialog" v-if="!loading">
                <button class="btn btn-sm bg-white btn-circle absolute right-2 top-2"
                    @click="mdl.modalImageToggle(id || '')">✕</button>
            </form>

            <div >
                <slot></slot>
            </div>
        </div>
    </dialog>
</template>

<script setup lang="ts">
const mdl = useUtilStore()
defineProps({
    id: {
        type: String
    },
    ref: {
        type: String
    },
    classPanel: {
        type: String,
        default: "justify-center items-center"
    },
    title: {
        type: String,
        default: ""
    },
    loading: {
        type: Boolean,
    }
})
</script>