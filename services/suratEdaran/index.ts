const api = useApi()
class SuratEdaranService {
    async GET(params?: any) {
        return await api({
            url: 'surat-edaran/list/',
            method: 'GET',
            params: params
        })
    }
    async SUBMIT_SURAT_EDARAN(payload?: any) {
        return await api({
            method: 'POST',
            url: `surat-edaran/insertOrUpdate/`,
            data: payload,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
    }
    async DELETE_SURAT_EDARAN(payload?: any) {
        return await api({
            method: 'POST',
            url: `surat-edaran/delete/`,
            data: payload,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
    }
}

export default new SuratEdaranService()