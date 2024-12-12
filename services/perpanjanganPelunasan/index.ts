const api = useApi()
class perpanjanganPelunasanService {

    async GET(gadaiId: any) {
        return await api({
            method: 'GET',
            url: `gadai/detail/faktur/${gadaiId}`,
        })
    }

    async GET_HISTORY(gadaiId: any) {
        return await api({
            method: 'GET',
            url: `gadai/detail/faktur/${gadaiId}`,
        })
    }

    async GET_GADAI_KERINGANAN_PEMBAYARAN(gadaiId: any) {
        return await api({
            method: 'GET',
            url: `gadai-keringanan-pembayaran/status/${gadaiId}`,
        })
    }

    async GET_CEK_STATUS_KERINGANAN(id: any) {
        return await api({
            method: 'GET',
            url: `gadai-keringanan-pembayaran/status/${id}`,
        })
    }

    async GET_CEK_PEMBAYARAN_INQUIRY(jenisPembayaran: any, noFaktur: any) {
        return await api({
            method: 'GET',
            url: `gadai-pembayaran/inquiry/?jenis=${jenisPembayaran}&noFaktur=${noFaktur}`,
        })
    }
    async GET_GADAI_PEMBAYARAN_QRIS(id: any) {
        return await api({
            method: 'GET',
            url: `gadai-pembayaran/generate-qris/${id}`,
        })
    }

    async GET_STATUS_LELANG(noFaktur: any) {
        return await api({
            method: 'GET',
            url: `lelang-kirim-balik/inquiry/${noFaktur}`,
        })
    }

    async POST_KERINGANAN(payload: any) {
        return await api({
            method: 'POST',
            url: `gadai-keringanan-pembayaran/request`,
            data: payload,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
    }
    async POST_BATAL_KERINGANAN(payload: any) {
        return await api({
            method: 'POST',
            url: `gadai-keringanan-pembayaran/cancel`,
            data: payload,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
    }
    async POST_GADAI_PEMBAYARAN_ANGSURAN(payload: any) {
        return await api({
            method: 'POST',
            url: `gadai-pembayaran/angsuran/`,
            data: payload,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
    }

    async POST_GADAI_PEMBAYARAN(payload: any) {
        return await api({
            method: 'POST',
            url: `gadai-pembayaran/bayar/`,
            data: payload,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
    }
    async POST_REQUEST_KIRIM_BALIK(noFaktur: any) {
        return await api({
            method: 'POST',
            url: "lelang-kirim-balik/request/?noFaktur=" + noFaktur,
        })
    }

}

export default new perpanjanganPelunasanService()