const GoogleButton = ({disabled=false, complete}: IAuthButton) => {
    const queryClient = useQueryClient();
    const location = useLocation();
    const navigate = useNavigate()

    const registerSocialCallback = useRegisterSocialUser()
    const loginSocialCallback = useLoginSocialUser()

    let windowObjectReference: WindowProxy|null = null;
    let previousUrl: string|null = null;

    const openSignInWindow = (url: string, name: string) => {
    // remove any existing event listeners
        window.removeEventListener('message', receiveMessage);

        // window features
        const strWindowFeatures =
            'toolbar=no, menubar=no, width=600, height=700, top=100, left=100';

        if (windowObjectReference === null || windowObjectReference.closed) {
            /* if the pointer to the window object in memory does not exist
            or if such pointer exists but the window was closed */
            windowObjectReference = window.open(url, name, strWindowFeatures);
        } else if (previousUrl !== url) {
            /* if the resource to load is different,
            then we load it in the already opened secondary window and then
            we bring such window back on top/in front of its parent window. */
            windowObjectReference = window.open(url, name, strWindowFeatures);
            windowObjectReference?.focus();
        } else {
            /* else the window reference must exist and the window
            is not closed; therefore, we can bring it back on top of any other
            window with the focus() method. There would be no need to re-create
            the window or to reload the referenced resource. */
            windowObjectReference.focus();
        }

        // add the listener for receiving a message from the popup
        window.addEventListener('message', event => receiveMessage(event), false);
        // assign the previous URL
        previousUrl = url;
    };

    const receiveMessage = async (event: any) => {
        // Do we trust the sender of this message? (might be
        // different from what we originally opened, for example).
        if (event.origin !== import.meta.env.VITE_BASE_NAME)return;
        const { data } = event;
        // if we trust the sender and the source is our popup
        if (data?.includes("code")) {
            window.removeEventListener('message', receiveMessage);
            //get data 
            const params = new URLSearchParams(data);
            const code = params.get("code");
            if(location.pathname === "/login" || complete){
                //log user in
                const res = await loginSocialCallback.mutateAsync({provider: 'google', code: code!})
                let d = res.data;
                if(d.status === "error") return toast.error(d.message)
                else return await complete!(d);
            }else if (location.pathname === "/register" || !complete) {
                const fcmToken = await getFCMToken();
                const res = await registerSocialCallback.mutateAsync({provider: 'google', code: code!, fcmToken});
                
                let d = res.data;
                if(d.status !== "success") return toast.error(d.message)
                else {
                    //success full
                    toast.success("Account created successfully")
                    navigate("/user/welcome")
                }
            }
        }
    };
    
    async function socialLoginHandler(){
        const res = await queryClient.fetchQuery(getGoogleLoginURL());
        const url = res?.data?.url;
        openSignInWindow(url, 'google');
    }

    return (
        <WGoogleButton disabled={disabled} onClick={socialLoginHandler}>
            <FaGoogle />
            <span>Google</span>
        </WGoogleButton>
    )
}



import styled from "styled-components";
import { FaGoogle } from "react-icons/fa";
import { useQueryClient } from "@tanstack/react-query";

import { getGoogleLoginURL } from "../../../store/queries/user";
import { IAuthButton } from "./LoginTemplate";
import { useLocation, useNavigate } from "react-router-dom";
import { useLoginSocialUser, useRegisterSocialUser } from "../../../store/mutations/user";
import getFCMToken from "../../../utils/get-fcm-token.utils";
import { toast } from "react-toastify";


const WGoogleButton = styled.button`
    background-color: ${props => props.theme.secondary.main};
    color: ${props => props.theme.dark.main};
    border: 2px solid ${props => props.theme.dark.main};
    border-radius: 4px;
    padding: 6px 20px;
    display: flex;
    align-items: center;
    gap: 20px;
    cursor: pointer;
    opacity: 1;

    &:hover {
        color: ${props => props.theme.secondary.main};
        background-color: ${props => props.theme.dark.main};
    }

    &:disabled {
        cursor: not-allowed;
        opacity: 0.6;
    }

    > svg {
        font-size: 1.5rem;
    }
`;



export default GoogleButton;