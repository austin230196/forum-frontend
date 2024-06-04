import { createStore } from 'zustand'

import {IUserdata} from "../types/User";
import { ITopic } from '../types/Topic';
import ICategory from '../types/Category';
import { useQueryClient } from '@tanstack/react-query';
import { getTopics } from '../store/queries/topic';
import { getUserdata } from '../store/queries/user';


interface StoreProps {
  userdata: IUserdata|null;
  topics: ITopic[];
  category: ICategory|null;
  order: 'latest' | 'oldest'
}

export interface GlobalState extends StoreProps {
    updateCategory: (category: ICategory|null) => Promise<void>;
    updateTopicOrder: (order: 'latest' | 'oldest') => Promise<void>;
    updateUserdata: () => Promise<void>;
}


export const createGlobalStore = (initProps?: Partial<StoreProps>) => {
    const queryClient = useQueryClient();
    const defaultProps: StoreProps = {
        userdata: null,
        topics: [],
        category: null,
        order: 'latest'
    }


    return createStore<GlobalState>()((set, state) => ({
        ...defaultProps,
        ...initProps,
        updateCategory: async(newCategory: ICategory|null) => {
            const res = await queryClient.fetchQuery(getTopics(newCategory, state().order));
            if(!res.success) throw new Error(res.message);
            set((state) => ({
                ...state,
                category: newCategory,
                topics: res.data
            }));
        },
        updateTopicOrder: async(newOrder: 'latest' | 'oldest') => {
            const res = await queryClient.fetchQuery(getTopics(state().category, newOrder));
            if(!res.success) throw new Error(res.message);
            set((state) => ({
                ...state,
                order: newOrder,
                topics: res.data
            })); 
        },
        updateUserdata: async() => {
            const res = await queryClient.fetchQuery(getUserdata());
            console.log({res});
            if(!res.success) throw new Error(res.message);
            set((state) => ({
                ...state,
                userdata: res.data
            })); 
        }
    }))
}

export type GlobalStore = ReturnType<typeof createGlobalStore>