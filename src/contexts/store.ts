import { createStore } from 'zustand'

import {IUserdata} from "../types/User";
import { ITopic } from '../types/Topic';
import ICategory from '../types/Category';
import { useQueryClient } from '@tanstack/react-query';
import { getTopics } from '../store/queries/topic';
import { getActiveSession, getUserdata } from '../store/queries/user';
import { ISettings } from '../types/Settings';
import { THEME } from '../constants';


interface StoreProps {
  userdata: {userdata: IUserdata|null; settings: ISettings|null};
  activeSession: any|null;
  topics: ITopic[];
  category: ICategory|null;
  theme: 'dark'|'light';
  order: 'latest' | 'oldest'
}

export interface GlobalState extends StoreProps {
    updateCategory: (category: ICategory|null) => Promise<void>;
    updateTopicOrder: (order: 'latest' | 'oldest') => Promise<void>;
    updateUserdata: () => Promise<void>;
    updateActiveSession: () => Promise<void>;
    toggleTheme: () => void;
}


export const createGlobalStore = (initProps?: Partial<StoreProps>) => {
    const queryClient = useQueryClient();
    const defaultProps: StoreProps = {
        userdata: {userdata: null, settings: null},
        topics: [],
        activeSession: null,
        category: null,
        theme: window.localStorage.getItem(THEME) as ('dark'|'light') || 'dark',
        order: 'latest'
    }


    return createStore<GlobalState>()((set, state) => ({
        ...defaultProps,
        ...initProps,
        updateCategory: async(newCategory: ICategory|null) => {
            const res = await queryClient.fetchQuery(getTopics(newCategory, state().order));
            if(!res?.success) throw new Error(res?.message);
            set((state) => ({
                ...state,
                category: newCategory,
                topics: res.data
            }));
        },
        updateTopicOrder: async(newOrder: 'latest' | 'oldest') => {
            const res = await queryClient.fetchQuery(getTopics(state().category, newOrder));
            if(!res?.success) throw new Error(res?.message);
            set((state) => ({
                ...state,
                order: newOrder,
                topics: res.data
            })); 
        },
        updateUserdata: async() => {
            const res = await queryClient.fetchQuery(getUserdata());
            if(!res?.success) throw new Error(res?.message);
            set((state) => ({
                ...state,
                userdata: res.data
            })); 
        },
        updateActiveSession: async() => {
            const res = await queryClient.fetchQuery(getActiveSession());
            if(!res?.success) throw new Error(res?.message);
            console.log({res});
            set((state) => ({
                ...state,
                activeSession: res.data
            })); 
        },
        toggleTheme: () => {
            let currentTheme = window.localStorage.getItem(THEME);
            if(!currentTheme) currentTheme = state().theme;
            let newTheme = currentTheme === 'light' ? 'dark' : 'light';
            set(state => ({
                ...state,
                theme: newTheme as 'light' | 'dark'
            }))
            window.localStorage.setItem(THEME, newTheme)
        }
    }))
}

export type GlobalStore = ReturnType<typeof createGlobalStore>