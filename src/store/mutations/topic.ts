import {useMutation} from "@tanstack/react-query";
import { ICreateTopic } from "../../types/Topic";
import { createTopic, toggleFollowTopic } from "../apis/topic";



export const useCreateTopic = () => {
    return useMutation({
        mutationFn: (data: ICreateTopic) => createTopic(data),
        mutationKey: ["createTopic"]
    })
}


export const useFollowTopic = () => {
    return useMutation({
        mutationFn: async (data: {topicId: string, userId: string}) => await toggleFollowTopic(data),
        mutationKey: ['follow-topic']
    })
}