
<script setup>
import { toast } from 'vue3-toastify';
definePageMeta({
    layout: "custom"
})

import { storeToRefs } from 'pinia';
import { useAuthStore } from '~/stores/auth';
const auth = useAuthStore();
const { authenticated } = storeToRefs(useAuthStore());
const showPassword = ref(false)
const user = ref({
    username: '',
    password: '',
});
const isLoading = ref(false);
const handleLogin = async () => {
    isLoading.value = true
    await auth.authenticateUser(user.value);
    if (authenticated.value) {
        window.location.reload(true)
    } else {
        toast.error("Login gagal, username atau sandi salah!", {
            position: toast.POSITION.BOTTOM_LEFT,
            autoClose: 2000
        })
    }
    isLoading.value = false
}

const togglePassword = () => {
    const isShow = showPassword.value
    showPassword.value = !isShow
}
</script>
<template>
    <div class="flex relative">
        <div class="md:w-[470px] lg:w-[512px] absolute md:relative z-40 flexCenter top-0 right-0 bottom-0 left-0">
            <div class="bg-white shadow-lg md:shadow-none max-w-md p-12 relative rounded-2xl w-full m-5">
                <div>
                    <img class="w-44" src="/logo-full.png" alt="logo">
                </div>
                <div class="my-12">
                    <form @submit.prevent="handleLogin">
                        <div class="mb-3">
                            <label class="block mb-1 text-sm" for="email">Email</label>
                            <div class="flex focus-within:border-blue-300 items-center border p-2 rounded-lg">
                                <div class="w-6 flexCenter text-slate-400">
                                    <Icon name="mdi:user" />
                                </div>
                                <input v-model="user.username" id="email" placeholder="alamat email" type="text"
                                    class="w-full outline-none bg-transparent text-sm">
                            </div>
                        </div>
                        <div class="mb-5">
                            <label class="block mb-1 text-sm" for="password">Kata Sandi</label>
                            <div class="flex focus-within:border-blue-300 items-center border p-2 rounded-lg">
                                <div class="w-6 flexCenter text-slate-400">
                                    <Icon name="mdi:password" />
                                </div>
                                <input v-model="user.password" id="password" placeholder="kata sandi"
                                    :type="showPassword ? 'text' : 'password'"
                                    class="w-full outline-none bg-transparent text-sm">
                                <button @click="togglePassword" type="button" class="w-6 flexCenter">
                                    <Icon :name="showPassword ? 'mdi:eye' : 'mdi:eye-off'" />
                                </button>
                            </div>
                        </div>
                        <button :disabled="isLoading" :class="isLoading ? 'btn-neutral' : 'btn-primary'"
                            class="w-full p-2 rounded-lg btn">
                            <Icon v-if="isLoading" name="mingcute:loading-fill" class="animate-spin" />
                            Masuk
                        </button>
                    </form>
                </div>
                <p class="text-center text-slate-500 text-xs absolute  left-0 right-0 md:-bottom-[100px]">
                    ©2023 Pusat Gadai Indonesia.
                </p>
            </div>
        </div>
        <div class="relative flex-1 h-screen">
            <div class="absolute left-0 right-0 top-0 bottom-0">
                <div class="layer-auth-bg backdrop-blur-sm text-white flex-col">
                    <h1 class="text-4xl hidden md:block font-bold title slide-top ">Selamat Datang!</h1>
                    <p class="text-white text-xl hidden md:block font-light mt-2 sub-title slide-bottom">Sistem Baru, Semangat Baru</p>
                </div>
                <img class="h-full w-full object-cover object-top" src="/auth-bg.png" alt="pgi">
            </div>
        </div>

    </div>
</template>
  