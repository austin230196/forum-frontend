import { queryOptions, useQuery } from "@tanstack/react-query"

import { get2FAQrCode, getUserdata as fetchUserdata, socialLogin } from "../apis/user"



export const getGoogleLoginURL = () => {
    return queryOptions({
        queryKey: ["google-login"],
        queryFn: async() => await socialLogin("google"),
    })
}


export const getGithubLoginURL = () => {
    return queryOptions({
        queryKey: ["github-login"],
        queryFn: async() => await socialLogin("github"),
    })
}


export const useGet2FAUrl = () => {
    return useQuery({
        queryKey: ["get-2fa-url"],
        queryFn: async() => await get2FAQrCode()
    })
} 


export const getUserdata = () => {
    return queryOptions({
        queryKey: ["get-userdata"],
        queryFn: async() => await fetchUserdata()
    })
}
