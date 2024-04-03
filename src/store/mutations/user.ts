import {useMutation} from "@tanstack/react-query";
import { ILogin, IRegister } from "../../types/User";
import { forgotPassword, login, loginSocialUser, register } from "../apis/user";



export const useRegisterUser = () => {
    return useMutation({
        mutationFn: (data: IRegister) => register(data),
        mutationKey: ["registerUser"]
    })
}


export const useLoginUser = () => {
    return useMutation({
        mutationFn: (data: ILogin) => login(data),
        mutationKey: ["loginUser"]
    })
}


export const useForgotPassword = () => {
    return useMutation({
        mutationFn: (email: string) => forgotPassword(email),
        mutationKey:["forgotPassword"]
    })
}


export const useLoginSocialUser = () => {
    return useMutation({
        mutationFn: ({provider, code}: {provider: 'google'|'github', code: string}) => loginSocialUser(provider, code),
        mutationKey: ["loginSocialUser"]
    })
}