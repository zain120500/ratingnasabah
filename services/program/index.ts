const api = useApi()
class ProgramService {
    async CREATE(data: {}) {
        return await api({
            method: "POST",
            url: 'program/create',
            data
        })
    }
    async GET(params?: {}, type?: string) {
        return await api({
            method: 'GET',
            url: type === 'ALL' ? 'program' : 'program/paginate',
            params
        })
    }
    async GET_BY_ID(id: number) {
        return await api({
            method: "GET",
            url: 'program/show/' + id,
        })
    }
    async UPDATE(id: number, data: {}) {
        return await api({
            method: "POST",
            url: 'program/update/' + id,
            data: data
        })
    }
    async DELETE(id: number) {
        return await api({
            method: "DELETE",
            url: 'program/delete/' + id,
        })
    }
}

export default new ProgramService()