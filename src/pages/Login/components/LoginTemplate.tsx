const LoginTemplate = ({canClose=true}: ILoginTemplate) => {
    const isSubmitting = useRef(false);
    const login = useLoginUser();
    const navigate = useNavigate();
    const {dispatch} = useGlobalContext();
    const [formstate, setFormstate] = useState({
        email: "",
        password: ""
    })
    const [feedback, setFeedback] = useState({
        email: "",
        password: ""
    })

    function changeHandler(e: ChangeEvent<HTMLInputElement>): void{
        const {name, value} = e.target;
        if(name === 'email'){
            let val = '';
            if(!Regex.isEmail(value))  val = 'Invalid email address';
            setFeedback((old) => {
                return {
                    ...old,
                    [name]:  val
                }
            })
        }else {
            let val = '';
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
        isSubmitting.current = true;
        try{
            const res = await login.mutateAsync({...formstate});
            console.log({res});
            let data: {message: string, success: boolean, data?: any} = await res.data;
            if(!data.success) throw new Error(data.message);
            const userdata = data.data;
            dispatch({
                type: LOGIN,
                payload: {
                    userdata: userdata?.user,
                    refreshKey: userdata?.refreshToken,
                    accessKey: userdata?.accessToken
                }
            })
            if(canClose){
                closeModal();
            }else {
                navigate("/");
            }
            toast(data.message, {});
        }catch(e: any){
            toast(e.message, {type: 'error'});
        }finally {
            isSubmitting.current = false;
        }
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
        <LoginTemplateWrapper animate={{y: 0}} initial={{y: -100}} exit={{y: 0}} transition={{stiffness: 0.3, type:'inertia'}}>
            {canClose && (<motion.span whileHover={{scale: 1.2, color: 'red'}} transition={{duration: 0.8, type: 'tween'}}>
                <MdClear onClick={closeModal} />
            </motion.span>)}
            <LoginTemplateTop>
                <Logo />
            </LoginTemplateTop>

            <LoginForm>
                <div>
                    <label>Email</label>
                    <input type="email" style={{borderColor: feedback["email"] ? 'red' : ''}} value={formstate.email} onChange={changeHandler} name="email" placeholder="Enter your email" />
                    {feedback["email"] && <motion.i initial={{opacity: 0, x: -100}} transition={{stiffness: 0.5}} exit={{opacity: 0, x: -100}} animate={{opacity: 1, x:0}}><MdInfo /> {feedback["email"]}</motion.i>}
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" style={{borderColor: feedback["password"] ? 'red' : ''}} value={formstate.password} onChange={changeHandler} name="password" placeholder="Enter your password" />
                    {feedback["password"] && <motion.i initial={{opacity: 0, x: -100}} transition={{stiffness: 0.5}} animate={{opacity: 1, x:0}} exit={{opacity: 0, x: -100}}><MdInfo /> {feedback["password"]}</motion.i>}
                </div>
                <motion.p whileHover={{scale: 1.01}}><span>Don't have an account? <a onClick={showRegisterHandler}>Register</a></span> <NavLink to="#">Forgot password</NavLink></motion.p>
                <section>
                    <motion.button
                    onClick={loginUserHandler}
                    whileHover={{scale: 1.1}}
                    transition={{stiffness: 0.5, type:'inertia'}}
                    >
                        {
                            isSubmitting.current ? <Loader /> : <span>Login</span>
                        }
                    </motion.button>
                </section>
            </LoginForm>
        </LoginTemplateWrapper>
    )
}




import styled from "styled-components";
import {motion} from "framer-motion";
import { MdClear, MdInfo } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";
import { ChangeEvent, useRef, useState } from "react";
import {toast} from "react-toastify";

import Logo from "../../../components/Logo";
import Regex from "../../../utils/Regex";
import Loader from "../../../components/Loader";
import { useLoginUser } from "../../../store/mutations/user";
import { useGlobalContext } from "../../../contexts/GlobalContext";
import { LOGIN } from "../../../contexts/actions";



type ILoginTemplate = {
    canClose?: boolean
}


const LoginTemplateWrapper = styled(motion.div)`
    background-color: ${props => props.theme.secondary.main};
    width: min(100% - 0.5rem, 500px);
    margin-inline: auto;
    margin-top: 200px;
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

const LoginForm = styled(motion.div)`
    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    gap: 20px;
    margin-top: 40px;

    > div {
        width: 100%;
        display:flex;
        gap: 5px;
        flex-direction: column;

        > label {
            font-size: 0.85rem;
            font-weight: 600;
        }

        > input {
            line-height: 2;
            padding: 4px;
            outline: none;
            border: 1px solid ${props => props.theme.secondary.dark};
            border-radius: 4px;
            transition: all 0.6s ease-out;
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
            color: ${props => props.theme.secondary.main};
            padding: 10px;
            border-radius: 4px;
            cursor: pointer;
        }
    }

    > p {
        width:100%;
        display: flex;
        align-items: flex-start;
        gap: 30px;
        justify-content: space-between;

        >span {
            font-size: 0.9rem;
            display: flex;
            flex-direction: column;
            gap: 5px;
            > a {
                color: ${props => props.theme.primary.main};
                text-decoration: none;
                font-size: 0.8rem;
                font-weight: 600;
                cursor: pointer;
            }
        }

        > a {
            color: ${props => props.theme.primary.main};
            text-decoration: none;
            font-size: 0.8rem;
            font-weight: 600;
        }
    }
`;

const LoginTemplateTop = styled(motion.div)``;





export default LoginTemplate;