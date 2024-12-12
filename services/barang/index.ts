const api = useApi();
class barangService {
  async GET_JENIS_BARANG() {
    return await api({
      url: "/barang-jenis/all-selection/",
      method: "GET",
    });
  }
  async GET_JENIS_ELEKTRONIK() {
    return await api({
      url: "/barang-jenis/elektronik/",
      method: "GET",
    });
  }
  async GET_JENIS_KENDARAAN() {
    return await api({
      url: "/barang-jenis/kendaraan/",
      method: "GET",
    });
  }
  async GET_JENIS_EMAS() {
    return await api({
      url: "/barang-jenis/emas",
      method: "GET",
    });
  }
  async GET_MERK_BARANG(id: any) {
    return await api({
      url: "/barang-merk/jenis/" + id,
      method: "GET",
    });
  }
  async GET_TIPE_BARANG(id: any) {
    return await api({
      url: "/barang-tipe-v2/merk/" + id,
      method: "GET",
    });
  }
  async GET_KONDISI_BARANG(id: any) {
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
  async GET_WARNA_BARANG() {
    return await api({
      url: "gadai/warna",
      method: "GET",
    });
  }
  async GET_KELENGKAPAN_BARANG(id: any) {
    return await api({
      url: "/barang-jenis/kelengkapan?jenisId=" + id,
      method: "GET",
    });
  }
  async GET_SPESIFIKASI_BARANG(id: any) {
    return await api({
      url: "barang-jenis/spesifikasi?jenisId=" + id,
      method: "GET",
    });
  }
  async GET_SPESIFIKASI_MERK_BARANG(id: any) {
    return await api({
      url: "barang-merk/spesifikasi?merkId=" + id,
      method: "GET",
    });
  }
  async GADAI_CALCULATE_ELEKTRONIK(payload?: any) {
    return await api({
      method: 'POST',
      url: `gadai-crud/gadai/elektronik`,
      data: payload,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  }
  async GADAI_CALCULATE_ELEKTRONIK_SIMULASI(payload?: any) {
    return await api({
      method: 'POST',
      url: `gadai-crud/simulasi/elektronik`,
      data: payload,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  }

  async GADAI_CALCULATE_KENDARAAN(payload?: any) {
    return await api({
      method: 'POST',
      url: `gadai-crud/gadai/kendaraan`,
      data: payload,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  }
  async GADAI_CALCULATE_KENDARAAN_SIMULASI(payload?: any) {
    return await api({
      method: 'POST',
      url: `gadai-crud/simulasi/kendaraan`,
      data: payload,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  }
  async GADAI_CALCULATE_EMAS(payload?: any) {
    return await api({
      method: 'POST',
      url: `gadai-emas/submit`,
      data: payload,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  }
  async GADAI_CALCULATE_EMAS_SIMULASI(payload?: any) {
    return await api({
      method: 'POST',
      url: `gadai-emas/simulasi`,
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
  async GET_HARGA_EMAS_SEKARANG() {
    return await api({
      url: "harga-emas/current",
      method: "GET",
    });
  }
  async GET_JASA_EMAS() {
    return await api({
      url: "jasa-emas/",
      method: "GET",
    });
  }
  async GET_KARAT_OPT(id: any, gosok: any, cap: any, kwitansi: any) {
    let query = "?merkId=" + id + "&adaCap=" + cap + "&adaKwitansi=" + kwitansi + "&gosokanHilang=" + gosok
    return await api({
      url: "gadai-emas/tipe-retro/" + query,
      method: "GET",
    });
  }
  async GET_OPT_POTONGAN_TAMBAHAN() {
    return await api({
      url: "spesifikasi-emas/selection/",
      method: "GET",
    });
  }
  async GET_ALASAN_REJECT() {
    return await api({
      url: "gadai-reject-reason/selection",
      method: "GET",
    });
  }
  async CETAK_SIMULASI(payload: any) {
    return await api({
      url: "gadai/simulasi/cetak",
      method: "POST",
      data: payload,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }
  async GADAI_REJECT(payload: any) {
    return await api({
      url: "gadai-reject/",
      method: "POST",
      data: payload,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }
  async GADAI_REJECT_EMAS(payload: any) {
    return await api({
      url: "gadai-reject/emas/",
      method: "POST",
      data: payload,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }
  async GADAI_REJECT_EMAS_LAINNYA(payload: any) {
    return await api({
      url: "gadai-reject/emas-lainnya/",
      method: "POST",
      data: payload,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }
  async GET_GADAI_EDIT(id: any) {
    return await api({
      url: `gadai/daftar-gadai/${id}/edit`,
      method: "GET",
    });
  }

  async POST_SUBMIT_GADAI_EDIT(id: any, payload?: any) {
    return await api({
      method: 'POST',
      url: `gadai-crud/edit/${id}/elektronik`,
      data: payload,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  }

  async GET_REJECT_GADAI(query: any) {
    return await api({
      method: 'GET',
      url: `gadai-reject/${query}`,
    })
  }
}

export default new barangService();
