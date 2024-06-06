export const EnableGoogleAuthenticator = ({cancel}: IGoogleAuthenticator) => {
    const theme = useTheme();
    const store = useGlobalContext();
    const queryClient = new QueryClient();
    const complete2FASetup = useComplete2FASetup();
    const [loading, setLoading] = useState(false);
    const [scanned, setScanned] = useState(false);
    const inputOne = useRef<HTMLInputElement|null>(null);
    const inputTwo = useRef<HTMLInputElement|null>(null);
    const inputThree = useRef<HTMLInputElement|null>(null);
    const inputFour = useRef<HTMLInputElement|null>(null);
    const inputFive = useRef<HTMLInputElement|null>(null);
    const inputSix = useRef<HTMLInputElement|null>(null);
    const [formstate, setFormstate] = useState({
        one: '',
        two: '',
        three: '',
        four: '',
        five: '',
        six:''
    })
    const [url, setUrl] = useState<string|null>(null);

    useEffect(() => {
        (inputOne.current as HTMLInputElement)?.focus();
    }, [])

    async function getGoogle2FAURL(){
        setLoading(() => true);
        try{
            const res = await queryClient.fetchQuery(get2FAUrl());
            if(!res?.success) throw new Error(res?.message);
            setUrl(() => res.data);
        }catch(e: any){
            toast(e.message, {type: 'error'});
        }finally {
            setLoading(() => false);
        }
    }


    async function verifyCode(){
        setLoading(() => true);
        try{
            let code = '';
            let values = Object.values(formstate);
            for(let v of values){
                code += v;
            }
            if(code.length !== 6) throw new Error('Invalid code length');
            const res = await complete2FASetup.mutateAsync(code);
            if(!res?.success) throw new Error(res?.message);
            toast(res.message, {type: 'success'});
            cancel();
            store?.getState().updateUserdata();
        }catch(e: any){
            toast(e.message, {type: 'error'})
        }finally {
            setLoading(() => false);
        }
    }

    function showCodeInputHandler(){
        setScanned(() => true);
        setUrl(() => null);
    }


    function changeHandler(e: ChangeEvent<HTMLInputElement>){
        const {name, value} = e.target;
        if(value.length > 1){
            setFormstate(old => {
                return {
                    ...old,
                    [name]: value[1]
                }
            })
        }else {
            setFormstate(old => {
                return {
                    ...old,
                    [name]: value
                }
            })
        }
        if(value.length){
            switch(name){
                case 'one':
                    (inputTwo.current as HTMLInputElement)?.focus();
                    break;
                case 'two':
                    (inputThree.current as HTMLInputElement)?.focus();
                    break;
                case 'three':
                    (inputFour.current as HTMLInputElement)?.focus();
                    break;
                case 'four':
                    (inputFive.current as HTMLInputElement)?.focus();
                    break;
                case 'five':
                    (inputSix.current as HTMLInputElement)?.focus();
                    break;
                case 'six':
                    //submit the code for verification
                    break;
            }
        }
    }


    if(scanned){
        return (
            <Dialog>
                <Wrapper>
                    <h4>Enter the code</h4>
                    <CodeInputContainer>
                        <CodeInput disabled={loading} ref={inputOne} type="number" value={formstate.one} name="one" onChange={changeHandler} />
                        <CodeInput disabled={loading} ref={inputTwo} type="number" value={formstate.two} name="two" onChange={changeHandler} />
                        <CodeInput disabled={loading} ref={inputThree} type="number" value={formstate.three} name="three" onChange={changeHandler} />
                        <CodeInput disabled={loading} ref={inputFour} type="number" value={formstate.four} name="four" onChange={changeHandler} />
                        <CodeInput disabled={loading} ref={inputFive} type="number" value={formstate.five} name="five" onChange={changeHandler} />
                        <CodeInput disabled={loading} ref={inputSix} type="number" value={formstate.six} name="six" onChange={changeHandler} />
                    </CodeInputContainer>
                    <button className="verify" disabled={loading} onClick={verifyCode}>
                        {loading ? <CircularLoader size={20} /> : <span>Verify Code</span>}
                    </button>
                </Wrapper>
            </Dialog>
        )
    }

    return (
        <Dialog>
            <Wrapper>
                {
                    url 
                    ? 
                    (
                        <>
                            <h4>Scan with your Authenticator app</h4>
                            <img src={url} alt="QR Code" />
                            <button className="scanned" onClick={showCodeInputHandler}>Scanned</button>
                        </>
                    ) 
                    : 
                    (
                        <>
                            <span><AiOutlineGoogle color={theme.error.main}  /></span>
                            <h4>Enable Google 2FA Authenticator</h4>
                            <p>You'll need to scan the QR Code and add this app in your authenticator app</p>
                            <button disabled={loading} className="confirm" onClick={getGoogle2FAURL}>
                                {
                                    loading ? <CircularLoader size={20} /> : <span>Confirm</span>
                                }
                            </button>
                            <button disabled={loading} className="cancel" onClick={cancel}>Cancel</button>
                        </>
                    )
                }
            </Wrapper>
        </Dialog>
    )
}

export const DisableGoogleAuthenticator = ({cancel}: IGoogleAuthenticator) => {
    const theme = useTheme();
    const queryClient = new QueryClient();
    const [loading, setLoading] = useState(false);
    const store = useGlobalContext();


    async function disable2FAHandler(){
        setLoading(() => true);
        try{
            const res = await queryClient.fetchQuery(disable2FA());
            console.log({res});
            if(!res?.success) throw new Error(res?.message);
            toast(res?.message, {type: 'success'});
            cancel();
            store?.getState().updateUserdata();
        }catch(e: any){
            toast(e.message, {type: 'error'})
        }finally {
            setLoading(() => false);
        }
    }

    return (
        <Dialog>
            <Wrapper>
                <span><AiOutlineAlert color={theme.error.main} /></span>
                <h4>Disable Google 2FA Authenticator</h4>
                <p>This will disable your authenticator app as a layer of security and verification</p>
                <button onClick={disable2FAHandler} style={{backgroundColor: theme.error.main}} disabled={loading} className="confirm">
                    {loading ? <CircularLoader size={20} /> : <span>Confirm</span>}
                </button>
                <button className="cancel" disabled={loading} onClick={cancel}>Cancel</button>
            </Wrapper>
        </Dialog>
    )
}



import { ChangeEvent, useEffect, useRef, useState } from "react";
import styled, { useTheme } from "styled-components"
import { QueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { AiOutlineGoogle, AiOutlineAlert } from "react-icons/ai"

import Dialog from "../../../components/Dialog"
import { disable2FA, get2FAUrl } from "../../../store/queries/user";
import { CircularLoader } from "../../../components";
import { useComplete2FASetup } from "../../../store/mutations/user";
import { useGlobalContext } from "../../../contexts/GlobalContext";


type IGoogleAuthenticator = {
    cancel: () => void;
}



const CodeInputContainer = styled.div`
    width: 100%;
    display: grid;
    align-items: center;
    grid-template-columns: repeat(6, 1fr);
    gap: 5px;
    margin-block: 20px;
`;
const CodeInput = styled.input`
    width: 55px;
    line-height: 2;
    padding: 4px;
    font-weight: 600;
    text-align: center;
    font-size: 1.5rem;
    border: 2px solid ${props => props.theme.dark.main};
    border-radius: 8px;
    outline: none;

    &:focus {
        border: 3px solid ${props => props.theme.extra.main}
    }
`;
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    > span {
        font-size: 4rem;
        color: ${props => props.theme.info.main};
    }

    > h4 {
        font-size: 0.9rem;
        margin-bottom: 15px;
    }

    > p {
        font-size: 0.7rem;
        text-align: center;
        margin-bottom: 15px;
    }

    > button {
        width: 80%;
        margin-bottom: 10px;
        cursor: pointer;
        border: none;
        padding: 10px;
        border-radius:8px;

        &.confirm{
            background-color: ${props => props.theme.primary.main};
            color: ${props => props.theme.secondary.main};
        }

        &.scanned {
            background-color: ${props => props.theme.extra.main};
            color: ${props => props.theme.secondary.main};
            margin-top: 20px;
        }

        &.verify {
            background-color: ${props => props.theme.extra.main};
            color: ${props => props.theme.secondary.main};
            margin-top: 20px;
            width: 100%;
        }
    }
`;