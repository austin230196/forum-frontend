import axios from "../../axios";



export const subscribe = async(email: string) => {
    const res = await axios.post("/subscriber/add", {email});
    return res.data;
}

export const unsubscribe = async(email: string) => {
    const res = await axios.post("/subscriber/remove", {email});
    return res.data;
}