import axios, { AxiosResponse } from "axios";
import { BASE_URL, STORE_KEY } from "./constants";
import Store from "./utils/Store";


const instance = axios.create({
    baseURL: BASE_URL,
    validateStatus: status => status >= 200 && status < 600
})


instance.interceptors.response.use(async (res: AxiosResponse) => {

    if(res.data?.message === 'jwt expired'){
        console.log("JWT EXPIRED AGAIN");
        //get refreshToken
        let store = new Store(STORE_KEY);
        let refreshToken = await store.get("refreshKey");
        if(refreshToken){
            const r = await instance.get("/user/token/refresh", {
                headers: {
                    "X-Refresh": refreshToken as string
                }
            });
            const data = r?.data;
            if(data?.success){
                let token = data?.data?.token;
                await store.set("accessKey", token);
                res.config.headers["Authorization"] = `Bearer ${token}`;
                return instance(res.config);
            }else {
                window.localStorage.removeItem(STORE_KEY);
                window.location.href = "/login";
            }
        }else {
            window.localStorage.removeItem(STORE_KEY);
            window.location.href = "/login";
        }
    }
    return res;
}, async(error) => {
    return error;
})

export default instance;