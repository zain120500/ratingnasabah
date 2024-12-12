<script setup lang="ts">
import Multiselect from "vue-multiselect";
import { handleNumericInput } from "~/utils/helper";

const anggota = useAnggota()
const kota: any = ref(null)
const kotaOpt: any = ref([])
const searchKota = async (searchQuery: string) => {
    if (searchQuery.length >= 4) {
        kotaOpt.value = await anggota.searchKota(2, searchQuery)
    }
}


watch(() => anggota.dataAnggota.kotaOpt, (newValue, oldValue) => {
    if (newValue == null) {
        return
    }
    kotaOpt.value = newValue
});

watch(() => anggota.dataAnggota.kota, (newValue, oldValue) => {
    if (newValue == null || !anggota.reset) {
        return
    }

    anggota.dataAnggota.kota = newValue
    anggota.dataAnggota.kecamatanSekarang = null
    anggota.dataAnggota.kelurahanDesaSekarang = null
    anggota.dataAnggota.kecamatanOpt = []
    anggota.dataAnggota.kelurahanOpt = []
    anggota.searchKecamatan(2, newValue.id)
});


watch(() => anggota.dataAnggota.kecamatanSekarang, (newValue, oldValue) => {
    if (newValue == null || !anggota.reset) {
        anggota.reset = true
        return
    }
    anggota.dataAnggota.kelurahanDesaSekarang = null
    anggota.dataAnggota.kelurahanOpt = []
    anggota.searchKelurahan(2, newValue.id)

});

const numeric = (form: number) => {
    // Filter out non-numeric characters from the input
    if (form === 1) {
        anggota.dataAnggota.noHandphoneSekarang = handleNumericInput(anggota.dataAnggota.noHandphoneSekarang)
    }
    if (form === 2) {
        anggota.dataAnggota.rtSekarang = handleNumericInput(anggota.dataAnggota.rtSekarang)
    }
    if (form === 3) {
        anggota.dataAnggota.rwSekarang = handleNumericInput(anggota.dataAnggota.rwSekarang)
    }
}

const reset = () => {
    kota.value = null
    anggota.resetDataAnggota()
}

const salinData = () => {
    anggota.salinData()
}

</script>

<template>
    <h1 class="my-4 text-base font-bold text-primary">Data Anggota</h1>
    <button class="pgi-btn-blue" @click="salinData">Salin Data Identitas Ke Anggota</button>
    <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-2">
        <div>
            <label for="nama">No Handphone<span class="text-sm text-red-500">*</span></label>
            <input type="text" v-model="anggota.dataAnggota.noHandphoneSekarang" @input="numeric(1)" name="nama"
                placeholder="No Handphone..." :class="anggota.errorForm.includes('hpAnggota') ? 'input-error' : ''"
                class="mt-2 md:mt-0 input input-bordered w-full max-w-xs input-sm" maxlength="15" />
        </div>

        <div>
            <label for="kota">Kota<span class="text-sm text-red-500">*</span></label>
            <multiselect v-model="anggota.dataAnggota.kota" :loading="anggota.loading" label="name" track-by="name"
                :options="anggota.dataAnggota.kotaOpt" :internal-search="false" @search-change="searchKota"
                :allow-empty="false" :preserve-search="false" placeholder="*Ketik min. 4 huruf untuk mencari..."
                :class="anggota.errorForm.includes('kotaAnggota') ? 'multiselect-error' : ''" class="text-sm rounded-sm max"
                :show-no-results="false">
            </multiselect>
        </div>
        <div>
            <label for="kecamatan">kecamatan<span class="text-sm text-red-500">*</span></label>
            <select v-model="anggota.dataAnggota.kecamatanSekarang"
                :class="anggota.errorForm.includes('kecamatanAnggota') ? 'select-error' : ''"
                class="select select-bordered select-sm  w-full max-w-xs">
                <option :value="null" disabled selected>-- Pilih kecamatan --</option>
                <option v-for="item of anggota.dataAnggota.kecamatanOpt" :value="item">{{ item.name || '' }}</option>
            </select>
        </div>
        <div>
            <label for="kelurahan">Kelurahan<span class="text-sm text-red-500">*</span></label>
            <select v-model="anggota.dataAnggota.kelurahanDesaSekarang"
                :class="anggota.errorForm.includes('kelurahanAnggota') ? 'select-error' : ''"
                class="select select-bordered select-sm  w-full max-w-xs">
                <option :value="null" disabled selected>-- Pilih Kelurahan --</option>
                <option v-for="item of anggota.dataAnggota.kelurahanOpt" :value="item">{{ item.name || '' }}</option>
            </select>
        </div>
        <div class="grid grid-cols-2 gap-2">
            <div>
                <label for="rt">Rt<span class="text-sm text-red-500">*</span></label>
                <input type="text" v-model="anggota.dataAnggota.rtSekarang" @input="numeric(2)" placeholder="Rt..."
                    :class="anggota.errorForm.includes('rtAnggota') ? 'input-error' : ''"
                    class="input input-bordered w-full max-w-xs input-sm" maxlength="3" />
            </div>
            <div>
                <label for="rw">Rw<span class="text-sm text-red-500">*</span></label>
                <input type="text" v-model="anggota.dataAnggota.rwSekarang" @input="numeric(3)" placeholder="Rw..."
                    :class="anggota.errorForm.includes('rwAnggota') ? 'input-error' : ''"
                    class="input input-bordered w-full max-w-xs input-sm" maxlength="3" />
            </div>
        </div>
        <div>
            <label for="alamatSekarang">Alamat Sekarang<span class="text-sm text-red-500">*</span></label>
            <textarea class="textarea textarea-bordered w-full" v-model="anggota.dataAnggota.alamatSekarang"
                :class="anggota.errorForm.includes('alamatAnggota') ? 'textarea-error' : ''"
                placeholder="Alamat KTP..."></textarea>
        </div>
    </div>
    <div class="text-center pt-3">
        <button class="pgi-btn-red" @click="reset">Reset Anggota</button>
    </div>
</template>
