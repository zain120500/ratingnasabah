<template>
    <nav class="inline-flex items-center text-sm font-normal font-body">
        <ol class="flex items-center w-auto leading-none group md:flex-wrap">
            <li v-for="(item, index) in breadcrumbs" :key="item.name"
                class="peer hidden sm:flex peer-[:nth-of-type(even)]:before:content-['/']  peer-[:nth-of-type(even)]:before:leading-5 last-of-type:flex last-of-type:before:font-normal last-of-type:before:text-neutral-500 text-primary last-of-type:text-neutral-400 last-of-type:font-medium">
                <SfLink v-if="index === 0" :href="item.path" variant="secondary" :tag="NuxtLink"
                    class-name="inline-flex leading-5 no-underline hover:underline active:underline whitespace-nowrap outline-secondary-600 text-neutral-500">
                    <Icon class="mr-1" name="lucide:layout-dashboard" />
                </SfLink>
                <SfLink v-else :href="item.path" variant="secondary" :tag="NuxtLink"
                    class="leading-5 capitalize text-xs no-underline hover:underline active:underline whitespace-nowrap outline-secondary-600 text-inherit">
                    {{ item.name }}
                </SfLink>
            </li>
        </ol>
    </nav>
</template>
  
<script  setup>
import { SfLink } from '@storefront-ui/vue';
import { ref } from 'vue';

import { resolveComponent } from 'vue';

const NuxtLink = resolveComponent('NuxtLink');
const props = defineProps({
    breadcrumbs: {
        type: Array,
        required: true,
    },
});

const dropdownOpened = ref(false);
const close = () => {
    dropdownOpened.value = false;
};
const toggle = () => {
    dropdownOpened.value = !dropdownOpened.value;
};
</script>