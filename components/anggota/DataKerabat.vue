
<script setup lang="ts">

const anggota = useAnggota()
const numeric = (form: number) => {
    // Filter out non-numeric characters from the input
    if (form === 1) {
        anggota.dataKerabat.noHandphoneSuamiIstri = handleNumericInput(anggota.dataKerabat.noHandphoneSuamiIstri)
    }
    if (form === 2) {
        anggota.dataKerabat.noHandphoneAyah = handleNumericInput(anggota.dataKerabat.noHandphoneAyah)
    }
    if (form === 3) {
        anggota.dataKerabat.noHandphoneIbu = handleNumericInput(anggota.dataKerabat.noHandphoneIbu)
    }
}

const reset = () => {
    anggota.resetDataKerabat()
}
</script>

<template>
    <h1 class="my-4 text-base font-bold text-primary">Data Kerabat</h1>
    <small class="text-xs text-gray-600">* Hanya wajib diisi BILA anggota ingin menggadaikan BPKB
        Bila tidak ada kerabat / kerabat tidak memiliki nomor handphone aktif, mohon diisi dengan nomor handphone nasabah.

    </small>
    <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-2">
        <div>
            <label for="nama">Suami / Istri</label>
            <input type="text" v-model="anggota.dataKerabat.namaSuamiAtauIstri" id="suamiIstriKerabat"
                name="namaSuamiAtauIstri" placeholder="Nama Suami / Istri..."
                class="mt-2 md:mt-0 input input-bordered w-full max-w-xs input-sm" />
        </div>
        <div>
            <label for="nama">Ayah<span class="text-sm text-red-500">*</span></label>
            <input type="text" v-model="anggota.dataKerabat.namaAyah" id="ayahKerabat" name="namaAyah"
                placeholder="Nama Ayah..." :class="anggota.errorForm.includes('ayahKerabat') ? 'input-error' : ''"
                class="mt-2 md:mt-0 input input-bordered w-full max-w-xs input-sm" />
        </div>
        <div>
            <label for="nama">Ibu<span class="text-sm text-red-500">*</span></label>
            <input type="text" v-model="anggota.dataKerabat.namaIbu" id="ibuKerabat" name="namaIbu"
                placeholder="Nama Ibu..." :class="anggota.errorForm.includes('ibuKerabat') ? 'input-error' : ''"
                class="mt-2 md:mt-0 input input-bordered w-full max-w-xs input-sm" />
        </div>
        <div>
            <label for="nama">No. Handphone Suami / Istri</label>
            <input type="text" v-model="anggota.dataKerabat.noHandphoneSuamiIstri" @input="numeric(1)"
                id="hpSuamiIstriKerabat" name="noHandphoneSuamiIstri" placeholder="No. Handphone Suami / Istri..."
                class="mt-2 md:mt-0 input input-bordered w-full max-w-xs input-sm" maxlength="15" />
        </div>
        <div>
            <label for="nama">No. Handphone Ayah<span class="text-sm text-red-500">*</span></label>
            <input type="text" v-model="anggota.dataKerabat.noHandphoneAyah" @input="numeric(2)" name="noHandphoneAyah"
                id="hpAyahKerabat" :class="anggota.errorForm.includes('hpAyahKerabat') ? 'input-error' : ''"
                placeholder="No. Handphone Ayah..." class="mt-2 md:mt-0 input input-bordered w-full max-w-xs input-sm"
                maxlength="15" />
        </div>
        <div>
            <label for="nama">No. Handphone Ibu<span class="text-sm text-red-500">*</span></label>
            <input type="text" v-model="anggota.dataKerabat.noHandphoneIbu" @input="numeric(3)" name="noHandphoneIbu"
                id="hpIbuKerabat" :class="anggota.errorForm.includes('hpIbuKerabat') ? 'input-error' : ''"
                placeholder="No. Handphone Ibu..." class="mt-2 md:mt-0 input input-bordered w-full max-w-xs input-sm"
                maxlength="15" />
        </div>

    </div>
    <div class="text-center pt-3">
        <button class="pgi-btn-red" @click="reset">Reset Kerabat</button>
    </div>
</template>
