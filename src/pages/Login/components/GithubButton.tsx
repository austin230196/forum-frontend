const GithubButton = ({disabled=false}: IAuthButton) => {
    const queryClient = useQueryClient();
    async function socialLoginHandler(){

        const res = await queryClient.fetchQuery(getGithubLoginURL());
        const url = res?.data?.url;
        window.localStorage.setItem(SOCIAL_AUTH_PROVIDER, 'github');
        window.location.href = url;
    }
    return (
        <WGitHubButton disabled={disabled} onClick={socialLoginHandler}>
            <FaGithub />
            <span>Github</span>
        </WGitHubButton>
    )
}



import styled from "styled-components";
import { FaGithub } from "react-icons/fa";
import { useQueryClient } from "@tanstack/react-query";

import { getGithubLoginURL } from "../../../store/queries/user";
import { SOCIAL_AUTH_PROVIDER } from "../../../constants";
import { IAuthButton } from "./LoginTemplate";


const WGitHubButton = styled.button`
    background-color: ${props => props.theme.secondary.main};
    color: ${props => props.theme.dark.main};
    border: 2px solid ${props => props.theme.dark.main};
    border-radius: 4px;
    padding: 6px 20px;
    display: flex;
    align-items: center;
    gap: 15px;
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
        font-size: 1.25rem;
    }
`;



export default GithubButton;