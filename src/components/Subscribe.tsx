const Subscribe = () => {
    const store = useGlobalContext();
    const userdata = useStore(store as StoreApi<GlobalState>, (state) => state.userdata);
    const updateUserdata = useStore(store as StoreApi<GlobalState>, (state) => state.updateUserdata);
    const [show, setShow] = useState<boolean>(() => !userdata?.subscribed);
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const theme = useTheme();
    const [feedback, setFeedback] = useState<string|null>(null);
    const subscribe = useSubscribe();

    function hideBackdropHandler(){
        setShow(() => false);
    }

    useEffect(() => {
        setShow(() => !userdata?.subscribed)
        console.log({show})
    }, [userdata])

    
    async function subscribeHandler(){
        setLoading(() => true);
        try{
            if(!email) throw new Error("Please enter your email");
            const res = await subscribe.mutateAsync(email);
            if(res.status !== "success") throw new Error(res.message);
            toast(res.message, {type: 'success'});
            await updateUserdata();
        }catch(e: any){
            toast(e.message, {type: 'error'})
        }finally{
            setLoading(() => false);
        }
    }

    function changeHandler(e: ChangeEvent<HTMLInputElement>){
        let val = null;
        let address = e.target.value;
        if(!Regex.isEmail(address)) val = 'Enter a valid address';
        setFeedback(() => val);
        setEmail(() => address);
    }

    return (
        <>
        {
            show ? 
            (
                <SubscribeBackdrop style={{display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'}}
                >
                    <SubscribeWrapper>
                        <SubscribeLeft>
                            <h1>Want to know when new discussions are added?</h1>
                            <p>Subscribe to our newsletter for regular updates</p>
                            <SubscribeInput style={{border: feedback ? `1px solid ${theme.error.main}` : ''}}>
                                <input type="email" placeholder="Enter your email address" value={email} onChange={changeHandler} />
                                <button onClick={subscribeHandler} disabled={loading || !!feedback}>{loading ? <CircularLoader size={20} /> : 'Subscribe'}</button>
                            </SubscribeInput>
                            <a onClick={hideBackdropHandler}>No, thanks</a>
                        </SubscribeLeft>
                        <SubscribeRight>
                            <img src={image} alt="Image" />
                        </SubscribeRight>
                    </SubscribeWrapper>
                </SubscribeBackdrop>
            ) : null
        }
        </>
    )
}



import styled, { useTheme } from "styled-components";
import { ChangeEvent, useEffect, useState } from "react";

import Backdrop from "./Backdrop";
import image from "../assets/svgs/share_link.svg";
import {CircularLoader} from "./Loader";
import { useSubscribe } from "../store/mutations/subscriber";
import { toast } from "react-toastify";
import Regex from "../utils/Regex";
import { StoreApi, useStore } from "zustand";
import { GlobalState } from "../contexts/store";
import { useGlobalContext } from "../contexts/GlobalContext";



const SubscribeBackdrop = styled(Backdrop)`
`;
const SubscribeWrapper = styled.div`
    width: min(100% - 0.5rem, 600px);
    border-radius: 8px;
    display: grid;
    grid-template-columns: 1fr 250px;
    background-color: ${props => props.theme.secondary.main};

    @media screen and (max-width: 595px){
        grid-template-columns: 1fr;
        grid-template-rows: 200px 1fr;
    }
`;
const SubscribeLeft = styled.div`
    padding: 20px;
    background-color: ${props => props.theme.primary.main};
    border-radius: 8px 0px 0px 8px;

    > h1 {
        color: ${props => props.theme.secondary.main};
        margin-bottom: 10px;
    }
    > p {
        color: ${props => props.theme.secondary.dark};
        margin-bottom: 30px;
        font-size: 0.9rem;
    }
    > a {
        display: block;
        text-decoration: underline;
        text-align: center;
        color: ${props => props.theme.secondary.dark};
        font-size: 0.8rem;
        cursor: pointer;
    }

    @media screen and (max-width: 595px){
        order: 1;
        border-radius: 0px;
    }
`;
const SubscribeRight = styled.div`
    padding: 20px;
    display: flex;
    align-items: flex-end;

    > img {
        width: 100%;
        height: 100% !important;
    }
`;
const SubscribeInput = styled.div`
    display: flex;
    align-items: center;
    position: relative;
    width: 100%;
    margin-bottom: 20px;
    border-radius: 6px !important;

    > input {
        flex: 1;
        outline: none;
        line-height: 2;
        border: none;
        border-radius: 6px;
        padding: 4px;
    }

    > button {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        border: none;
        cursor: pointer;
        padding: 0px 10px;
        border-radius: 6px;
        min-width: 60px;
        opacity: 1;

        &:disabled {
            opacity: 0.6;
            cursor: not-allowed;
        }
    }
`;




export default Subscribe;