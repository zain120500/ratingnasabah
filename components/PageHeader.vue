<template>
    <div class="sticky top-0 z-30">
        <div class="bg-white flex items-center">
            <div class="container">
                <div class="flex items-center h-[60px] md:h-[65px]">
                    <div class="flex items-center flex-1 ">
                        <div class="flex pl-2 ">
                            <img class="w-8 object-contain" src="/logo-small.png" alt="pgi">
                        </div>
                        <div class="flex-1 px-1 md:px-3">
                            <template v-if="titlePage">
                                <h1 class="text-md font-semibold md:mb-1 uppercase">{{ titlePage }}</h1>
                            </template>
                            <template v-else>
                                <h1 class="text-md font-semibold md:mb-1 uppercase">Dashboard</h1>
                            </template>
                            <div class="hidden md:flex">
                                <div class="flex gap-1 text-xs">
                                    <NuxtLink class="text-primary underline capitalize" href="/">home</NuxtLink>
                                    <div class="flex gap-1" v-for="(item, index) in bc" :key="index">
                                        <span>/</span>
                                        <NuxtLink v-if="item.path !== 'dashboard' && index < bc.length - 1"
                                            :to="`/${item.path}`">
                                            <span class="text-primary underline capitalize">{{ item.name }}</span>
                                        </NuxtLink>
                                        <div class="capitalize text-slate-400" v-else>{{ item.name }}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="flex items-center h-[60px] md:h-[65px]">
                            <!-- <Listbox v-model="selectedCabang">
                                <div class="relative mt-1 pr-2">
                                    <ListboxButton
                                        class="relative w-8 md:w-44 flex justify-between items-center cursor-pointer border p-1.5 rounded-lg">
                                        <span class="text-sm hidden md:inline">{{ selectedCabang.name }}</span>
                                        <Icon name="tabler:chevron-down" />
                                    </ListboxButton>
                                    <transition leave-active-class="transition duration-100 ease-in"
                                        leave-from-class="opacity-100" leave-to-class="opacity-0">
                                        <ListboxOptions
                                            class="absolute mt-5 min-w-max shadow-lg max-h-60 overflow-auto rounded-md bg-white text-sm">
                                            <ListboxOption @click="handleChangeCabang(item)"
                                                class="p-2 cursor-pointer hover:bg-blue-100" v-for="item in cabang"
                                                :key="item.id" :value="item">
                                                {{ item.name }}
                                            </ListboxOption>
                                        </ListboxOptions>
                                    </transition>
                                </div>
                            </Listbox>
                            <Menu as="div" class="relative md:border-l inline-block text-left">
                                <MenuButton class="flexCenter w-10 md:w-14 h-[60px]">
                                    <Icon name="ph:user-bold" />
                                </MenuButton>
                                <transition enter-active-class="transition duration-100 ease-out"
                                    enter-from-class="transform scale-95 opacity-0"
                                    enter-to-class="transform scale-100 opacity-100"
                                    leave-active-class="transition duration-75 ease-in"
                                    leave-from-class="transform scale-100 opacity-100"
                                    leave-to-class="transform scale-95 opacity-0">
                                    <MenuItems
                                        class="absolute right-0 mt-2 p-2 w-56 origin-top-right bg-white rounded-lg shadow">
                                        <MenuItem>
                                        <div class="border-b text-xs py-2">Role Name Here</div>
                                        </MenuItem>
                                        <MenuItem v-slot="{ active }">
                                        <button class="flex items-center py-2">
                                            <Icon name="gg:profile" />
                                            <span class="ml-2 text-xs">Profil Saya</span>
                                        </button>
                                        </MenuItem>
                                        <MenuItem v-slot="{ active }">
                                        <button class="flex items-center py-2">
                                            <Icon name="tabler:lock-cog" />
                                            <span class="ml-2 text-xs">Ubah Kata Sandi</span>
                                        </button>
                                        </MenuItem>
                                    </MenuItems>
                                </transition>
                            </Menu>
                            <button class="text-primary relative h-full w-10 md:w-14 flexCenter bg-white border-l">
                                <div v-if="true"
                                    class="bg-red-500 h-[10px] w-[10px] absolute top-5 border-red-200 border-2 right-4 rounded-full">
                                </div>
                                <Icon size="18" name="mdi:bell" />
                            </button> -->
                            <div class="w-10 bg-primary h-full  md:w-min flexCenter">
                                <button @click="handleLogout" class="flex items-center  p-2 h-full">
                                    <Icon v-if="!loading" size="18" name="material-symbols:logout-rounded" />
                                    <Icon class="animate-spin" v-if="loading" size="18" name="mingcute:loading-fill" />
                                    <span class="hidden md:flex text-sm font-semibold ml-1">Keluar</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="flex items-center justify-center md:hidden mx-2">
                        <button class="text-2xl" @click="stateMenu.openMenu()">
                            <Icon name="mingcute:menu-fill" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useAuthStore } from '~/stores/auth';

const { titlePage, breadcrumbs: bc } = useBC()
import {
    Menu,
    MenuButton,
    MenuItems,
    MenuItem,
    Listbox,
    ListboxButton,
    ListboxOptions,
    ListboxOption,
} from '@headlessui/vue'
const stateMenu = useToggleMenuStore()

const { logoutUser } = useAuthStore();
const loading = ref(false)

const handleLogout = async () => {
    loading.value = true
    await logoutUser();
    navigateTo("/login")
    loading.value = false
};

const cabang = JSON.parse(localStorage.getItem("cabang"))

const cabangId = useCabang()

const handleChangeCabang = async (item) => {
    await cabangId.getCabangId(item.id)

    localStorage.setItem("cashVirtualActive", cabangId.data.cashVirtualActive)
    localStorage.setItem("gadaiEmasActive", cabangId.data.gadaiEmasActive)
    localStorage.setItem("activeCabangId", item.id)
    localStorage.setItem("active_cabang", JSON.stringify(item))
    
    cabangId.activeCabangId = item.id
    await cabangId.pushActiveCashVirtual(localStorage.getItem("cashVirtualActive"))
}

const selectedCabang = ref(cabangId.activeCabang || cabang[0])
await cabangId.pushActiveCashVirtual(localStorage.getItem("cashVirtualActive"))

cabangId.activeCabangId = selectedCabang.value.id || selectedCabang.id
cabangId.activeCabang = selectedCabang.value || selectedCabang

navigator.geolocation.getCurrentPosition(
    position => {
        localStorage.setItem("lat", position.coords.latitude)
        localStorage.setItem("long", position.coords.longitude)
    },
    error => {
        console.log(error.message);
    },
)
</script>