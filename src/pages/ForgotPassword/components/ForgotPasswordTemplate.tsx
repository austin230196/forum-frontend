const ForgotPasswordTemplate = () => {
    const isSubmitting = useRef(false);
    const navigate = useNavigate();
    // const {dispatch} = useGlobalContext();
    const [email, setEmail] = useState("");
    const [feedback, setFeedback] = useState<string|null>(null);
    const forgotPassword = useForgotPassword();

    function changeHandler(e: ChangeEvent<HTMLInputElement>): void{
        const {value} = e.target;
        let val = '';
        if(!Regex.isEmail(value))  val = 'Invalid email address';
        setFeedback(() => {
            return val ? val : null
        })
        setEmail(() => value);
    }

    async function sendForgotPasswordHandler() {
        isSubmitting.current = true;
        try{
            if(!email) return;
            const res = await forgotPassword.mutateAsync(email);
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
            isSubmitting.current = false;
        }
    }

    function showLoginHandler(){
        navigate("/login");
    }


    return (
        <ForgotPasswordTemplateWrapper>
            <ForgotPasswordTemplateTop>
                <Logo />
            </ForgotPasswordTemplateTop>

            <ForgotPasswordForm>
                <AuthHeader>
                    <h3>Forgot password</h3>
                    <p>Enter email associated with the account.</p>
                </AuthHeader>
                <div>
                    <label>Email</label>
                    <input type="email" style={{borderColor: feedback ? 'red' : ''}} value={email} onChange={changeHandler} name="email" placeholder="Enter your email" />
                    {feedback && <i><MdInfo /> {feedback}</i>}
                </div>
                <p><span>Remember Password? <a onClick={showLoginHandler}>Login</a></span> </p>

                <section>
                    <button
                    onClick={sendForgotPasswordHandler}
                    >
                        {
                            isSubmitting.current ? <CircularLoader size={20} /> : <span>Send email</span>
                        }
                    </button>
                </section>
            </ForgotPasswordForm>
        </ForgotPasswordTemplateWrapper>
    )
}




import styled from "styled-components";
import { MdInfo } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { ChangeEvent, useRef, useState } from "react";
import {toast} from "react-toastify";

import Logo from "../../../components/Logo";
import Regex from "../../../utils/Regex";
import {CircularLoader} from "../../../components";
import { useForgotPassword } from "../../../store/mutations/user";



const ForgotPasswordTemplateWrapper = styled.div`
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

const ForgotPasswordForm = styled.div`
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

const ForgotPasswordTemplateTop = styled.div``;

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



export default ForgotPasswordTemplate;