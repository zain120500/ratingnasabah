import { defineStore } from 'pinia'
export const useUtilStore = defineStore('util', {
    state: () => ({
        isOpenModal: false,
        isShowModal: false,
        isShowModalImage: false,
        isShowModalWebCam: false,
        isOpenEdit: false,
        isOpenConfirm: false,
        isOpenFilter: false,
        isOpenDetail: false,

        isShowModalConfirm: false,
        isShowModalReject: false,
    }),
    actions: {
        toggleModal() {
            this.isOpenModal = !this.isOpenModal
        },
        toggleModalEdit() {
            this.isOpenEdit = !this.isOpenEdit
        },
        toggleConfirm() {
            this.isOpenConfirm = !this.isOpenConfirm
        },
        toggleMdlFilter() {
            this.isOpenFilter = !this.isOpenFilter
        },
        toggleMdlDetail() {
            this.isOpenDetail = !this.isOpenDetail
        },
        modalToggle(modalId: string) {
            this.isShowModal = !this.isShowModal
            var modal = document.getElementById(modalId);

            if (this.isShowModal) {
                modal?.classList.add('modal-open');
            } else {
                modal?.classList.remove('modal-open');
            }
        },
        modalToggleShow(modalId: string) {
            var modal = document.getElementById(modalId);
            modal?.classList.add('modal-open');
        },
        modalToggleHide(modalId: string) {
            var modal = document.getElementById(modalId);
            modal?.classList.remove('modal-open');
        },
        modalImageToggle(modalId: any) {
            this.isShowModalImage = !this.isShowModalImage
            var modal = document.getElementById(modalId);

            if (this.isShowModalImage) {
                modal?.classList.add('modal-open');
            } else {
                modal?.classList.remove('modal-open');
            }
        },
        modalWebCamToggle(modalId: any) {
            this.isShowModalWebCam = !this.isShowModalWebCam
            var modal = document.getElementById(modalId);

            if (this.isShowModalWebCam) {
                modal?.classList.add('modal-open');
            } else {
                modal?.classList.remove('modal-open');
            }
        },
        modalToggleConfirm(modalId: string) {
            this.isShowModalConfirm = !this.isShowModalConfirm
            var modal = document.getElementById(modalId);

            if (this.isShowModalConfirm) {
                modal?.classList.add('modal-open');
            } else {
                modal?.classList.remove('modal-open');
            }
        },
        modalRejectToggle(modalId: string) {
            this.isShowModalReject = !this.isShowModalReject
            var modal = document.getElementById(modalId);

            if (this.isShowModalReject) {
                modal?.classList.add('modal-open');
            } else {
                modal?.classList.remove('modal-open');
            }
        },
    }
})