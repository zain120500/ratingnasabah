const api = useApi()
class BranchService {
    async GET(params?: {}, type?: string) {
        return await api({
            method: 'GET',
            url: type === 'ALL' ? 'branch' : 'branch/paginate',
            params
        })
    }
}

export default new BranchService()