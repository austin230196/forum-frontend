const TwoFADialog = ({email, login}: ITwoFADialog) => {
    const [loading, setLoading] = useState(false);
    const verify2Fa = useVerify2FACode();
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

    async function verify2FACodeHandler(){
        setLoading(() => true);
        try{
            let code = '';
            let values = Object.values(formstate);
            for(let v of values){
                code += v;
            }
            if(code.length !== 6) throw new Error('Invalid code length');
            if(!email) throw new Error("User session ended");
            const res = await verify2Fa.mutateAsync({email, code});
            if(!res?.success) throw new Error(res?.message);
            await login(res);
        }catch(e: any){
            toast(e.message, {type: 'error'})
        }finally {
            setLoading(() => false);
        }
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

    
    return (
        <Dialog>
            <Wrapper>
                <span><AiOutlineGoogle /></span>
                <h4>Enter your google authenticator code</h4>
                <CodeInputContainer>
                    <CodeInput disabled={loading} ref={inputOne} type="number" value={formstate.one} name="one" onChange={changeHandler} />
                    <CodeInput disabled={loading} ref={inputTwo} type="number" value={formstate.two} name="two" onChange={changeHandler} />
                    <CodeInput disabled={loading} ref={inputThree} type="number" value={formstate.three} name="three" onChange={changeHandler} />
                    <CodeInput disabled={loading} ref={inputFour} type="number" value={formstate.four} name="four" onChange={changeHandler} />
                    <CodeInput disabled={loading} ref={inputFive} type="number" value={formstate.five} name="five" onChange={changeHandler} />
                    <CodeInput disabled={loading} ref={inputSix} type="number" value={formstate.six} name="six" onChange={changeHandler} />
                </CodeInputContainer>
                <button className="verify" disabled={loading} onClick={verify2FACodeHandler}>
                    {loading ? <CircularLoader size={20} /> : <span>Verify Code</span>}
                </button>
            </Wrapper>
        </Dialog>
    )
}



import { ChangeEvent, useRef, useState } from "react";
import styled from "styled-components";

import Dialog from "../../../components/Dialog"
import { CircularLoader } from "../../../components";
import { toast } from "react-toastify";
import { AiOutlineGoogle } from "react-icons/ai";
import { useVerify2FACode } from "../../../store/mutations/user";


type ITwoFADialog = {
    email: string;
    login: (data: any) => Promise<void>
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
        border: 3px solid ${props => props.theme.info.main}
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

        &.verify {
            background-color: ${props => props.theme.info.main};
            color: ${props => props.theme.secondary.main};
            margin-top: 20px;
            width: 100%;
        }
    }
`;


export default TwoFADialog;