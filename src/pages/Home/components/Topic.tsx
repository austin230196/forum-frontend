const Topic = ({message, category, title, createdAt, creator, replies, _id}: ITopic) => {
    const [following, setFollowing] = useState<boolean>(false);

    const followMutaion = useFollowTopic();
    function getColor(category: string='general'): string{
        let found = categories.find(c => c.name === category);
        return found ? found.color : 'yellow';
    }


    async function followTopicHandler(_: any, _id: string){
        setFollowing(() => true);
        try{
            const res = await followMutaion.mutateAsync({topicId: _id, userId: "65ff59c3978d6b964748d744"});
            console.log({res});
        }catch(e: any){
            toast(e.message, {
                type: 'error'
            })
        }finally {
            setFollowing(() => false);
        }
    }

    return (
        <TopicWrapper>
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
                <button                                
                onClick={e => followTopicHandler(e, _id)}>
                    <FaStar />
                    {following ? <CircularLoader size={15} /> : <span>Follow</span>}
                </button>
            </TopicRight>
        </TopicWrapper>
    )
}



import styled from "styled-components";
import { FaComment, FaStar } from "react-icons/fa";
import { IoMdMore } from "react-icons/io";
import { toast } from "react-toastify";

import { useFollowTopic } from "../../../store/mutations/topic";
import { CircularLoader, Avatar } from "../../../components";
import { useState } from "react";
import { categories } from "../../../components/Sidebar";


type ITopic = {
    message: string; 
    title: string;
    category: string;
    creator: any;
    createdAt: Date;
    replies: any[];
    _id: string;
}



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
const TopicWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
    border-radius: 8px;
    border: 1px solid ${props => props.theme.secondary.dark};
    cursor: pointer;
    position: relative;
    gap: 40px;

    @media screen and (max-width: 645px){
        flex-direction: column;
        align-items: flex-start;
        gap: 15px;
    }

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

    @media screen and (max-width: 645px){
        width: 100%;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;

        > button {
            order: -1;
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



export default Topic;