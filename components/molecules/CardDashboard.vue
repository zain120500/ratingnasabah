<template>
    <div class="flex bg-white p-4 rounded-lg">
        <div class="flex-1">
            <h2 class="text-2xl font-semibold">{{ count }}</h2>
            <span class="text-xs md:text-sm">{{ title }}</span>
        </div>
        <div class="w-8 h-8 text-xl bg-blue-50 text-primary flex justify-center items-center rounded-lg">
            <Icon :name="icon" />
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    count?: string;
    title?: string,
    icon: string
}>();
</script>