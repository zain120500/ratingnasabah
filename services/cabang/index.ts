const api = useApi()
class CabangService {
    async GET_BY_ID(id?: number) {
        return await api({
            method: 'GET',
            url: `/cabang/ ${id}`,
        })
    }

    async REFRESH_BALANCE(id?: any) {
        let payload = new FormData
        payload.append("id", id)
        return await api({
            method: 'POST',
            url: `/cabang/refresh-balance/`,
            data: payload,
            headers: {
              'Content-Type': 'multipart/form-data',
            },
        })
    }
}

export default new CabangService()