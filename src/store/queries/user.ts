import { queryOptions } from "@tanstack/react-query"

import { get2FAQrCode, getUserdata as fetchUserdata, socialLogin, getActiveSession as fetchActiveSession, disable2FA as disable2fa } from "../apis/user"



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


export const get2FAUrl = () => {
    return queryOptions({
        queryKey: ["get-2fa-url"],
        queryFn: async() => await get2FAQrCode()
    })
} 


export const disable2FA = () => {
    return queryOptions({
        queryKey: ["disable-2fa"],
        queryFn: async() => await disable2fa()
    })
} 


export const getUserdata = () => {
    return queryOptions({
        queryKey: ["get-userdata"],
        queryFn: async() => await fetchUserdata()
    })
}


export const getActiveSession = () => {
    return queryOptions({
        queryKey: ["get-active-session"],
        queryFn: async() => await fetchActiveSession()
    })
}
