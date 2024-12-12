const api = useApi()
class ExpenseTypeService {
    async CREATE(data: {}) {
        return await api({
            method: "POST",
            url: 'expense-type/create',
            data
        })
    }
    async GET(params?: {}, type?: any) {
        return await api({
            method: 'GET',
            url: type === 'ALL' ? 'expense-type' : 'expense-type/paginate',
            params
        })
    }
    async GET_BY_ID(id: number) {
        return await api({
            method: "GET",
            url: 'expense-type/show/' + id,
        })
    }
    async UPDATE(id: number, data: {}) {
        return await api({
            method: "POST",
            url: 'expense-type/update/' + id,
            data: data
        })
    }
    async DELETE(id: number) {
        return await api({
            method: "DELETE",
            url: 'expense-type/delete/' + id,
        })
    }
}

export default new ExpenseTypeService()