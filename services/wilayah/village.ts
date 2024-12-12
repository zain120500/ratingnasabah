const api = useApi()
class VillageService {
    async GET(params?: {}, type?: string) {
        return await api({
            method: 'GET',
            url: type === 'ALL' ? 'village' : 'village/paginate',
            params
        })
    }
    async GET_BY_ID(id: number) {
        return await api({
            method: "GET",
            url: 'village/show/' + id,
        })
    }
}

export default new VillageService()