<template>
    <div class="flex">
        
        <NuxtLoadingIndicator color="#1e73be" />
        <!-- <SideMenu /> -->
        <main class="h-screen bg-blue-50 flex-1 overflow-auto">
            <PageHeader />
            <div class="container p-3">
                <slot />

            </div>
        </main>
    </div>
</template>

<script setup>

definePageMeta({
    middleware: 'auth'
})
</script>