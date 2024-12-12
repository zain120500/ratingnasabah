const api = useApi()
class CoaService {
    async CREATE(data: {}) {
        return await api({
            method: "POST",
            url: 'account/create',
            data
        })
    }
    async GET(params?: {}, type?: any) {
        return await api({
            method: 'GET',
            url: type === 'ALL' ? 'account' : 'account/paginate',
            params
        })
    }
    async GET_BY_ID(id: number) {
        return await api({
            method: "GET",
            url: 'account/show/' + id,
        })
    }
    async UPDATE(id: number, data: {}) {
        return await api({
            method: "POST",
            url: 'account/update/' + id,
            data: data
        })
    }
    async DELETE(id: number) {
        return await api({
            method: "DELETE",
            url: 'account/delete/' + id,
        })
    }
}

export default new CoaService()