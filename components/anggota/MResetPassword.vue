<template>
    <p>
        Lakukan reset password untuk nasabah bernama {{ anggota.anggota?.nama || '' }} (No. Anggota {{ anggota.anggota?.no
            || '' }})? Password akan diubah kembali menjadi
        tanggal lahir nasabah!
    </p>
    <div class="flex justify-end">
        <button class="pgi-btn-blue btn-md" @click="anggota.resetPassword()" :disabled="anggota.loading">Reset</button>
    </div>

    <ContainersBaseModal id="resetPasswordSuccess" class-panel="sm:w-1/2 w-11/12 max-w-5xl" title="Reset Password Berhasil"
        :loading="anggota.loading">
        Reset berhasil. Ingatkan kembali kepada nasabah bahwa password sekarang sesuai dengan tanggal lahir yang terdaftar
        pada sistem dengan format: <br />
        <strong>2 digit tanggal + 2 digit bulan + 2 digit belakang tahun</strong>
        <div class="mt-4">
            Anjurkan nasabah untuk segera melakukan pengubahan password ketika sudah masuk ke aplikasi.
        </div>
        <div class="flex justify-end">
            <button class="pgi-btn-blue btn-md" @click="closeModal()">Ok</button>
        </div>
    </ContainersBaseModal>
</template>

<script lang="ts" setup>

const mdl = useUtilStore()

const anggota = useAnggota()
const closeModal = ()=>{
    mdl.modalToggleConfirm('resetPasswordSuccess') 
    mdl.modalToggle('resetPassword')
}

</script>
