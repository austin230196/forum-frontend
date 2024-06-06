import axios from "../../axios";
import { STORE_KEY } from "../../constants";
import { ILogin, IRegister } from "../../types/User";
import Store from "../../utils/Store";


const store = new Store(STORE_KEY);

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


export const logout = async () => {
    const token = await store.get("accessKey");
    return (await axios.post("/user/logout", undefined, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }))
}


export const forgotPassword = async (email: string) => {
    return (await axios.post("/user/forgot-password", {email}, {
        headers: {
            "Content-Type": "application/json"
        }
    }))
}


export const updatePassword = async (password: string, token: string) => {
    const res = await axios.post("/user/update-password", {newPassword: password, token}, {
        headers: {
            "Content-Type": "application/json"
        }
    });
    return res?.data;
}


export const changePassword = async (oldPassword: string, newPassword: string) => {
    const token = await store.get("accessKey");
    const res = await axios.post("/user/change-password", {newPassword, oldPassword}, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
    return res?.data;
}


export const socialLogin = async(provider: 'google'|'github') => {
    const res = await axios.get(`/user/login/${provider}`);
    return res?.data;
}

export const loginSocialUser = async(provider: 'google'|'github', code: string) => {
    return (await axios.post(`/user/login/${provider}/callback`, {code}));
}

export const get2FAQrCode = async() => {
    const token = await store.get("accessKey");
    const res = await axios.get("/user/2fa/setup", {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    return res?.data;
}

export const verify2FACode = async(email: string, code: string) => {
    const res = await axios.post("/user/2fa/verify", {email, code}, {
    });
    return res?.data;
}

export const disable2FA = async() => {
    const token = await store.get("accessKey");
    const res = await axios.get("/user/2fa/disable", {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    return res?.data;
}

export const complete2FASetup = async(code: string) => {
    const token = await store.get("accessKey");
    const res = await axios.post("/user/2fa/setup/complete", {code}, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    return res?.data;
}


export const uploadFile = async(filesize: number, filename: string, file: ArrayBuffer) => {
    const token = await store.get("accessKey");
    const res = await axios.post(`/file/upload`, file, {
        headers: {
            "Content-Type": "multipart/formdata",
            "File-Size": filesize.toString(),
            "File-Name": filename,
            "Authorization": `Bearer ${token}`,
        }
    })
    return res.data;
}


export const getUserdata = async() => {
    const token = await store.get("accessKey");
    const res = await axios.get("/user", {
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    })
    return res?.data;
}



export const getActiveSession = async() => {
    const token = await store.get("accessKey");
    const res = await axios.get("/sessions/active", {
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    })
    return res?.data;
}