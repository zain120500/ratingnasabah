<template>
    <h2 class="text-lg font-semibold">{{ label }}</h2>
</template>

<script setup lang="ts">
defineProps({
    label: {
        type: String,
        required: true,
    },
});
</script>