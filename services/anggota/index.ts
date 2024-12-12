const api = useApi()
class anggotaService{
    async GET(by?: number, name?: string, date?: string, page: number = 0, size: number = 10){
        const params = ref({})

        if (name) {
            params.value = { ...params.value, query: name };
          }
          if (by) {
            params.value = { ...params.value, searchBy: by };
          }
          if (date) {
            params.value = { ...params.value, tanggalLahir: date };
          }
         
          params.value = { ...params.value, page: page };

          params.value = { ...params.value, size: size };
        
        return await api({
            url: '/nasabah/findForGadai/',
            method: 'GET',
            params: params.value
        })
    }

    async GET_REKENING(id: number){ 
        return await api({
            url: '/nasabah/list-rekening/' + id,
            method: 'GET',
        })
    }

    async GET_KOTA(query: string){
      return await api({
        url: `/area/search/kota/?name=${query}`,
        method: 'GET'
      })
    }

    async GET_KECAMATAN(idKota: number){
      return await api({
        url: `area/kecamatan/${idKota}`,
        method: 'GET'
      })
    }

    async GET_KELURAHAN(idKec: number){
      return await api({
        url: `area/kelurahan/${idKec}`,
        method: 'GET'
      })
    }

    async GET_PEKERJAAN(){
      return await api({
        url: `nasabah-pekerjaan/selection/`,
        method: 'GET'
      })
    }

    async CREATE_ANGGOTA(data: any){
      return await api({
        url: `nasabah/`,
        method: 'POST',
        data: data,
        headers: {
          'Content-Type': 'multipart/form-data', // Make sure to set the correct content type for FormData
        },
      })
    }

    async GET_DETAIL_ANGGOTA(id: number){
      return await api({
        url: `nasabah/${id}`,
        method: 'GET',
      })
    }

    async GET_DAFTAR_GADAI_ANGGOTA(id: number,page: number = 0, size: number = 10){
      const params = ref({})
        params.value = { ...params.value, page: page };
        params.value = { ...params.value, size: size };
      
      return await api({
          url: `/nasabah/${id}/gadai/`,
          method: 'GET',
          params: params.value
      })
  }

    async RESET_PASSWORD_NASABAH(data: any){

      const formdata = new FormData();
      formdata.append("nasabahId", data.value.id);
      return await api({
          url: `nasabah/reset-password/`,
          method: 'POST',
          data: formdata,
          headers: {
            'Content-Type': 'multipart/form-data', // Make sure to set the correct content type for FormData
          },
      })
  }
} 

export default new anggotaService()
