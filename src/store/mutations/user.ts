import {useMutation} from "@tanstack/react-query";
import { ILogin, IRegister } from "../../types/User";
import { forgotPassword, login, loginSocialUser, logout, register, updatePassword, uploadFile } from "../apis/user";



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


export const useLogout = () => {
    return useMutation({
        mutationKey: ["logout"],
        mutationFn: async() => await logout()
    })
}


export const useForgotPassword = () => {
    return useMutation({
        mutationFn: (email: string) => forgotPassword(email),
        mutationKey:["forgotPassword"]
    })
}


export const useUpdatePassword = () => {
    return useMutation({
        mutationFn: async ({password, token}: {password: string, token: string}) => await updatePassword(password, token),
        mutationKey:["updatePassword"]
    })
}


export const useLoginSocialUser = () => {
    return useMutation({
        mutationFn: async ({provider, code}: {provider: 'google'|'github', code: string}) => await loginSocialUser(provider, code),
        mutationKey: ["loginSocialUser"]
    })
}


export const useUploadFile = () => {
    return useMutation({
        mutationKey: ["upload-file"],
        mutationFn: async({
            filesize,
            filename,
            file
        }: {filesize: number, filename: string, file: ArrayBuffer}) => await uploadFile(filesize, filename, file)
    })
}