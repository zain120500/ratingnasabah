
<script setup lang="ts">
import { defineProps } from "vue";
import Multiselect from "vue-multiselect";
import { toast } from 'vue3-toastify';
const props = defineProps({data: {type: Object}})
const emit = defineEmits(['resetDataIdentitas'])
const anggota = useAnggota()

const searchTempatLahir = async (searchQuery: string) => {
    if (searchQuery.length >= 4) {
        await anggota.searchTempatLahir(searchQuery)
    }
}
const searchKota = async (searchQuery: string) => {
    if (searchQuery.length >= 4) {
        await anggota.searchKota(1, searchQuery)
    }
}

watch(() => anggota.dataIdentitas.kota, (newValue, oldValue) => {
    if (newValue == null) {
        return
    }
    anggota.dataIdentitas.kota = newValue
    anggota.dataIdentitas.kecamatan = null
    anggota.dataIdentitas.kelurahan = null
    anggota.dataIdentitas.kecamatanOpt = []
    anggota.dataIdentitas.kelurahanOpt = []
    anggota.searchKecamatan(1, newValue.id)
});

watch(() => anggota.dataIdentitas.kecamatan, (newValue, oldValue) => {
    if (newValue == null) {
        return
    }
    anggota.dataIdentitas.kelurahan = null
    anggota.dataIdentitas.kelurahanOpt = []
    anggota.searchKelurahan(1, newValue.id)
});

watch(() => anggota.dataIdentitas.tanggalLahir, (newVal) => {
    const validasiUmur = validasiUmurNasabah(newVal)
    if (!validasiUmur) {
        anggota.dataIdentitas.tanggalLahir = ""
        return toast.error("Usia nasabah dibawah 18 tahun!")
    }
})

const numeric = (form: number) => {
    // Filter out non-numeric characters from the input
    if (form === 1) {
        anggota.dataIdentitas.rt = handleNumericInput(anggota.dataIdentitas.rt)
    }
    if (form === 2) {
        anggota.dataIdentitas.rw = handleNumericInput(anggota.dataIdentitas.rw)
    }
}

onMounted(() => {
    anggota.getPekerjaan()
    if (props.data) {
        anggota.dataIdentitas.name = props.data.nama
        anggota.dataIdentitas.jenisIdentitas = props.data.jenisIdentitas.id
        anggota.dataIdentitas.noIdentitas = props.data.noIdentitas
        anggota.dataIdentitas.jenisKelamin = props.data.detail.jenisKelamin
        anggota.dataIdentitas.statusKawin = props.data.detail.statusPerkawinan
        anggota.dataIdentitas.kewarganegaraan = props.data.detail.kewarganegaraan
    }
});

const reset = () => {
    anggota.resetDataIdentitas()
}
</script>

<template>
    <h1 class="my-4 text-base font-bold text-primary">Data Identitas</h1>
    <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-2">
        <div>
            <label for="nama">Nama Anggota<span class="text-sm text-red-500">*</span></label>
            <input type="text" :class="anggota.errorForm.includes('nameIdentitas') ? 'input-error' : ''"
                v-model="anggota.dataIdentitas.name" id="nameIdentitas" name="nama" placeholder="Nama Anggota..."
                class="mt-2 md:mt-0 input input-bordered w-full max-w-xs input-sm" />
        </div>
        <div>
            <label for="jenisIdentitas">Jenis Identitas<span class="text-sm text-red-500">*</span></label>
            <select v-model="anggota.dataIdentitas.jenisIdentitas" id="jenisIdentitas"
                :class="anggota.errorForm.includes('jenisIdentitas') ? 'select-error' : ''"
                class="select select-bordered select-sm  w-full max-w-xs">
                <option :value="0" disabled selected>-- Pilih Identitas --</option>
                <option :value="1">KTP</option>
                <option :value="2">SIM</option>
                <option :value="3">PASPOR</option>
                <option :value="4">KK</option>
            </select>
        </div>
        <div>
            <label for="nama">No Identitas<span class="text-sm text-red-500">*</span></label>
            <input type="text" v-model="anggota.dataIdentitas.noIdentitas" id="noIdentitas" placeholder="No Identitas..."
                :class="anggota.errorForm.includes('noIdentitas') ? 'input-error' : ''"
                class="mt-2 md:mt-0 input input-bordered w-full max-w-xs input-sm" />
        </div>
        <div>
            <label for="jenisKelamin">Jenis Kelamin<span class="text-sm text-red-500">*</span></label>
            <select v-model="anggota.dataIdentitas.jenisKelamin" id="jenisKelaminIdentitas"
                :class="anggota.errorForm.includes('jenisKelaminIdentitas') ? 'select-error' : ''"
                class="select select-bordered select-sm  w-full max-w-xs">
                <option value="" disabled selected>-- Pilih Jenis Kelamin --</option>
                <option value="L">Laki - Laki</option>
                <option value="P">Perempuan</option>
            </select>
        </div>
        <div>
            <label for="statusKawin">Status Perkawinan<span class="text-sm text-red-500">*</span></label>
            <select v-model="anggota.dataIdentitas.statusKawin" id="kawinIdentitas"
                :class="anggota.errorForm.includes('kawinIdentitas') ? 'select-error' : ''"
                class="select select-bordered select-sm  w-full max-w-xs">
                <option value="" disabled selected>-- Pilih Status Kawin --</option>
                <option value="BK">Belum Kawin</option>
                <option value="KA">Kawin</option>
                <option value="CH">Cerai Hidup</option>
                <option value="CM">Cerai Mati</option>
            </select>
        </div>
        <div>
            <label for="statusKawin">Kewarganegaraan<span class="text-sm text-red-500">*</span></label>
            <select v-model="anggota.dataIdentitas.kewarganegaraan" id="kewarganegaraanIdentitas"
                :class="anggota.errorForm.includes('kewarganegaraanIdentitas') ? 'select-error' : ''"
                class="select select-bordered select-sm  w-full max-w-xs">
                <option value="" disabled selected>-- Pilih Status Kewarganegaraan --</option>
                <option value="WNI">WNI</option>
                <option value="WNA">WNA</option>
            </select>
        </div>
        <div>
            <label for="tempatLahir">Tempat Lahir<span class="text-sm text-red-500">*</span></label>
            <multiselect v-model="anggota.dataIdentitas.tempatLahir" :loading="anggota.loading" label="name" track-by="name"
                id="tempatLahirIdentitas" :options="anggota.dataIdentitas.tempatLahirOpt" :internal-search="false"
                @search-change="searchTempatLahir" :allow-empty="false" :preserve-search="false"
                placeholder="*Ketik min. 4 huruf untuk mencari..."
                :class="anggota.errorForm.includes('tempatLahirIdentitas') ? 'multiselect-error' : ''"
                class="text-sm rounded-sm max" :show-no-results="false">
            </multiselect>
        </div>
        <div>
            <label for="tanggal">Tanggal Lahir<span class="text-sm text-red-500">*</span></label>
            <input type="date" v-model="anggota.dataIdentitas.tanggalLahir" id="tanggalLahirIdentitas"
                :class="anggota.errorForm.includes('tanggalLahirIdentitas') ? 'input-error' : ''"
                placeholder="Tanggal Lahir..." class="input input-bordered w-full max-w-xs input-sm" />
        </div>
        <div>
            <label for="tempatLahir">Kota<span class="text-sm text-red-500">*</span></label>
            <multiselect v-model="anggota.dataIdentitas.kota" :loading="anggota.dataIdentitas.loadingKota" label="name" id="kotaIdentitas"
                track-by="name" :options="anggota.dataIdentitas.kotaOpt" :internal-search="false" @search-change="searchKota" :allow-empty="false"
                :preserve-search="false" placeholder="*Ketik min. 4 huruf untuk mencari..."
                class="multiselect text-sm rounded-sm max"
                :class="anggota.errorForm.includes('kotaIdentitas') ? 'multiselect-error' : ''" :show-no-results="false">
            </multiselect>
        </div>
        <div>
            <label for="statusKawin">kecamatan<span class="text-sm text-red-500">*</span></label>

            <select v-model="anggota.dataIdentitas.kecamatan" id="kecamatanIdentitas"
                :loading="anggota.dataIdentitas.loadingKecamatan"
                :class="anggota.errorForm.includes('kecamatanIdentitas') ? 'select-error' : ''"
                class="select select-bordered select-sm w-full max-w-xs">
                <option :value="null" disabled selected>-- Pilih kecamatan --</option>
                <option v-for="item of anggota.dataIdentitas.kecamatanOpt" :value="item">{{ item.name }}</option>
            </select>
        </div>
        <div>
            <label for="statusKawin">Kelurahan<span class="text-sm text-red-500">*</span></label>
            <select v-model="anggota.dataIdentitas.kelurahan" id="kelurahanIdentitas"
                :loading="anggota.dataIdentitas.loadingKelurahan"
                :class="anggota.errorForm.includes('kelurahanIdentitas') ? 'select-error' : ''"
                class="select select-bordered select-sm  w-full max-w-xs">
                <option :value="null" disabled selected>-- Pilih Kelurahan --</option>
                <option v-for="item of anggota.dataIdentitas.kelurahanOpt" :value="item">{{ item.name }}</option>
            </select>
        </div>
        <div class="grid grid-cols-2 gap-2">
            <div>
                <label for="rt">Rt<span class="text-sm text-red-500">*</span></label>
                <input type="text" maxlength="3" id="rtIdentitas" v-model="anggota.dataIdentitas.rt" placeholder="Rt..."
                    :class="anggota.errorForm.includes('rtIdentitas') ? 'select-error' : ''"
                    class="input input-bordered w-full max-w-xs input-sm" @input="numeric(1)" />
            </div>
            <div>
                <label for="rw">Rw<span class="text-sm text-red-500">*</span></label>
                <input type="text" maxlength="3" id="rwIdentitas" v-model="anggota.dataIdentitas.rw" placeholder="Rw..."
                    :class="anggota.errorForm.includes('rwIdentitas') ? 'select-error' : ''"
                    class="input input-bordered w-full max-w-xs input-sm" @input="numeric(2)" />
            </div>
        </div>
        <div>
            <label for="alamatKtp">Alamat KTP<span class="text-sm text-red-500">*</span></label>
            <textarea class="textarea textarea-bordered w-full"
                :class="anggota.errorForm.includes('alamatIdentitas') ? 'textarea-error' : ''" id="alamatIdentitas"
                v-model="anggota.dataIdentitas.alamatKtp" placeholder="Alamat KTP..."></textarea>
        </div>
        <div>
            <label for="alamatKerja">Alamat Tempat Kerja</label>
            <textarea class="textarea textarea-bordered w-full" v-model="anggota.dataIdentitas.alamatTempatKerja"
                placeholder="Alamat Tempat Kerja..."></textarea>
        </div>
        <div>
            <label for="telpTempatKerja">No. Telp. Tempat Kerja</label>
            <textarea class="textarea textarea-bordered w-full" v-model="anggota.dataIdentitas.telpTempatKerja"
                placeholder="No. Telp. Tempat Kerja..."></textarea>
        </div>
        <div>
            <label for="pekerjaan">Pekerjaan<span class="text-sm text-red-500">*</span></label>
            <select v-model="anggota.dataIdentitas.pekerjaan" id="pekerjaanIdentitas"
                :class="anggota.errorForm.includes('pekerjaanIdentitas') ? 'textarea-error' : ''"
                class="select select-bordered select-sm  w-full max-w-xs">
                <option :value="null" disabled selected>-- Pilih Pekerjaan --</option>
                <option v-for="item of anggota.dataIdentitas.pekerjaanOpt" :value="item">{{ item.name }}</option>
            </select>
        </div>
    </div>
    <div class="text-center pt-3">
        <button class="pgi-btn-red" @click="reset">Reset Identitas</button>
    </div>
</template>
