import menu from "~/data/menu";
const menuAll: any[] = []
menu.map(i => {
    i.items?.map(m => menuAll.push(m))
})

export const useBC = () => {
    const route = useRoute()
    const breadcrumbs: any = ref(null)
    const menuItem: any = ref(null)
    const titlePage: any = ref()
    watch(() => ({
        fullpath: route.fullPath,
        path: route.path,
        name: route.name,
        meta: route.meta,
        matched: route.matched,
    }), (route) => {
        const routeAll = route.fullpath.split("/")
        const routes = routeAll.filter(i => i !== "")
        const fixRoute = routes?.map(item => {
            return {
                name: item.split("-").join(" "),
                path: item
            }
        })
        breadcrumbs.value = fixRoute
        titlePage.value = routes.shift()
    }, {
        immediate: true,
    })
    return {
        titlePage,
        breadcrumbs
    }
}