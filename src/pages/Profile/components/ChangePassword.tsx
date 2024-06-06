const ChangePassword = ({close}: IChangePassword) => {
    const changePassword = useChangePassword();
    const navigate = useNavigate();
    const [submitting, setSubmitting] = useState(false);
    const [formstate, setFormstate] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    })
    const [feedback, setFeedback] = useState<{newPassword: string|null; oldPassword: string|null; confirmPassword: string|null}>({
        oldPassword: null,
        newPassword: null,
        confirmPassword: null
    })

    function changeHandler(e: ChangeEvent<HTMLInputElement>): void{
        const {value, name} = e.target;
        let val = '';
        if(name === 'newPassword'){
            if(!Regex.isValidPassword(value)) val = 'Password must be atleast 6 characters';
        }else if(name === 'confirmPassword'){
            if(formstate.newPassword !== value) val = 'Passwords don\'t match';
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
    

    async function changePasswordHandler(){
        setSubmitting(() => true);
        try{
            if(!formstate.oldPassword.trim() || !formstate.newPassword.trim() || !formstate.confirmPassword.trim()) throw new Error("All input fields are required");
            if(formstate.newPassword !== formstate.confirmPassword) throw new Error("Passwords don't match");
            const data = {
                oldPassword: formstate.oldPassword,
                newPassword: formstate.newPassword
            }
            const res = await changePassword.mutateAsync(data);
            console.log({res});
            if(!res?.success) throw new Error(res?.message);
            toast(res?.message, {type: 'success'});
            window.localStorage.removeItem(STORE_KEY);
            setTimeout(() => {
                navigate("/login");
            }, 1000);
        }catch(e: any){
            toast(e.message, {type: 'error'})
        }finally{
            setSubmitting(() => false);
        }
    }

    return (
        <Modal header="Change Password" close={close}>
            <Wrapper>
                <ChangePasswordForm>
                    <div>
                        <label>Old Password</label>
                        <input type="password" style={{borderColor: feedback.oldPassword ? 'red' : ''}} value={formstate.oldPassword} onChange={changeHandler} name="oldPassword" placeholder="Enter your old password" />
                        {feedback.oldPassword && <i><MdInfo /> {feedback.oldPassword}</i>}
                    </div>
                    <div>
                        <label>New Password</label>
                        <input type="password" style={{borderColor: feedback.newPassword ? 'red' : ''}} value={formstate.newPassword} onChange={changeHandler} name="newPassword" placeholder="Enter your new password" />
                        {feedback.newPassword && <i><MdInfo /> {feedback.newPassword}</i>}
                    </div>
                    <div>
                        <label>Confirm New Password</label>
                        <input type="password" style={{borderColor: feedback.confirmPassword ? 'red' : ''}} value={formstate.confirmPassword} onChange={changeHandler} name="confirmPassword" placeholder="Confirm your new password" />
                        {feedback.confirmPassword && <i><MdInfo /> {feedback.confirmPassword}</i>}
                    </div>
                    <section>
                        <button
                        disabled={submitting || !!feedback.oldPassword || !!feedback.newPassword || !!feedback.confirmPassword || !formstate.confirmPassword || !formstate.newPassword || !formstate.oldPassword}
                        onClick={changePasswordHandler}
                        >
                            {
                                submitting ? <CircularLoader size={20} /> : <span>Change Password</span>
                            }
                        </button>
                    </section>
                </ChangePasswordForm>
            </Wrapper>
        </Modal>
    )
}



import styled from "styled-components"

import Modal from "../../../components/Modal"
import { LoginForm } from "../../Login/components/LoginTemplate"
import { ChangeEvent, useState } from "react"
import { MdInfo } from "react-icons/md";
import Regex from "../../../utils/Regex";
import { CircularLoader } from "../../../components";
import { toast } from "react-toastify";
import { useChangePassword } from "../../../store/mutations/user";
import { STORE_KEY } from "../../../constants";
import { useNavigate } from "react-router-dom";


type IChangePassword = {
    close: () => void;
}


const Wrapper = styled.div`
    width: 100%;
`;
const ChangePasswordForm = styled(LoginForm)`
    margin-top: 15px;
`;


export default ChangePassword;