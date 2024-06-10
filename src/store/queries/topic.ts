import {queryOptions} from "@tanstack/react-query";

import { getTopics as getTopicss, searchAllTopics } from "../apis/topic";
import Category from "../../types/Category";


export const getTopics = (category: Category|null, order: 'latest' | 'oldest', page: number) => {
    return queryOptions({
        queryKey: ['topics'],
        queryFn: async () => await getTopicss(category, order, page)
    })
}


export const searchTopics = (searchStr: string) => {
    return queryOptions({
        queryKey: ['search-topics', searchStr],
        queryFn: async () => await searchAllTopics(searchStr)
    })
}
