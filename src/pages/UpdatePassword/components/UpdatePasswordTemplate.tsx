const UpdatePasswordTemplate = () => {
    const [submitting, setSubmitting] = useState(false);
    const flag = useRef(true);
    const navigate = useNavigate();
    const location = useLocation();
    const [formstate, setFormstate] = useState({
        password: "",
        confirmPassword: ""
    });
    const [feedback, setFeedback] = useState({
        password: null,
        confirmPassword: null
    });
    const updatePassword = useUpdatePassword();
    const [token, setToken] = useState<string|null>(null);

    useEffect(() => {
        if(flag.current){
            let t = new URLSearchParams(location.search).get("token");
            if(!t) {
                toast('No token found', {
                    type: 'error'
                })
                navigate("/login");
            }
            setToken(() => t);
            flag.current = false;
        }
    }, [])

    
    function changeHandler(e: ChangeEvent<HTMLInputElement>): void{
        const {value, name} = e.target;
        let val = '';
        if(name === 'password'){
            if(!Regex.isValidPassword(value)) val = 'Password must be atleast 6 characters';
        }else {
            if(formstate.password !== value) val = 'Passwords don\'t match';
        }
        setFeedback(old => {
            return {
                ...old,
                [name]: val
            }
        })
        setFormstate(old => {
            return {
                ...old,
                [name]: value
            }
        })
    }

    async function updatePasswordHandler() {
        setSubmitting(() => true);
        try{
            if(formstate.password !== formstate.confirmPassword) throw new Error('Passwords don\'t match');
            const res = await updatePassword.mutateAsync({token: token!, password: formstate.password});
            console.log({res});
            const data = res.data;
            if(!data.success) throw new Error(data.message);
            toast(data.message, {
                type: 'success'
            })
            navigate("/login");
        }catch(e: any){
            toast(e.message, {type: 'error'});
        }finally {
            setSubmitting(() => false);
        }
    }

    function showLoginHandler(){
        navigate("/login");
    }


    return (
        <UpdatePasswordTemplateWrapper>
            <UpdatePasswordTemplateTop>
                <Logo />
            </UpdatePasswordTemplateTop>

            <UpdatePasswordForm>
                <AuthHeader>
                    <h3>Update password</h3>
                    <p>Enter your new password</p>
                </AuthHeader>
                <div>
                    <label>Password</label>
                    <input type="password" style={{borderColor: feedback.password ? 'red' : ''}} value={formstate.password} onChange={changeHandler} name="password" placeholder="Enter your new password" />
                    {feedback.password && <i><MdInfo /> {feedback.password}</i>}
                </div>
                <div>
                    <label>Confirm Password</label>
                    <input type="password" style={{borderColor: feedback.confirmPassword ? 'red' : ''}} value={formstate.confirmPassword} onChange={changeHandler} name="confirmPassword" placeholder="Confirm password" />
                    {feedback.confirmPassword && <i><MdInfo /> {feedback.confirmPassword}</i>}
                </div>
                <p><span>Remember Password? <a onClick={showLoginHandler}>Login</a></span> </p>

                <section>
                    <button
                    onClick={updatePasswordHandler}
                    disabled={submitting || !!feedback.password || !!feedback.confirmPassword}
                    >
                        {
                            submitting ? <CircularLoader size={20} /> : <span>Update Password</span>
                        }
                    </button>
                </section>
            </UpdatePasswordForm>
        </UpdatePasswordTemplateWrapper>
    )
}




import styled from "styled-components";
import { MdInfo } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import {toast} from "react-toastify";

import Logo from "../../../components/Logo";
import Regex from "../../../utils/Regex";
import {CircularLoader} from "../../../components";
import { useUpdatePassword } from "../../../store/mutations/user";



const UpdatePasswordTemplateWrapper = styled.div`
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

const UpdatePasswordForm = styled.div`
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
            opacity: 1;

            &:disabled {
                opacity: 0.6;
            }
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
            gap: 5px;
            > a {
                color: ${props => props.theme.primary.main};
                text-decoration: none;
                font-weight: 600;
                font-size: 1rem;
                cursor: pointer;
            }
        }
    }
`;

const UpdatePasswordTemplateTop = styled.div``;

const AuthHeader = styled.div`
    gap: 10px;
    margin-bottom: 20px;
    > h3 {
        font-size: 1.25rem;
        text-transform: uppercase;
        text-align: left;
        width: 100%;
    }

    >p {
        font-size: 0.8rem;
    }
`;



export default UpdatePasswordTemplate;