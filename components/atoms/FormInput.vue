<script setup>
import { useField } from 'vee-validate';
const props = defineProps({
    name: String,
    label: String,
    placeholder: String,
    isLongText: {
        type: Boolean,
        default: false
    },
    required: { type: Boolean, default: false },
    id: {
        type: undefined,
    },
    type: {
        type: String,
        default: "text"
    },
    multiple: {
        type: Boolean,
        default: false
    }
});
const { value, errorMessage } = useField(() => props.name);
</script>

<template>
    <div>
        <label class="text-sm block mb-1 text-slate-500" :for="id">
            {{ label }} <sup v-if="required" class="text-red-400">*</sup>
        </label>
        <div class="border rounded-[6px]" :class="[
            errorMessage ? 'border-red-300 bg-[#fdf2f2]' : '',
            !errorMessage && 'focus-within:border-blue-300'
        ]">

            <input :multiple="multiple" v-if="!isLongText" :id="id" v-model="value" :type="type" :placeholder="placeholder"
                :class="type === 'file' ? 'py-[4.5px]' : 'py-[7px]'" class="outline-none  px-2 bg-transparent w-full ">
            <textarea rows="5" v-if="isLongText" :id="id" v-model="value" :type="type" :placeholder="placeholder"
                class="outline-none py-[7px] px-2 bg-transparent w-full "></textarea>
        </div>
        <div v-if="errorMessage" class="text-[11px] text-red-400">{{ errorMessage }}</div>
    </div>
</template>




<!-- <template>
    <div>
        <label class="text-sm block mb-1 text-slate-500" :for="id">
            {{ label }} <sup v-if="required" class="text-red-400">*</sup>
        </label>
        <div class="border rounded-lg " :class="[
            errorMessage ? 'border-red-400 bg-red-50' : '',
            !errorMessage && 'focus-within:border-blue-300'
        ]">
            <input :id="id" :value="value" :type="type" :placeholder="placeholder"
                class="outline-none p-2 bg-transparent w-full ">
        </div>
        <div v-if="errorMessage" class="text-[11px] text-red-400">{{ errorMessage }}</div>
    </div>
</template>
<script setup>
import { useField } from 'vee-validate';

const props = defineProps({
    required: {
        type: Boolean,
        default: false
    },
    label: {
        type: undefined,
    },
    placeholder: {
        type: String,
        default: ""
    },
    id: {
        type: undefined,
    },
    type: {
        type: String,
        default: "text"
    },
    error: {
        type: undefined,
    },
})

const { value, errorMessage } = useField(() => props.name);
</script> -->