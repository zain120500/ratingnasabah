<template>
    <div v-if="variant === 'primary'"
        className="py-[1px] text-[9px] px-1.5 uppercase bg-primary text-white rounded-full inline-flex items-center justify-center text-xs">
        {{ label }}
    </div>
    <div v-if="variant === 'success'"
        className="py-[1px] text-[9px] px-1.5 uppercase bg-success text-white rounded-full inline-flex items-center justify-center text-xs">
        {{ label }}
    </div>
    <div v-if="variant === 'warning'"
        className="py-[1px] text-[9px] px-1.5 uppercase bg-warning text-white rounded-full inline-flex items-center justify-center text-xs">
        {{ label }}
    </div>
    <div v-if="variant === 'danger'"
        className="py-[1px] text-[9px] px-1.5 uppercase bg-error text-white rounded-full inline-flex items-center justify-center text-xs">
        {{ label }}
    </div>
    <div v-if="variant === 'secondary'"
        className="py-[1px] text-[9px] px-1.5 uppercase bg-secondary text-white rounded-full inline-flex items-center justify-center text-xs">
        {{ label }}
    </div>
</template>

<script setup lang="ts">
defineProps({
    label: String,
    variant: String
})
</script>