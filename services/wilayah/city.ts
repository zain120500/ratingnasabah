const api = useApi()
class CityService {
    async GET(params?: {}, type?: string) {
        return await api({
            method: 'GET',
            url: type === 'ALL' ? 'city' : 'city/paginate',
            params
        })
    }
    async GET_BY_ID(id: number) {
        return await api({
            method: "GET",
            url: 'city/show/' + id,
        })
    }
}

export default new CityService()