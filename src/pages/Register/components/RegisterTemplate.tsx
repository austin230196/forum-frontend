const RegisterTemplate = ({canClose=true}: IRegisterTemplate) => {
    const isSubmitting = useRef(false);
    const [formstate, setFormstate] = useState({
        email: "",
        name: "",
        password: ""
    })
    const [feedback, setFeedback] = useState({
        email: "",
        name: "",
        password: ""
    })
    const navigate = useNavigate();
    const register = useRegisterUser();

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
        }else if(name === 'name'){
            let val = '';
            if(!Regex.isValidName(value))  val = 'Name isn\'t valid';
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
        document.getElementById("register__backdrop")!.style.display = "none";
    }

    function showLoginHandler(){
        if(canClose){
            closeModal();
            document.getElementById("login__backdrop")!.style.display = "block";
        }else {
            navigate("/login");
        }
    }

    async function registerUserHandler() {
        isSubmitting.current = true;
        try{
            const res = await register.mutateAsync({...formstate});
            const data = await res.data;
            if(!data.success) throw new Error(data.message);
            toast(data.message);
            //welcome page
            navigate("/user/welcome");
            showLoginHandler();
        }catch(e: any){
            toast(e.message, {type: 'error'});
        }finally{
            isSubmitting.current = false;
        }
    }
    return (
        <RegisterTemplateWrapper animate={{y: 0}} initial={{y: -100}} exit={{y: 0}} transition={{stiffness: 0.3, type:'inertia'}}>
            {canClose && (<motion.span whileHover={{scale: 1.2, color: 'red'}} transition={{duration: 0.8, type: 'tween'}}>
                <MdClear onClick={closeModal} />
            </motion.span>)}
            <RegisterTemplateTop>
                <Logo />
            </RegisterTemplateTop>

            <RegisterForm>
                <div>
                    <label>Name</label>
                    <input type="name" style={{borderColor: feedback["name"] ? 'red' : ''}} value={formstate.name} onChange={changeHandler} name="name" placeholder="Enter fullname" />
                    {feedback["name"] && <motion.i initial={{opacity: 0, x: -100}} transition={{stiffness: 0.5}} exit={{opacity: 0, x: -100}} animate={{opacity: 1, x:0}}><MdInfo /> {feedback["name"]}</motion.i>}
                </div>
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
                <motion.p whileHover={{scale: 1.01}}>Already have an account? <a onClick={showLoginHandler}>Login</a> </motion.p>
                <section>
                    <motion.button
                    onClick={registerUserHandler}
                    whileHover={{scale: 1.1}}
                    transition={{stiffness: 0.5, type:'inertia'}}
                    >
                        {
                            isSubmitting.current ? <Loader /> : <span>Register</span>
                        }
                    </motion.button>
                </section>
            </RegisterForm>
        </RegisterTemplateWrapper>
    )
}




import styled from "styled-components";
import {motion} from "framer-motion";
import { MdClear, MdInfo } from "react-icons/md";
import { ChangeEvent, useRef, useState } from "react";
import {toast} from "react-toastify";

import Logo from "../../../components/Logo";
import Regex from "../../../utils/Regex";
import Loader from "../../../components/Loader";
import { useRegisterUser } from "../../../store/mutations/user";
import { useNavigate } from "react-router-dom";



type IRegisterTemplate = {
    canClose?: boolean
}


const RegisterTemplateWrapper = styled(motion.div)`
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

const RegisterForm = styled(motion.div)`
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
        align-items: center;
        gap: 10px;
        font-size: 0.8rem;

        > a {
            color: ${props => props.theme.primary.main};
            text-decoration: none;
            font-size: 0.8rem;
            font-weight: 600;
            cursor: pointer;
        }
    }
`;

const RegisterTemplateTop = styled(motion.div)``;





export default RegisterTemplate;