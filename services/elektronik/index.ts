const api = useApi();
class elektronikService {
  async GET_JENIS_ELEKTRONIK() {
    return await api({
      url: "/barang-jenis/elektronik/",
      method: "GET",
    });
  }
  async GET_MERK_ELEKTRONIK(id: any) {
    return await api({
      url: "/barang-merk/jenis/" + id,
      method: "GET",
    });
  }
  async GET_TIPE_ELEKTRONIK(id: any) {
    return await api({
      url: "/barang-tipe-v2/merk/" + id,
      method: "GET",
    });
  }
  async GET_KONDISI_ELEKTRONIK(id: any) {
    return await api({
      url: "/barang-tipe-v2/kondisi/" + id,
      method: "GET",
    });
  }
  async GET_TIPE_TAHUN(id: any) {
    return await api({
      url: "/barang-tipe-v2/" + id,
      method: "GET",
    });
  }
  async GET_WARNA_ELEKTRONIK() {
    return await api({
      url: "gadai/warna",
      method: "GET",
    });
  }
  async GET_KELENGKAPAN_ELEKTRONIK(id: any) {
    return await api({
      url: "/barang-jenis/kelengkapan?jenisId=" + id,
      method: "GET",
    });
  }
  async GET_SPESIFIKASI_ELEKTRONIK(id: any) {
    return await api({
      url: "barang-jenis/spesifikasi?jenisId=" + id,
      method: "GET",
    });
  }
  async GET_SPESIFIKASI_MERK_ELEKTRONIK(id: any) {
    return await api({
      url: "barang-merk/spesifikasi?merkId=" + id,
      method: "GET",
    });
  }
  async GADAI_CALCULATE(payload?: any) {
    return await api({
      method: 'POST',
      url: `gadai-crud/gadai/elektronik`,
      data: payload,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  }
  async GET_DETAIL_BARANG_JENIS(id: any) {
    return await api({
      url: "barang-jenis/" + id,
      method: "GET",
    });
  }
  async GET_DETAIL_BARANG_MERK(id: any) {
    return await api({
      url: "barang-merk/" + id,
      method: "GET",
    });
  }
  async GET_DETAIL_BARANG_TIPE(id: any) {
    return await api({
      url: "barang-tipe-v2/" + id,
      method: "GET",
    });
  }
}

export default new elektronikService();
