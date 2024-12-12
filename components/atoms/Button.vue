<template>
    <div>
        <template v-if="isLoading">
            <button :type="type" disabled :class="[
                'flex items-center justify-center gap-x-1',
                'text-sm py-2.5 px-3 rounded-lg min-w-[80px] duration-300',
                variant === 'primary' && 'bg-primary   text-white',
                variant === 'danger' && 'bg-red-500  text-white',
                variant === 'warning' && 'bg-orange-400  text-white',
                variant === 'dark' && 'bg-slate-800  text-white',
                variant === 'secondary' && 'bg-slate-400  text-white'
            ]">
                <Icon v-if="isLoading" class="animate-spin" name="icomoon-free:spinner2" />
                <span>Proses...</span>
            </button>
        </template>
        <template v-else>
            <button :type="type" v-on="$listeners" :class="[
                'flex items-center justify-center gap-x-1',
                'text-sm py-2.5 px-3 rounded-lg min-w-[80px] duration-300',
                variant === 'primary' && 'bg-primary  hover:bg-[#1f5584] text-white',
                variant === 'danger' && 'bg-red-500  hover:bg-red-600 text-white',
                variant === 'warning' && 'bg-orange-400  hover:bg-orange-500 text-white',
                variant === 'dark' && 'bg-slate-800  hover:bg-slate-900 text-white',
                variant === 'secondary' && 'bg-slate-400  hover:bg-slate-500 text-white'
            ]">

                <Icon v-if="startIcon" :name="startIcon" />
                {{ label }}
            </button>
        </template>
    </div>
</template>

<script setup>
const props = defineProps({
    label: {
        type: String,
        default: "Button"
    },
    variant: {
        type: String,
        default: "secondary"
    },
    isLoading: {
        type: Boolean,
        default: false
    },
    startIcon: {
        type: String,
        default: ""
    },
    type: {
        type: String,
        default: "submit"
    }
})
</script>