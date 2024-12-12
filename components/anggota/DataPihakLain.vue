<script setup lang="ts">
import Multiselect from "vue-multiselect";

const anggota = useAnggota()
const kota: any = ref(null)
const kotaOpt: any = ref([])
const searchKota = async (searchQuery: string) => {
    if (searchQuery.length >= 4) {
        kotaOpt.value = await anggota.searchKota(3, searchQuery)
    }
}

watch(() => kota.value, (newValue, oldValue) => {
    if (newValue === null) {
        return
    }
    anggota.dataPihakLain.kotaPihakLain = newValue
    anggota.dataPihakLain.kecamatanPihakLain = null
    anggota.dataPihakLain.kelurahanDesaPihakLain = null
    anggota.dataPihakLain.kecamatanOpt = []
    anggota.dataPihakLain.kelurahanOpt = []
    anggota.searchKecamatan(3, newValue.id)
});

watch(() => anggota.dataPihakLain.kecamatanPihakLain, (newValue, oldValue) => {
    anggota.dataPihakLain.kelurahanDesaPihakLain = null
    anggota.dataPihakLain.kelurahanOpt = []

    if (newValue != null) {
        anggota.searchKelurahan(3, newValue.id)
    }
});

const numeric = (form: number) => {
    // Filter out non-numeric characters from the input
    if (form === 1) {
        anggota.dataPihakLain.noHandphonePihakLain = handleNumericInput(anggota.dataPihakLain.noHandphonePihakLain)
    }
    if (form === 2) {
        anggota.dataPihakLain.rtPihakLain = handleNumericInput(anggota.dataPihakLain.rtPihakLain)
    }
    if (form === 3) {
        anggota.dataPihakLain.rwPihakLain = handleNumericInput(anggota.dataPihakLain.rwPihakLain)
    }
}

const reset = () => {
    kota.value = null
    anggota.resetDataPihakLain()
}

</script>
<template>
    <h1 class="my-4 text-base font-bold text-primary">PIHAK LAIN (Keluarga yang Tidak Serumah)</h1>
    <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-2">
        <div>
            <label for="nama">Nama<span class="text-sm text-red-500">*</span></label>
            <input type="text" v-model="anggota.dataPihakLain.namaPihakLain" id="namaPihakLain" name="nama"
                placeholder="Nama..." :class="anggota.errorForm.includes('namaPihakLain') ? 'input-error' : ''"
                class="mt-2 md:mt-0 input input-bordered w-full max-w-xs input-sm" maxlength="15" />
        </div>
        <div>
            <label for="nama">Hubungan<span class="text-sm text-red-500">*</span></label>
            <input type="text" v-model="anggota.dataPihakLain.hubunganPihakLain" id="hubunganPihakLain" name="hubungan"
                placeholder="Hubungan..." :class="anggota.errorForm.includes('hubunganPihakLain') ? 'input-error' : ''"
                class="mt-2 md:mt-0 input input-bordered w-full max-w-xs input-sm" maxlength="15" />
        </div>
        <div>
            <label for="nama">No Handphone<span class="text-sm text-red-500">*</span></label>
            <input type="text" v-model="anggota.dataPihakLain.noHandphonePihakLain" id="hpPihakLain" @input="numeric(1)"
                name="noHandphone" :class="anggota.errorForm.includes('hpPihakLain') ? 'input-error' : ''"
                placeholder="No Handphone..." class="mt-2 md:mt-0 input input-bordered w-full max-w-xs input-sm"
                maxlength="15" />
        </div>

        <div>
            <label for="kota">Kota<span class="text-sm text-red-500">*</span></label>
            <multiselect v-model="kota" :loading="anggota.loading" label="name" id="kotaPihakLain" track-by="name"
                :options="kotaOpt" :internal-search="false" @search-change="searchKota" :allow-empty="false"
                :preserve-search="false" :class="anggota.errorForm.includes('kotaPihakLain') ? 'multiselect-error' : ''"
                placeholder="*Ketik min. 4 huruf untuk mencari..." class="text-sm rounded-sm max" :show-no-results="false">
            </multiselect>
        </div>
        <div>
            <label for="kecamatan">kecamatan<span class="text-sm text-red-500">*</span></label>
            <select v-model="anggota.dataPihakLain.kecamatanPihakLain" id="kecamatanPihakLain"
                :class="anggota.errorForm.includes('kecamatanPihakLain') ? 'select-error' : ''"
                class="select select-bordered select-sm  w-full max-w-xs">
                <option :value="null" disabled selected>-- Pilih kecamatan --</option>
                <option v-for="item of anggota.dataPihakLain.kecamatanOpt" :value="item">{{ item.name || '' }}</option>
            </select>
        </div>
        <div>
            <label for="kelurahan">Kelurahan<span class="text-sm text-red-500">*</span></label>
            <select v-model="anggota.dataPihakLain.kelurahanDesaPihakLain" id="kelurahanPihakLain"
                :class="anggota.errorForm.includes('kelurahanPihakLain') ? 'select-error' : ''"
                class="select select-bordered select-sm  w-full max-w-xs">
                <option :value="null" disabled selected>-- Pilih Kelurahan --</option>
                <option v-for="item of anggota.dataPihakLain.kelurahanOpt" :value="item">{{ item.name || '' }}</option>
            </select>
        </div>
        <div class="grid grid-cols-2 gap-2">
            <div>
                <label for="rt">Rt<span class="text-sm text-red-500">*</span></label>
                <input type="text" id="rtPihakLain" v-model="anggota.dataPihakLain.rtPihakLain" @input="numeric(2)"
                    placeholder="Rt..." :class="anggota.errorForm.includes('rtPihakLain') ? 'input-error' : ''"
                    class="input input-bordered w-full max-w-xs input-sm" maxlength="3" />
            </div>
            <div>
                <label for="rw">Rw<span class="text-sm text-red-500">*</span></label>
                <input type="text" id="rwPihakLain" v-model="anggota.dataPihakLain.rwPihakLain" @input="numeric(3)"
                    placeholder="Rw..." :class="anggota.errorForm.includes('rwPihakLain') ? 'input-error' : ''"
                    class="input input-bordered w-full max-w-xs input-sm" maxlength="3" />
            </div>
        </div>
        <div>
            <label for="alamatSekarang">Alamat Sekarang<span class="text-sm text-red-500">*</span></label>
            <textarea id="alamatPihakLain" class="textarea textarea-bordered w-full"
                v-model="anggota.dataPihakLain.alamatPihakLain"
                :class="anggota.errorForm.includes('alamatPihakLain') ? 'textarea-error' : ''"
                placeholder="Alamat KTP..."></textarea>
        </div>
    </div>
    <div class="text-center pt-3">
        <button class="pgi-btn-red" @click="reset">Reset Anggota</button>
    </div>
</template>
