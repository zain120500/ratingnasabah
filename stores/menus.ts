import { defineStore } from 'pinia'
import menu from '~/data/menu'
export const useMenuStore = defineStore('menu', () => {
    const menuAll: any = ref([])
    const getMenus = () => {
        const cleanMenu = menu.filter(i => i.type !== 'separator')
        const fixMenu: any[] = []
        cleanMenu.forEach(parentMenu => {
            if (parentMenu.items && parentMenu.items.length) {
                parentMenu.items.forEach(chMenu => {
                    fixMenu.push({
                        name: chMenu.title,
                        value: chMenu.path,
                    })
                });
            } else {
                fixMenu.push({
                    name: parentMenu.title,
                    value: parentMenu.path,
                })
            }
        });
        menuAll.value = fixMenu
    }
    return {
        menuAll,
        getMenus
    }
})