<script setup lang="ts">
import SidebarItem from './SidebarMenu/SidebarItem.vue';
import menu from "../data/menu"
const stateMenu = useToggleMenuStore()
const appVersion = import.meta.env.VITE_APP_VERSION

const menuItem = menu
const nav = ref([])
        const changeSidebarNav = () =>{
            let menuTop = localStorage.getItem("menuTop")
			let arrayMenuTop = menuTop?.split(",");

			let copyNav = JSON.parse(JSON.stringify(menuItem))

            let menu = copyNav.filter((item: any) => arrayMenuTop?.includes(item.code))

			menu.forEach(checkChildren())

            nav.value = menu
        }

        const validateNavItem = () => {
			let menuTop = localStorage.getItem("menuTop")
			let arrayMenuTop = menuTop?.split(",");

			let copyNav = JSON.parse(JSON.stringify(menuItem))
        
            let menu = copyNav.filter((item: any) => arrayMenuTop?.includes(item.code))
                if(localStorage.getItem('role') == 'Kasir1'){
                    menu = menu.filter((item: any) => item.code != 'INF')
                }
          
            menu.forEach(function(idx: any){
                checkChildren()
            })
            
            let menuFix = menu.filter((item: any,index=0)=>{
                if(item.code == 'EKS' && (localStorage.getItem('isauthorized') == 'false')){
                    let newAksesLapeks = {
                        title: 'Akses Laporan Eksekutif',
                        path: '/akses-laporan-eksekutif',
                        icon: 'material-symbols:key-outline',
                        code: 'ALE',
                    }
                    menu.splice(index, 1);
                    menu.push(newAksesLapeks)
                }
                index++
            })
          
            nav.value = menu
		}

		const checkChildren = (item?: any) =>{
        
			let menuChildren = localStorage.getItem("menuChildren")
			let arrayMenuChildren = menuChildren?.split(",");
         
			if(item && item.children){
                if(item.children.length == 0){
					delete item.children
				}
				item.children = item.children.filter((child: any) => arrayMenuChildren?.includes(child.code))
				item.redirect = item.children[0].url
			}
		}

    validateNavItem()
</script>

<template>
    <aside :class="stateMenu.isOpen ? 'translate-x-0 z-50' : '-translate-x-full z-50'"
        class="w-full  duration-300 md:w-[225px] bg-primary -translate-x-full md:translate-x-0 fixed md:relative">
        <div class="h-[65px] flex items-center justify-between px-2 bg-white">
            <div class="flex-1 flex items-center justify-between">
                <img class="w-36 object-contain" src="/logo-full.png" alt="logo pgi">
                <button @click="stateMenu.closeMenu()" class="md:hidden text-slate-600 text-2xl">
                    <Icon name="mingcute:close-fill" />
                </button>
            </div>
        </div>
        <div class="top-0 h-[calc(100vh-65px-35px)]">
            <div
                class="sidemenu flex h-full w-full flex-col gap-5 overflow-y-auto pb-5 scrollbar-thin scrollbar-thumb-input scrollbar-thumb-rounded-md">
                <SidebarItem :stateMenu="stateMenu" :links="nav" />
            </div>
        </div>
        <!-- <div class="h-35 flex gap-x-2 text-xs px-3 text-blue-300">
            <span>JURNAL</span>
            <span>V {{ appVersion }}</span>
        </div> -->
    </aside>
</template>

