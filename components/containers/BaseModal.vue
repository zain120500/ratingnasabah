<template>
    <dialog :id="id" class="modal" @keydown.esc.prevent overflow-auto>
        <form method="dialog" v-if="!loading">
            <button class="btn btn-sm bg-white btn-circle absolute right-2 top-2"
                @click="mdl.modalToggle(id || '')">✕</button>
        </form>
        <div :class="classPanel" class="bg-white h-auto max-h-[80vh] absolute p-5 rounded-xl overflow-auto">
            <h3 class="font-bold text-lg mb-5">{{ title }}</h3>
            <slot />
        </div>
    </dialog>
</template>

<script setup lang="ts">
const mdl = useUtilStore()
defineProps({
    id: {
        type: String
    },
    classPanel: {
        type: String,
        default: 'max-w-md'
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