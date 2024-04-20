const GithubButton = () => {
    const {data} = useGithubLogin();
    async function socialLoginHandler(){
        const res = data?.data;
        const url = res?.data?.url;
        window.localStorage.setItem(SOCIAL_AUTH_PROVIDER, 'github');
        window.location.href = url;
    }
    return (
        <WGitHubButton onClick={socialLoginHandler}>
            <FaGithub />
            <span>Github</span>
        </WGitHubButton>
    )
}



import styled from "styled-components";
import { motion } from "framer-motion"
import { FaGithub } from "react-icons/fa";

import { useGithubLogin } from "../../../store/queries/user";
import { SOCIAL_AUTH_PROVIDER } from "../../../constants";

const WGitHubButton = styled(motion.button)`
    background-color: ${props => props.theme.secondary.main};
    color: ${props => props.theme.dark.main};
    border: 2px solid ${props => props.theme.dark.main};
    border-radius: 4px;
    padding: 6px 20px;
    display: flex;
    align-items: center;
    gap: 15px;
    cursor: pointer;

    
    &:hover {
        color: ${props => props.theme.secondary.main};
        background-color: ${props => props.theme.dark.main};
    }
    > svg {
        font-size: 1.25rem;
    }
`;



export default GithubButton;