import {queryOptions} from "@tanstack/react-query";

import { getTopics as getTopicss } from "../apis/topic";
import Category from "../../types/Category";


export const getTopics = (category: Category|null, order: 'latest' | 'oldest') => {
    return queryOptions({
        queryKey: ['topics'],
        queryFn: async () => await getTopicss(category, order)
    })
}