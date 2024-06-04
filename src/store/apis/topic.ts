import axios from "../../axios";
import { STORE_KEY } from "../../constants";
import Category from "../../types/Category";
import { ICreateTopic } from "../../types/Topic";
import Store from "../../utils/Store";




const store = new Store(STORE_KEY);

export const createTopic = async (data: ICreateTopic) => {
    const token = await store.get("accessKey");
    return (await axios.post("/topics", JSON.stringify(data), {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        }
    }))
}


export const getTopics = async(category: Category | null, order: 'latest' | 'oldest') => {
    console.log({category, order});
    const res = await axios.get(!category ? `/topics?order=${order}` : `/topics?order=${order}&category=${category}`);
    return res?.data;
}


export const toggleFollowTopic = async(data: {topicId: string, userId: string}) => {
    const token = await store.get("accessKey");
    return (await axios.post("/topics/follow/toggle", JSON.stringify(data), {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    }))
}