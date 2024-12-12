const api = useApi()
class fakturService{
    async GET_GADAI_DETAIL(id: string){
       
        return await api({
            url: '/gadai/detail/id/'+id,
            method: 'GET',
        })
    }
} 

export default new fakturService()
