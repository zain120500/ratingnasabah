import menu from "~/data/menu";
const menuAll: any[] = []
menu.map(i => {
    i.items?.map(m => menuAll.push(m))
})
export const usePageTitle = () => {
    const router = useRouter();
    const route = useRoute()
    const HOMEPAGE = { name: 'Home', path: '/' };
    const currentmenu: Ref<Array<{ name: string; path: string; }>> = ref([HOMEPAGE])

    function getCurentMenu(currRoute: string): any {
        if (currRoute === '') return [HOMEPAGE];
        const cMenu = menuAll.find(m => m.path === currRoute)
        return cMenu

    }
    watch(() => ({
        path: route.path,
        name: route.name,
        meta: route.meta,
        matched: route.matched
    }), (route) => {
        if (route.path === '/') return;
        currentmenu.value = getCurentMenu(route.path);
    }, {
        immediate: true,
    })

    return {
        currentmenu
    }
}