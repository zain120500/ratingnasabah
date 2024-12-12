<template>
    <div class="border rounded-lg flex items-center">
        <input placeholder="cari..." class="px-2 py-1.5 bg-transparent w-full outline-none" :value="modelValue"
            @change="$emit('update:modelValue', $event.target.value)" :id="id" />
        <div class="w-8 flex items-center justify-center">
            <Icon name="fa-search" />
        </div>
    </div>
</template>
<script>
export default {
    props: {
        id: String,
        labelText: String,
        modelValue: String,
    },
};
</script>