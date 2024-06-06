const Home = () => {
    const location = useLocation();
    const [loading, setLoading] = useState(true);
    const store = useGlobalContext();
    const topics = useStore(store as StoreApi<GlobalState>, (state) => state.topics);
    const order = useStore(store as StoreApi<GlobalState>, (state) => state.order);
    const category = useStore(store as StoreApi<GlobalState>, (state) => state.category);

    useEffect(() => {
        console.log("UPDATED");
        (async() => {
            const params = new URLSearchParams(location.search);
            let cat = params.get("category") || null;
            let ord = params.get("order") || 'latest';
            try{
                await Promise.all([
                    await store?.getState().updateTopicOrder(ord as ('oldest' | 'latest')),
                    await store?.getState().updateCategory(cat as ICategory|null)
                ])
            }catch(e: any){
                toast(e.message, {
                    type: 'error'
                })
            }finally{
                setLoading(() => false);
            }
        })()

    }, [location.search]);


    async function updateTopicOrderHander(value: 'latest'|'oldest'){
        setLoading(() => true);
        try{
            await store?.getState().updateTopicOrder(value)
            // const {search, pathname} = location;
            // const params = new URLSearchParams(search);
            // console.log({search, pathname, params, keys: params.keys()})
        }catch(e: any){
            toast(e.message, {
                type: 'error'
            })
        }finally {
            setLoading(() => false);
        }
    }


    async function updateTopicCategoryHander(value: ICategory){
        setLoading(() => true);
        try{
            await store?.getState().updateCategory(value)
        }catch(e: any){
            toast(e.message, {
                type: 'error'
            })
        }finally{
            setLoading(() => false);
        }
    }


    return (
        <MainLayout>
            <Subscribe />
            <HomeWrapper>
                <HomeTop>
                    <select value={order} onChange={e => updateTopicOrderHander(e.target.value as ('latest' | 'oldest'))}>
                        <option value="latest">Latest</option>
                        <option value="oldest">Oldest</option>
                    </select>
                    <select className="home__top_categories" value={category || ''} onChange={e => updateTopicCategoryHander(e.target.value as ICategory)}>
                        <option value="">All</option>
                        {
                            categories.map((c, i) => <option value={c.name} key={i}>{c.name.toLocaleUpperCase()}</option>)
                        }
                    </select>
                </HomeTop>
                <HomeBody
                >
                    {
                        loading ? 
                        Array(6)
                        .fill(null)
                        .map((_, i) => 
                            (<SkeletonLoader width="100%" height={200} key={i} />)
                        ) :
                        topics?.length ? 
                        topics?.map((data: any, i: number) => (<Topic key={i} {...data} />))
                        : <div className="empty__topics">No topics found</div>
                    }
                </HomeBody>
            </HomeWrapper>
        </MainLayout>
    )
}



import styled from "styled-components";
import { useEffect, useState } from "react";

import MainLayout from "../../layout/MainLayout";
import { categories } from "../../components/Sidebar";
import { useLocation } from "react-router-dom";
import Subscribe from "../../components/Subscribe";
import { SkeletonLoader } from "../../components";
import Topic from "./components/Topic";
import { useGlobalContext } from "../../contexts/GlobalContext";
import { StoreApi, useStore } from "zustand";
import { GlobalState } from "../../contexts/store";
import ICategory from "../../types/Category";
import { toast } from "react-toastify";



const HomeBody = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 40px;
    margin-top: 50px;
`;
const HomeWrapper = styled.div`
    width: 100%;
    height: 100%;
`;
const HomeTop = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    > select {
        padding: 8px;
        outline: none;
        border-color: ${props => props.theme.secondary.dark};
        border-radius: 4px;
        font-weight: bold;
        background-color: ${props => props.theme.secondary.main};
        color: ${props => props.theme.dark.main};
    }

    .home__top_categories {
        display: none;

        @media screen and (max-width:875px){
            display: flex;
        }
    }

`;


export default Home;