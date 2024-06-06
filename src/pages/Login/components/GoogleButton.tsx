const GoogleButton = ({disabled=false}: IAuthButton) => {
    const queryClient = useQueryClient();
    async function socialLoginHandler(){
        const res = await queryClient.fetchQuery(getGoogleLoginURL());
        const url = res?.data?.url;
        window.localStorage.setItem(SOCIAL_AUTH_PROVIDER, 'google');
        window.location.href = url;
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

import { getGoogleLoginURL } from "../../../store/queries/user";
import { SOCIAL_AUTH_PROVIDER } from "../../../constants";
import { useQueryClient } from "@tanstack/react-query";
import { IAuthButton } from "./LoginTemplate";

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