const api = useApi()
class CompanyService {
    async CREATE(data: {}) {
        return await api({
            method: "POST",
            url: 'company/create',
            data
        })
    }
    async GET(params?: {}, type?: string) {
        return await api({
            method: 'GET',
            url: type === 'ALL' ? 'company' : 'company/paginate',
            params
        })
    }
    async GET_BY_ID(id: number) {
        return await api({
            method: "GET",
            url: 'company/show/' + id,
        })
    }
    async UPDATE(id: number, data: {}) {
        return await api({
            method: "POST",
            url: 'company/update/' + id,
            data: data
        })
    }
    async DELETE(id: number) {
        return await api({
            method: "DELETE",
            url: 'company/delete/' + id,
        })
    }
}

export default new CompanyService()