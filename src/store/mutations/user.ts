import {useMutation} from "@tanstack/react-query";
import { ILogin, IRegister } from "../../types/User";
import { changePassword, complete2FASetup, forgotPassword, login, loginSocialUser, logout, register, updatePassword, uploadFile, verify2FACode } from "../apis/user";



export const useRegisterUser = () => {
    return useMutation({
        mutationFn: (data: IRegister) => register(data),
        mutationKey: ["register"]
    })
}


export const useLoginUser = () => {
    return useMutation({
        mutationFn: (data: ILogin) => login(data),
        mutationKey: ["login"]
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
        mutationKey:["forgot-password"]
    })
}


export const useUpdatePassword = () => {
    return useMutation({
        mutationFn: async ({password, token}: {password: string, token: string}) => await updatePassword(password, token),
        mutationKey:["update-password"]
    })
}


export const useChangePassword = () => {
    return useMutation({
        mutationFn: async ({oldPassword, newPassword}: {oldPassword: string, newPassword: string}) => await changePassword(oldPassword, newPassword),
        mutationKey:["change-password"]
    })
}


export const useLoginSocialUser = () => {
    return useMutation({
        mutationFn: async ({provider, code}: {provider: 'google'|'github', code: string}) => await loginSocialUser(provider, code),
        mutationKey: ["login-social-user"]
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


export const useComplete2FASetup = () => {
    return useMutation({
        mutationKey: ['complete-2fa-setup'],
        mutationFn: async(code: string) => await complete2FASetup(code)
    })
}


export const useVerify2FACode = () => {
    return useMutation({
        mutationKey: ['verify-2fa-code'],
        mutationFn: async({email, code}:{email: string, code: string}) => await verify2FACode(email, code)
    })
}