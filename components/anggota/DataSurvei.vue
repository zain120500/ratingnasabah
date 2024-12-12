<script setup lang="ts">
const anggota = useAnggota()

watch(() => anggota.kompetitorLainnya, (newValue, oldValue) => {
    anggota.dataSurvei.surveiKompetitor = anggota.dataSurvei.surveiKompetitor.filter((item: any) => item != oldValue)
    if (newValue.trim() !== "") {
        anggota.dataSurvei.surveiKompetitor.push(newValue);
    }
})
</script>
<template>
    <h1 class="my-4 text-base font-bold text-primary">DATA SURVEI</h1>
    <div class="text-sm">
        <div class="mt-2">
            1. Dari manakah nasabah mengetahui Pusat Gadai Indonesia ?
        </div>
        <div v-for="item of anggota.optSurveiReferensi" class="form-control mt-2">
            <label class="cursor-pointer flex gap-2">
                <input v-model="anggota.dataSurvei.surveiReferensi" type="radio" id="radioReferensi" name="radio-referensi"
                    :value="item" class="radio radio-primary"
                    :class="(anggota.errorForm.includes('radioReferensi') ? 'radio-error' : '')" />
                <span class="label-text">{{ item }}</span>
            </label>
        </div>

        <div class="mt-2">
            2. Apakah Nasabah pernah gadai sebelumnya ?
        </div>

        <div v-for="item of anggota.optSurveiPernahGadai" class="form-control mt-2">
            <label class="cursor-pointer flex gap-2">
                <input v-model="anggota.dataSurvei.surveiPernahGadai" id="radioPernahGadai" type="radio"
                    name="radio-pernahGadai" :value="item" class="radio radio-primary"
                    :class="(anggota.errorForm.includes('radioPernahGadai') ? 'radio-error' : '')" />
                <span class="label-text">{{ item }}</span>
            </label>
        </div>

        <div class="mt-2">
            3. Jika pernah gadai mohon sebutkan dimana ?
        </div>
        <div v-for="item of anggota.optSurveiKompetitor" class="form-control mt-2">
            <label class="cursor-pointer flex gap-2">
                <input v-model="anggota.dataSurvei.surveiKompetitor" id="checkboxKompetitor" type="checkbox"
                    name="checkbox-kompetitor" :value="item" class="checkbox checkbox-primary checkbox-sm"
                    :class="(anggota.errorForm.includes('checkboxKompetitor') ? 'checkbox-error' : '')" />
                <span class="label-text">{{ item }}</span>
            </label>
        </div>
        <label class="cursor-pointer flex mt-2 gap-2">
            <input type="checkbox" name="checkbox-kompetitor" v-model="anggota.isKompetitorLainnyaChecked"
                class="checkbox checkbox-primary checkbox-sm"
                :class="(anggota.errorForm.includes('checkboxKompetitor') ? 'checkbox-error' : '')" />
            <span class="label-text">Lainnya</span>
            <input type="text" :hidden="!anggota.isKompetitorLainnyaChecked" id="hpSuamiIstriKerabat"
                v-model="anggota.kompetitorLainnya" name="noHandphoneSuamiIstri"
                class="mt-2 md:mt-0 input input-bordered w-full max-w-xs input-sm"
                :class="(anggota.errorForm.includes('checkboxKompetitor') ? 'input-error' : '')" />
        </label>
    </div>
</template>
