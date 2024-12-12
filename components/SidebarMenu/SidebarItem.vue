
<script setup lang="ts">
const route = useRoute()
defineProps<{
    links?: any[];
    stateMenu: any
}>();

const routerPath = route.path
const parentMenu = routerPath && routerPath.split("/").filter(i => i !== "").shift()
</script>
<template>
    <div class="flex flex-col">
        <template v-for="(l, i) in links" :key="i">
            <template v-if="l.type || l.type === 'separator'">
                <div class="px-3 mt-5 text-[10px]">
                    <label class="uppercase font-semibold text-slate-300">{{ l.title }}</label>
                </div>
            </template>
            <template v-else>
                <NuxtLink @click="stateMenu.closeMenu()" v-if="!l.items" :to="l.path"
                    class="inline-flex sidebarItemTrans relative items-center gap-4 p-3 px-4 text-left text-[14px]">
                    <Icon v-if="l.icon" :name="l.icon" class="h-5 w-5  text-muted-foreground" />
                    <div class="truncate text-white">
                        {{ l.title }}
                        <label class="bg-red-200 text-red-700 absolute ml-1 px-1 rounded bottom-4 text-[9px]"
                            v-if="l.comingsoon">
                            new
                        </label>
                    </div>
                </NuxtLink>

                <HDisclosure :defaultOpen="l.path && parentMenu === l.path" v-slot="{ open }" v-else>
                    <HDisclosureButton
                        class="inline-flex text-slate-100 items-center justify-between p-3 px-4 text-left text-[14px]">
                        <div class="flex items-center relative text-slate-100 gap-4 ">
                            <Icon v-if="l.icon" :name="l.icon" class="h-5 w-5 text-muted-foreground" />
                            <label class="truncate text-white">
                                {{ l.title }}
                                <!-- <span class="bg-red-500 absolute  ml-1 px-1 rounded-md -bottom-2 text-[8px]"
                                    v-if="l.comingsoon">soon</span> -->
                            </label>
                        </div>
                        <div>
                            <Icon name="heroicons:chevron-down" :class="[open && 'rotate-180']"
                                class="h-4 w-4 text-muted-foreground transition" />
                        </div>
                    </HDisclosureButton>
                    <TransitionExpand>
                        <HDisclosurePanel class="flex flex-col text-slate-100">
                            <template v-for="(i, j) in l.items" :key="j">
                                <NuxtLink @click="stateMenu.closeMenu()"
                                    class="py-3 sidebarItemTrans pl-12 text-sm cursor-pointer" :to="i.path">
                                    {{ i.title }}
                                </NuxtLink>
                            </template>
                        </HDisclosurePanel>
                    </TransitionExpand>
                </HDisclosure>
            </template>
        </template>
    </div>
</template>
  