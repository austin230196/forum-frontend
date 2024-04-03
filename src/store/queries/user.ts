import { useQuery } from "@tanstack/react-query"

import { socialLogin } from "../apis/user"



export const useSocialLogin = (provider: 'google' | 'github') => {
    return useQuery({
        queryKey: ["socialLogin"],
        queryFn: async() => await socialLogin(provider),
    })
}