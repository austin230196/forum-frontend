const LoginTemplate = ({canClose=true, main=false}: ILoginTemplate) => {
    const flag = useRef(true);
    const login = useLoginUser();
    const navigate = useNavigate();
    const location = useLocation();
    const socialLogin = useLoginSocialUser();
    const [submitting, setSubmitting] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [show2FA, setShow2FA] = useState(false);
    const [email, setEmail] = useState<string|null>(null);
    const [formstate, setFormstate] = useState({
        email: "",
        password: ""
    })
    const [feedback, setFeedback] = useState<{email: string|null; password: string|null}>({
        email: null,
        password: null
    })

    useEffect(() => {
        if(flag.current){
            const urlParams = new URLSearchParams(location.search);
            // const paramProxy = new Proxy(urlParams, {
            //     get: (target, prop) => target.get(prop as string)
            // })
            const code = urlParams.get("code");
            console.log({code});
            if(code){
                setDisabled(() => true);
                if(code === 'redirect_uri_mismatch&error_description'){
                    console.log("REDIRECT URI MISMATCH");
                    navigate("/");
                }
                const provider = window.localStorage.getItem(SOCIAL_AUTH_PROVIDER) as 'github' | 'google';
                console.log({provider});
                socialLogin.mutateAsync({provider, code})
                .then(async data => {
                    console.log({data});
                    const res = data.data;
                    await loginUser(res);
                    window.localStorage.removeItem(SOCIAL_AUTH_PROVIDER);
                })
                .catch(e => console.error({e}))
            }
            flag.current = false;
        }
    }, [])

    function changeHandler(e: ChangeEvent<HTMLInputElement>): void{
        const {name, value} = e.target;
        if(name === 'email'){
            let val = null;
            if(!Regex.isEmail(value))  val = 'Invalid email address';
            setFeedback((old) => {
                return {
                    ...old,
                    [name]:  val
                }
            })
        }else {
            let val = null;
            if(!Regex.isValidPassword(value)) val = 'Password must be atleast 6 characters';
            setFeedback((old) => {
                return {
                    ...old,
                    [name]:  val
                }
            })
        }
        setFormstate(old => {
            return {
                ...old,
                [name]: value
            }
        })
    }

    function closeModal(){
        document.getElementById("login__backdrop")!.style.display = "none"
    }

    async function loginUserHandler() {
        setSubmitting(() => true);
        try{
            const res = await login.mutateAsync({...formstate});
            console.log({res});
            let data: {message: string, success: boolean, data?: any} = await res.data;
            if(!data.success) throw new Error(data.message);
            await loginUser(data);
        }catch(e: any){
            toast(e.message, {type: 'error'});
        }finally {
            setSubmitting(() => false);
        }
    }

    async function loginUser(data: any){
        if(data.data.hasOwnProperty("twoFA")){
            //then run the 2fa input
            setShow2FA(() => true);
            setEmail(() => data.data.email);
            toast(data.message);
        }else await loginFinally(data);
    }


    async function loginFinally(data: any){
        const userdata = data.data;
        const store = new Store(STORE_KEY);
        await store.set("refreshKey", userdata?.refreshToken);
        await store.set("accessKey", userdata?.accessToken);
        if(canClose){
            closeModal();
        }else {
            navigate("/");
        }
        toast(data.message, {});
    }

    function showRegisterHandler(){
        if(canClose){
            closeModal();
            document.getElementById("register__backdrop")!.style.display = 'block';
        }else {
            navigate("/register");
        }
    }
    return (
        <LoginTemplateWrapper $main={main}>
            {canClose && (<span>
                <MdClear onClick={closeModal} />
            </span>)}
            {
                show2FA ? <TwoFADialog login={loginFinally} email={email!} /> : null
            }
            <LoginTemplateTop>
                <Logo />
            </LoginTemplateTop>

            <LoginForm>
                <div>
                    <label>Email</label>
                    <input type="email" style={{borderColor: feedback["email"] ? 'red' : ''}} value={formstate.email} onChange={changeHandler} name="email" placeholder="Enter your email" />
                    {feedback["email"] && <i><MdInfo /> {feedback["email"]}</i>}
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" style={{borderColor: feedback["password"] ? 'red' : ''}} value={formstate.password} onChange={changeHandler} name="password" placeholder="Enter your password" />
                    {feedback["password"] && <i><MdInfo /> {feedback["password"]}</i>}
                </div>
                <p><span>Don't have an account? <a onClick={showRegisterHandler}>Register</a></span> <NavLink to="/forgot-password">Forgot password</NavLink></p>
                <aside id="social__auth">
                    <p>or login with</p>
                    <div>
                        <GoogleButton disabled={disabled} />
                        <GithubButton disabled={disabled} />
                    </div>
                </aside>
                <section>
                    <button
                    disabled={disabled || submitting || !!feedback.email || !!feedback.password}
                    onClick={loginUserHandler}
                    >
                        {
                            submitting ? <CircularLoader size={20} /> : <span>Login</span>
                        }
                    </button>
                </section>
            </LoginForm>
        </LoginTemplateWrapper>
    )
}




import styled from "styled-components";
import { MdClear, MdInfo } from "react-icons/md";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import {toast} from "react-toastify";

import Logo from "../../../components/Logo";
import Regex from "../../../utils/Regex";
import {CircularLoader} from "../../../components";
import { useLoginSocialUser, useLoginUser } from "../../../store/mutations/user";
import GoogleButton from "./GoogleButton";
import GithubButton from "./GithubButton";
import { SOCIAL_AUTH_PROVIDER, STORE_KEY } from "../../../constants";
import Store from "../../../utils/Store";
import TwoFADialog from "./TwoFADialog";



type ILoginTemplate = {
    canClose?: boolean;
    main?: boolean;
}

export type IAuthButton = {
    disabled?: boolean
}


const LoginTemplateWrapper = styled.div<{$main: boolean}>`
    background-color: ${props => props.theme.secondary.main};
    width: min(100% - 0.5rem, 500px);
    margin-inline: auto;
    margin-top: ${props => props.$main ? '0px' : '200px'};
    padding: 20px;
    border-radius: 8px;
    position: relative;
    box-shadow: 0px 2px 5px #ccc;
    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    > span {
        position: absolute;
        top: 20px;
        right: 20px;
        cursor: pointer
    }
`;

export const LoginForm = styled.div`
    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    gap: 20px;
    margin-top: 40px;

    >#social__auth {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 15px;
        color: ${props => props.theme.dark.main};

        > p {
            font-size: 0.8rem;
        }

        > div {
            display: flex;
            align-items: center;
            gap: 50px;
        }
    }

    > div {
        width: 100%;
        display:flex;
        gap: 5px;
        flex-direction: column;

        > label {
            font-size: 0.85rem;
            font-weight: 600;
            color: ${props => props.theme.dark.main};
        }

        > input {
            line-height: 2;
            padding: 4px;
            outline: none;
            border: 1px solid ${props => props.theme.secondary.dark};
            border-radius: 4px;
            transition: all 0.6s ease-out;
            background-color: ${props => props.theme.secondary.light};
            color: ${props => props.theme.dark.main};
        }

        > i {
            display: flex;
            align-items: center;
            font-size: 0.7rem;
            gap: 3px;
            color: red;

            > svg {
                font-size: 0.9rem;
            }
        }
    }

    > section {
        width: 100%;
        

        > button {
            width: 100%;
            background-color: ${props => props.theme.primary.main};
            border: none;
            color: ${props => props.theme.dark.main};
            padding: 10px;
            border-radius: 4px;
            cursor: pointer;
            opacity: 1;


            &:disabled {
                cursor: not-allowed;
                opacity: 0.6;
            }
        }
    }

    > p {
        width:100%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 8px;
        color: ${props => props.theme.dark.main};

        >span {
            font-size: 0.9rem;
            display: flex;
            gap: 5px;
            > a {
                color: ${props => props.theme.primary.main};
                text-decoration: none;
                font-size: 0.8rem;
                font-weight: 600;
                cursor: pointer;
                font-size: 1rem;
            }
        }

        > a {
            color: ${props => props.theme.primary.main};
            text-decoration: none;
            font-size: 1rem;
            font-weight: 600;
        }
    }
`;

const LoginTemplateTop = styled.div``;





export default LoginTemplate;