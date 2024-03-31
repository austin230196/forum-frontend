import {useQuery} from "@tanstack/react-query";

import { getTopics } from "../apis/topic";
import Category from "../../types/Category";


export const useGetTopics = (category: Category|null, order: 'latest' | 'oldest') => {
    return useQuery({
        queryKey: ['topics'],
        queryFn: async () => await getTopics(category, order)
    })
}