import axios from "../../axios";
import { STORE_KEY } from "../../constants";
import Category from "../../types/Category";
import { ICreateTopic } from "../../types/Topic";
import Store from "../../utils/Store";





export const createTopic = async (data: ICreateTopic) => {
    let store = new Store(STORE_KEY);
    const token = await store.get("accessKey");
    const refreshToken = await store.get("refreshKey");
    return (await axios.post("/topics", JSON.stringify(data), {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
            "X-Refresh": refreshToken as string
        }
    }))
}


export const getTopics = async(category: Category | null, order: 'latest' | 'oldest') => {
    return (await axios.get(!category ? `/topics?order=${order}` : `/topics?order=${order}&category=${category}`));
}


export const toggleFollowTopic = async(data: {topicId: string, userId: string}) => {
    let store = new Store(STORE_KEY);
    const token = await store.get("accessKey");
    const refreshToken = await store.get("refreshKey");
    return (await axios.post("/topics/follow/toggle", JSON.stringify(data), {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
            "X-Refresh": refreshToken as string
        }
    }))
}