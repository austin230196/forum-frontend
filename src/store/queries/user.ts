import { useQuery } from "@tanstack/react-query"

import { socialLogin } from "../apis/user"



export const useGoogleLogin = () => {
    return useQuery({
        queryKey: ["google-login"],
        queryFn: async() => await socialLogin("google"),
    })
}


export const useGithubLogin = () => {
    return useQuery({
        queryKey: ["github-login"],
        queryFn: async() => await socialLogin("github"),
    })
}


