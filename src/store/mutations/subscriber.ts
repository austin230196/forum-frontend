import { useMutation } from "@tanstack/react-query";
import { subscribe, unsubscribe } from "../apis/subscriber";



export const useSubscribe = () => {
    return useMutation({
        mutationKey: ["subscribe"],
        mutationFn: async(email: string) => await subscribe(email)
    })
}


export const useUnSubscribe = () => {
    return useMutation({
        mutationKey: ["unsubscribe"],
        mutationFn: async(email: string) => await unsubscribe(email)
    })
}