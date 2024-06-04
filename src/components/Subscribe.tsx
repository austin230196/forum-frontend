const Subscribe = () => {
    const [show, setShow] = useState<boolean>(true);
    const loading = useRef(false);
    function hideBackdropHandler(){
        setShow(() => false);
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
                            <SubscribeInput>
                                <input type="email" placeholder="Enter your email address" />
                                <button>{loading.current ? <CircularLoader size={20} /> : 'Subscribe'}</button>
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



import styled from "styled-components";
import { useRef, useState } from "react";

import Backdrop from "./Backdrop";
import image from "../assets/svgs/share_link.svg";
import {CircularLoader} from "./Loader";



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
    }
`;




export default Subscribe;