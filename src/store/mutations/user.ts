import {useMutation} from "@tanstack/react-query";
import { ILogin, IRegister } from "../../types/User";
import { login, register } from "../apis/user";



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