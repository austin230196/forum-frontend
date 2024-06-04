const RegisterTemplate = ({canClose=true}: IRegisterTemplate) => {
    const [submitting, setSubmitting] = useState(false);
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
        setSubmitting(() => true);
        try{
            const res = await register.mutateAsync({...formstate});
            const data = await res.data;
            if(!data.success) throw new Error(data.message);
            toast(data.message);
            //welcome page
            navigate("/user/welcome");
        }catch(e: any){
            toast(e.message, {type: 'error'});
        }finally{
            setSubmitting(() => false);
        }
    }

    return (
        <RegisterTemplateWrapper>
            {canClose && (<span>
                <MdClear onClick={closeModal} />
            </span>)}
            <RegisterTemplateTop>
                <Logo />
            </RegisterTemplateTop>

            <RegisterForm>
                <div>
                    <label>Name</label>
                    <input type="name" style={{borderColor: feedback["name"] ? 'red' : ''}} value={formstate.name} onChange={changeHandler} name="name" placeholder="Enter fullname" />
                    {feedback["name"] && <i><MdInfo /> {feedback["name"]}</i>}
                </div>
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
                <p>Already have an account? <a onClick={showLoginHandler}>Login</a> </p>
                <section>
                    <button
                    onClick={registerUserHandler}
                    >
                        {
                            submitting ? <CircularLoader size={20} /> : <span>Register</span>
                        }
                    </button>
                </section>
            </RegisterForm>
        </RegisterTemplateWrapper>
    )
}




import styled from "styled-components";
import { MdClear, MdInfo } from "react-icons/md";
import { ChangeEvent, useState } from "react";
import {toast} from "react-toastify";

import Logo from "../../../components/Logo";
import Regex from "../../../utils/Regex";
import {CircularLoader} from "../../../components";
import { useRegisterUser } from "../../../store/mutations/user";
import { useNavigate } from "react-router-dom";



type IRegisterTemplate = {
    canClose?: boolean
}


const RegisterTemplateWrapper = styled.div`
    background-color: ${props => props.theme.secondary.main};
    width: min(100% - 0.5rem, 500px);
    margin-inline: auto;
    padding: 20px;
    border-radius: 8px;
    margin-top: 200px;
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

const RegisterForm = styled.div`
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
        font-size: 0.9rem;

        > a {
            color: ${props => props.theme.primary.main};
            text-decoration: none;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
        }
    }
`;

const RegisterTemplateTop = styled.div``;





export default RegisterTemplate;