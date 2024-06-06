const ForgotPasswordTemplate = ({main=false}: {main?: boolean}) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [feedback, setFeedback] = useState<string|null>(null);
    const [submitting, setSubmitting] = useState(false);
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
        setSubmitting(() => true);
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
            setSubmitting(() => false);
        }
    }

    function showLoginHandler(){
        navigate("/login");
    }


    return (
        <ForgotPasswordTemplateWrapper $main={main}>
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
                    disabled={submitting || !!feedback || !email}
                    >
                        {
                            submitting ? <CircularLoader size={20} /> : <span>Send email</span>
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
import { ChangeEvent, useState } from "react";
import {toast} from "react-toastify";

import Logo from "../../../components/Logo";
import Regex from "../../../utils/Regex";
import {CircularLoader} from "../../../components";
import { useForgotPassword } from "../../../store/mutations/user";
import { LoginForm } from "../../Login/components/LoginTemplate";



const ForgotPasswordTemplateWrapper = styled.div<{$main: boolean}>`
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

const ForgotPasswordForm = styled(LoginForm)`
`;

const ForgotPasswordTemplateTop = styled.div``;

const AuthHeader = styled.div`
    gap: 10px;
    margin-bottom: 10px;
    color: ${props => props.theme.dark.main};
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