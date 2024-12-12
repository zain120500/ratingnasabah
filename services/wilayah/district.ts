const api = useApi()
class DistrictService {

    async GET(params?: {}, type?: string) {
        return await api({
            method: 'GET',
            url: type === 'ALL' ? 'district' : 'district/paginate',
            params
        })
    }
    async GET_BY_ID(id: number) {
        return await api({
            method: "GET",
            url: 'district/show/' + id,
        })
    }
}

export default new DistrictService()