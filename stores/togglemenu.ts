import { defineStore } from 'pinia'
export const useToggleMenuStore = defineStore('togglemenu', {
    state: () => ({
        isOpen: false,
    }),
    actions: {
        openMenu() {
            this.isOpen = true
        },
        closeMenu() {
            this.isOpen = false
        },
    }
})