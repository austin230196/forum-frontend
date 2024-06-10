import {useMutation} from "@tanstack/react-query";
import { ICreateTopic } from "../../types/Topic";
import { createTopic, toggleFollowTopic } from "../apis/topic";



export const useCreateTopic = () => {
    return useMutation({
        mutationFn: (data: ICreateTopic) => createTopic(data),
        mutationKey: ["createTopic"]
    })
}


export const useToggleFollowTopic = () => {
    return useMutation({
        mutationFn: async (topicId: string) => await toggleFollowTopic(topicId),
        mutationKey: ['toggle-follow-topic']
    })
}