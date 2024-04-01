const GoogleButton = () => {
    return (
        <WGoogleButton>
            <FaGoogle />
            <span>Google</span>
        </WGoogleButton>
    )
}



import styled from "styled-components";
import { motion } from "framer-motion"
import { FaGoogle } from "react-icons/fa";

const WGoogleButton = styled(motion.button)`
    background-color: ${props => props.theme.secondary.main};
    color: ${props => props.theme.dark.main};
    border: 2px solid ${props => props.theme.dark.main};
    border-radius: 4px;
    padding: 6px 20px;
    display: flex;
    align-items: center;
    gap: 20px;
    cursor: pointer;

    &:hover {
        color: ${props => props.theme.secondary.main};
        background-color: ${props => props.theme.dark.main};
    }

    > svg {
        font-size: 1.5rem;
    }
`;



export default GoogleButton;