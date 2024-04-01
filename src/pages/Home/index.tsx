const Home = () => {
    const [order, setOrder] = useState<'latest'|'oldest'>('latest');
    const location = useLocation();
    const isFollowing = useRef(false);
    const [category, setCategory] = useState(!!location.search ? location?.search?.split("=")[1] : "");
    const {data, isLoading, error, isError} = useGetTopics(category ? category as Category : null, order);
    const followMutaion = useFollowTopic();
    // const theme = useTheme();

    useEffect(() => {
        console.log("UPDATED");
        setCategory(() => {
            return location?.search?.split("=")[1]
        })
    }, [location.search, category]);


    const topics = useMemo(() => {
        if(isError) return null;
        else if(data) return data!.data?.data;
        else return null;
    }, [isLoading, data, error, category]);

    function getColor(category: string='general'): string{
        let found = categories.find(c => c.name === category);
        return found ? found.color : 'yellow';
    }


    async function followTopicHandler(_: any, _id: string){
        isFollowing.current = true;
        try{
            const res = await followMutaion.mutateAsync({topicId: _id, userId: "65ff59c3978d6b964748d744"});
            console.log({res});
        }catch(e: any){
            toast(e.message, {
                type: 'error'
            })
        }finally {
            isFollowing.current = false;
        }
    }

    return (
        <MainLayout>
            <HomeWrapper>
                <HomeTop>
                    <select value={order} onChange={ev => setOrder(_ => ev.target.value as ('latest' | 'oldest'))}>
                        <option value="latest">Latest</option>
                        <option value="oldest">Oldest</option>
                    </select>
                    <select className="home__top_categories" value={category} onChange={ev => setCategory(_ => ev.target.value as ('latest' | 'oldest'))}>
                        <option value="">All</option>
                        {
                            categories.map(c => <option value={c.name}>{c.name.toLocaleUpperCase()}</option>)
                        }
                    </select>
                </HomeTop>
                <HomeBody
                transition={{staggerChildren: 1}}
                >
                    {
                        isLoading ? <SuspenseLoader /> : 
                        isError ? <div>{error.message}</div> :
                        topics?.length ? 
                        topics?.map(({message, title, category, creator, createdAt, replies, _id}: any, i: number) => (
                            <Topic key={i} initial={{opacity: 0.5, x: 100}} 
                            transition={{type: 'spring'}} animate={{}}
                            whileInView={{opacity: 1, x: 0}}>
                                <span style={{borderColor: getColor(category)}}> 
                                    <span style={{backgroundColor: getColor(category)}}></span> {category ?? 'general'}
                                </span>
                                <TopicLeft>
                                    <Avatar height={50} width={50} />
                                    <TopicContent>
                                        <h3>{title}</h3>
                                        <aside>{creator?.name} started at {new Date(createdAt).toString()}</aside>
                                        <p>{message}</p>
                                    </TopicContent>
                                </TopicLeft>
                                <TopicRight>
                                    <TopicRightTop>
                                        <span>
                                            <FaComment />  {replies?.length}
                                        </span>
                                        <span>
                                            <IoMdMore />
                                        </span>
                                    </TopicRightTop>
                                    <motion.button                                
                                    whileHover={{scale: 1.1}}
                                    transition={{type: 'spring'}}
                                    onClick={e => followTopicHandler(e, _id)}>
                                        <FaStar />
                                        {/* {isFollowing.current ? <Loader color={`${theme.dark.main} !important`} /> : <span>Follow</span>} */}
                                        <span>Follow</span>
                                    </motion.button>
                                </TopicRight>
                            </Topic>))
                        : <div className="empty__topics">No topics found</div>
                    }
                </HomeBody>
            </HomeWrapper>
        </MainLayout>
    )
}



import styled from "styled-components";
import {motion} from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { FaComment, FaStar } from "react-icons/fa";
import { IoMdMore } from "react-icons/io";
import { toast } from "react-toastify";

import MainLayout from "../../layout/MainLayout";
import Avatar from "../../components/Avatar";
import { categories } from "../../components/Sidebar";
import { useGetTopics } from "../../store/queries/topic";
import { useFollowTopic } from "../../store/mutations/topic";
import { useLocation } from "react-router-dom";
import Category from "../../types/Category";
import SuspenseLoader from "../../components/SuspenseLoader";
// import Loader from "../../components/Loader";


const TopicContent = styled.section`
    display: flex;
    flex-direction: column;

    > aside {
        font-size: 0.6rem;
        margin-bottom: 10px;
    }

    > h3 {
        margin-bottom: 5px;
    }

    > p {
        font-size: 0.8rem;
    }
`;
const Topic = styled(motion.div)`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
    border-radius: 8px;
    border: 1px solid ${props => props.theme.secondary.dark};
    cursor: pointer;
    position: relative;
    gap: 40px;

    > span {
        position: absolute;
        border-width: 2px;
        border-style: solid;
        right: 15px;
        top: -15px;
        border-radius: 4px;
        text-transform: uppercase;
        padding: 5px;
        font-size: 0.7rem;
        font-weight: bold;
        background-color: ${props => props.theme.secondary.main};
        display: flex;
        align-items: center;
        gap: 5px;

        > span {
            width: 10px;
            height: 10px;
            border-radius: 50px;
        }
    }
`;
const TopicLeft = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 20px;
`;
const TopicRight = styled.div`
    display: flex;
    flex-direction: column;
    gap: 6px;
    align-items: flex-end;

    > button {
        display: flex;
        align-items: center;
        gap: 5px;
        background-color: ${props => props.theme.secondary.main};
        padding: 6px 12px;
        border: none;
        box-shadow: 0px 2px 5px #ccc;
        border-radius: 6px;
        font-size: 0.8rem;
        font-weight: 600;
        cursor: pointer;

        > svg {
            color: ${props => props.theme.info.main}
        }
    }
`;
const TopicRightTop = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;

    > span {
        display: flex;
        align-items: center;
        
        &:first-child {
            font-size: 0.8rem;
            font-weight: 600;
            gap: 5px;
        }
    }
`;
const HomeBody = styled(motion.div)`
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
    }

    .home__top_categories {
        display: none;

        @media screen and (max-width:875px){
            display: flex;
        }
    }

`;


export default Home;