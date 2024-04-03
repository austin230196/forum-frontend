import axios from "../../axios";
import { ILogin, IRegister } from "../../types/User";


export const register = async (data: IRegister) => {
    return (await axios.post("/user/register", JSON.stringify(data), {
        headers: {
            "Content-Type": "application/json"
        }
    }))
}


export const login = async (data: ILogin) => {
    return (await axios.post("/user/login", JSON.stringify(data), {
        headers: {
            "Content-Type": "application/json"
        }
    }))
}


export const forgotPassword = async (email: string) => {
    return (await axios.post("/user/forgot-password", JSON.stringify({email}), {
        headers: {
            "Content-Type": "application/json"
        }
    }))
}


export const socialLogin = async(provider: 'google'|'github') => {
    return (await axios.get(`/user/login/${provider}`));
}

export const loginSocialUser = async(provider: 'google'|'github', code: string) => {
    return (await axios.post(`/user/login/${provider}/callback`, {code}));
}