import { defineStore } from 'pinia';

interface UserInterface {
    username: string;
    password: string;
}
const MODE = import.meta.env.VITE_MODE;

const API = MODE === 'production' ? import.meta.env.VITE_API_PROD : import.meta.env.VITE_API_DEV;
export const useAuthStore = defineStore('auth', {
    state: () => ({
        authenticated: false
    }),
    actions: {
        async authenticateUser({ username, password }: UserInterface) {
            this.authenticated = true;
            const formdata = new FormData();
            formdata.append("username", username);
            formdata.append("password", password);
            const { data, error }: any = await useFetch(API + '/api/user/authenticate', {
                server: false,
                method: 'post',
                body: formdata
            });
             
            if (data._rawValue) {
                if (data._rawValue.status === true) {
                let response = data._rawValue.data
             
                localStorage.setItem("token", response.token)
                localStorage.setItem("role", response.role)
                localStorage.setItem("name", response.name)
                localStorage.setItem("exp", response.exp)
                localStorage.setItem("cabang", JSON.stringify(response.cabang))
                localStorage.setItem("menuTop", response.menuTop)
                localStorage.setItem("menuChildren", response.menuChildren)
                localStorage.setItem("oldMenuChildren", response.menuChildren)
                localStorage.setItem("lapeksPassword", "")
                localStorage.setItem("isauthorized", 'false')
                localStorage.setItem("lastLogin", response.last_login)

                if(localStorage.getItem("version") === null) {
                    localStorage.setItem("reload", "1")
                    localStorage.setItem("version", response.version)
                } else {
                    if(localStorage.getItem("version") !== response.version) {
                        localStorage.setItem("reload", "1")
                    }

                    localStorage.setItem("version", response.version)
                }

                // Setup activeCabang for display
                let activeCabang = "Tanpa Cabang"
                let activeCabangId = "0"

                if(response.cabang.length == 1) {
                    activeCabang = response.cabang[0].name
                    activeCabangId = response.cabang[0].id
                }
                else if(response.cabang.length > 1) {
                    activeCabang = "Multi Cabang"
                    activeCabangId = response.cabang[0].id
                }

                localStorage.setItem("activeCabang", activeCabang)
                localStorage.setItem("activeCabangId", activeCabangId)
            
                // TODO OPEN AUTHORIZATION
                    const token = useCookie('token');
                    // localStorage.setItem("c_user", JSON.stringify(data._rawValue.data.user))
                    token.value = data._rawValue.data.token;
                    this.authenticated = true;
                    
                } else {
                    this.authenticated = false;
                }
            } else {
                this.authenticated = false;
            }
        },
        async logoutUser() {
            const token = useCookie('token');
            await useFetch(API + '/v1/logout', {
                server: false,
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token.value
                }
            });
            this.authenticated = false;
            token.value = null;
            localStorage.removeItem("c_user")
        },
    },
});