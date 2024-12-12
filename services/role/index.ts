const api = useApi()
class RoleService {
    async CREATE(data: {}) {
        return await api({
            method: "POST",
            url: 'role/create',
            data
        })
    }
    async GET(params?: {}, type?: any) {
        return await api({
            method: 'GET',
            url: type === 'ALL' ? 'role' : 'role/paginate',
            params
        })
    }
    async GET_BY_ID(id: number) {
        return await api({
            method: "GET",
            url: 'role/show/' + id,
        })
    }
    async UPDATE(id: number, data: {}) {
        return await api({
            method: "POST",
            url: 'role/update/' + id,
            data: data
        })
    }
    async DELETE(id: number) {
        return await api({
            method: "DELETE",
            url: 'role/delete/' + id,
        })
    }
}

export default new RoleService()