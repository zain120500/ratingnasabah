<template>
    <div class="p-5 rounded-xl bg-white mb-4 relative overflow-hidden">
        <div class="bg-gradient-to-tr from-blue-100 to-blue-50 absolute top-0 w-32 bottom-0 left-0 z-10 rounded-tr-full" />
        <div class="relative z-20 flex items-center justify-between">
            <div class="flex-1">
                <div class="text-md leading-3 md:text-xl items-center flex flex-wrap gap-2">
                    {{ salam }},
                    <h2 class="font-semibold leading-3">
                        {{ user || "Enggraeni" }}
                    </h2>
                </div>
                <span class="text-slate-600 text-xs">{{ ddMMMYYYY(date) }}</span>
                <br>
                <span class="text-slate-600 text-xs">Login Terakhir : {{ lastLogin }}</span>
            </div>
            <div class="flex gap-1 items-center bg-black shadow py-2 px-3 rounded-lg text-white">
                <h2 class="font-mono text-sm md:text-md font-bold">{{ currentTime.toLocaleTimeString() }}</h2>
            </div>
        </div>
    </div>

    <div class="bg-white rounded-xl p-5 overflow-hidden" data-aos="fade-up">
        <div class="flex items-center justify-between pb-5">
            <h1 class="font-semibold leading-3">Notifikasi</h1>
            <button @click="refreshNotifikasi" class="tooltip" data-tip="refresh">
                <Icon :class="{ 'rotated': isRefresh }" name="fa:repeat"></Icon>
            </button>
        </div>
        <hr>
        <div v-if="notifikasi.data.data.length != 0">
            <div v-if="!notifikasi.loading">

                <div v-for="item of notifikasi.data.data" :key="item.id">
                    <div class="py-5 flex">
                        <div class="flex-1">
                            <h1 class="text-primary">No. Faktur XXXXXXXXX</h1>
                            <span class="text-slate-600 text-xs">{{ item.message }}</span>
                        </div>
                        <div class="">
                            <span class="text-xs">{{ item.createdAt }}</span>
                            <br>
                            <!-- <button class="tooltip" data-tip="Hapus" @click="confirmDelete(item.id)">
                                <Icon name="f7:trash-circle" class="text-red-600 w-8 h-8"></Icon>
                            </button> -->
                            <button class="tooltip" data-tip="Beri Nilai" @click="openModal">
                                <Icon name="material-symbols:star" class="text-yellow-300 w-8 h-8"></Icon>
                            </button>
                        </div>
                    </div>

                </div>
            </div>
            <div v-else class="flex flex-col text-primary">
                <Skeleton />
                <div
                    class="bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-primary p-5 rounded-xl text-center">

                    <span class="loading loading-spinner loading-lg ">
                    </span>
                    <div class="animate font-semibold"> LOADING...</div>

                </div>
            </div>
            <div class="grid justify-items-center">
                <PaginateContainer>
                    <v-pagination v-model:modelValue="current_page" :range-size="1" :pages="notifikasi.data.lastPage"
                        @update:modelValue="updateCurrentPage" />
                </PaginateContainer>
            </div>
        </div>
        <div v-else>
            No Data
        </div>
    </div>
    <dialog id="my_modal_1" class="modal" @keydown.esc.prevent>
        <div class="modal-box">
            <h3 class="font-bold text-lg">Confirm Hapus Notifikasi!</h3>
            <p class="py-4">Apakah anda yakin untuk menghapus notifikasi ini?</p>
            <div class="modal-action">
                <form method="dialog" class="space-x-2">
                    <button class="btn">Batal</button>
                    <button class="btn btn-primary" @click="deleteNotifikasi(activeNotifikasiId)">Ya</button>
                </form>
            </div>
        </div>
    </dialog>

    <dialog id="my_modal_2" class="modal" @keydown.esc.prevent>
        <div class="modal-box">
            <h3 class="font-bold text-lg">Beri Nilai !</h3>
            <p>Berapa Nilai kepuasan anda terhadap pelayanan kami</p>
            <NuxtRating :read-only="false" :rating-step="1" :rating-value="0" :rating-size="30"
                @rating-selected="logRating" />
            <div class="modal-action">
                <form method="dialog" class="space-x-2">
                    <button class="btn">Batal</button>
                    <button class="btn btn-primary" @click="">Ya</button>
                </form>
            </div>
        </div>
    </dialog>

    <div v-if="isModalOpen" data-aos="zoom-in"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
        <div class="relative w-full h-full bg-white">
            <button
                class="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-red-500 text-white rounded-full hover:bg-red-600"
                @click="closeModal">
                ✕
            </button>
            <div class="p-8">
                <h1 class="text-2xl font-bold text-center">Beri Nilai !</h1>
                <p class="mt-4 text-center">Berapa Nilai kepuasan anda terhadap pelayanan kami</p>
                <div class="w-full flex justify-center">
                    <div>
                        <NuxtRating :read-only="false" :rating-step="1" :rating-value="0" :rating-size="50"
                            @rating-selected="logRating" />
                    </div>
                </div>
                <div class="w-full grid justify-center my-5">
                    <textarea class="textarea textarea-primary" placeholder="Masukan & Saran"></textarea>
                    <div>
                        <button class="btn m-5" @click="closeModal">Batal</button>
                        <button class="btn m-5 btn-primary" @click="">Ya</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import Skeleton from '../containers/skeleton/dashboardSkeleton.vue'
import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init();
import { useCurrentTime } from "~/composables/useCurrentTime";
import { ddMMMYYYY } from "../../utils/pgiDate"
import PaginateContainer from "~/components/containers/PaginateContainer.vue";
import VPagination from "@hennge/vue3-pagination";
import { ref, watch } from 'vue';
import { useCabang } from '~/stores/cabang'; // Adjust the path accordingly

const current_page = ref(1)
const old_page = ref(1)
const notifikasi = useNotification()
await notifikasi.getPaginate(current_page.value)
const isRefresh = ref(false);
const isModalOpen = ref(false);

const lastLogin = localStorage.getItem("lastLogin")

const user = localStorage.getItem("activeCabang")
const date = new Date()
const hourNow = date.getHours()

const _cabang = localStorage.getItem("cabang");
const cabang: any = _cabang ? JSON.parse(_cabang) : {};

const active_cabang = localStorage.getItem("active_cabang");
const activeCabang: any = active_cabang ? JSON.parse(active_cabang) : {};
const { currentTime } = useCurrentTime();

const activeNotifikasiId = ref(0)

const salam = hourNow >= 5 && hourNow <= 10
    ? "Selamat Pagi"
    : hourNow > 10 && hourNow <= 14
        ? "Selamat Siang"
        : hourNow > 14 && hourNow < 18
            ? "Selamat Sore"
            : "Selamat Malam"


const updateCurrentPage = async (value: number) => {
    await notifikasi.getPaginate(value)
    current_page.value = value
}
const refreshNotifikasi = async () => {
    isRefresh.value = true;
    await notifikasi.getPaginate(1)
    current_page.value = 1
    setTimeout(() => {
        isRefresh.value = false;
    }, 1000);
};
watch(() => current_page.value, (newValue, oldValue) => {
    old_page.value = oldValue
});

const cabangId = useCabang()

watch(() => cabangId.activeCashVirtual, (newValue, oldValue) => {

});

const selectedBalance = ref(activeCabang || cabang[0])
await cabangId.getBalance(activeCabang.id || cabang[0])

watch(() => selectedBalance.value, async (newValue, oldValue) => {
    await cabangId.getBalance(parseInt(newValue.id))
});

const confirmDelete = (id: number) => {
    activeNotifikasiId.value = id
    const modal = document.querySelector("#my_modal_1");
    modal.showModal();
};

const beriNilai = (id: number) => {
    activeNotifikasiId.value = id
    const modal = document.querySelector("#my_modal_2");
    modal.showModal();
};

const deleteNotifikasi = async (id: number) => {
    await notifikasi.deleteNotifikasi(id)
    await refreshNotifikasi()
}

const logRating = (event: number) => {
    console.log(event)
}

const openModal = () => {
    isModalOpen.value = true;
}
const closeModal = () => {
    isModalOpen.value = false;
}

</script>
