const api = useApi()
class ProvinceService {
    async GET(params?: {}, type?: string) {
        return await api({
            method: 'GET',
            url: type === 'ALL' ? 'province' : 'province/paginate',
            params
        })
    }
    async GET_BY_ID(id: number) {
        return await api({
            method: "GET",
            url: 'province/show/' + id,
        })
    }
}

export default new ProvinceService()