import axios from 'axios'
const token = useCookie('token');

const MODE = import.meta.env.VITE_MODE;
const API = MODE === 'production' ? import.meta.env.VITE_API_PROD : import.meta.env.VITE_API_DEV;

export const useApi = () => {
    const baseURL = API 
    const axiosClient = axios.create({
        baseURL,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token?.value
        }
    })

    axiosClient.interceptors.response.use(function (response): any {
        return response;
    }, function (error) {
        const r = error.response.status
        if (error.config.url !== 'login') {
            if (r === 401) {
                const token = useCookie('token')
                token.value = null
                localStorage.removeItem('c_user')
                window.location.reload()
            }
        }
        return Promise.reject(error);
    })
    return axiosClient
}