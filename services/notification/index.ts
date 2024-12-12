const api = useApi()
class NotificationService {
    async GET(params?: any) {
        return await api({
            method: 'GET',
            url: `/notification/`,
            params
        })
    }

    async DELETE(body?: FormData) {
        return await api({
            method: 'POST',
            url: `/notification/delete/`,
            data: body,
            headers: {
              'Content-Type': 'multipart/form-data',
            },
        })
    }
}

export default new NotificationService()