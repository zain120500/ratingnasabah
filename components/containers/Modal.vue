<template>
    <TransitionRoot appear :show="mdl.isOpenModal" as="template">
        <Dialog as="div" @close="closeModal" class="relative z-50">
            <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
                leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 bg-black bg-opacity-25" />
            </TransitionChild>
            <div class="fixed inset-0 overflow-y-auto">
                <div class="flex min-h-full items-center justify-center p-4 text-center">
                    <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
                        enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100"
                        leave-to="opacity-0 scale-95">
                        <DialogPanel :class="classPanel ? classPanel : 'max-w-md'"
                            class="w-full transform  rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                            <div class="flex items-center justify-between p-4">
                                <DialogTitle as="h3" class="text-lg  text-gray-600">
                                    {{ title }}
                                </DialogTitle>
                                <button v-if="hasClose" @click="mdl.toggleModal()"
                                    class="h-7 w-7 hover:bg-red-200 bg-red-50 text-red-500 rounded-full flexCenter">
                                    <Icon name="material-symbols:close" />
                                </button>
                            </div>
                            <div class="px-5 pb-4">
                                <slot />
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>
  
<script setup lang="ts">
import { useUtilStore } from "~/stores/utils"
const mdl = useUtilStore()
import {
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogPanel,
    DialogTitle,
} from '@headlessui/vue'
defineProps({
    classPanel: {
        type: String
    },
    title: {
        type: String,
        default: ""
    },
    hasClose: {
        type: Boolean,
        default: false
    },
})


function closeModal() {
    mdl.toggleModal()
}
</script>
  