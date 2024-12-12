const api = useApi()
class OtherIncomeTypeService {
    async CREATE(data: {}) {
        return await api({
            method: "POST",
            url: 'other-income-type/create',
            data
        })
    }
    async GET(params?: {}, type?: any) {
        return await api({
            method: 'GET',
            url: type === 'ALL' ? 'other-income-type' : 'other-income-type/paginate',
            params
        })
    }
    async GET_BY_ID(id: number) {
        return await api({
            method: "GET",
            url: 'other-income-type/show/' + id,
        })
    }
    async UPDATE(id: number, data: {}) {
        return await api({
            method: "POST",
            url: 'other-income-type/update/' + id,
            data: data
        })
    }
    async DELETE(id: number) {
        return await api({
            method: "DELETE",
            url: 'other-income-type/delete/' + id,
        })
    }
}

export default new OtherIncomeTypeService()