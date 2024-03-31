const Login = ({}) => (
    <AnimatePresence>
        <LoginWrapper>
            <LoginTemplate canClose={false} />
        </LoginWrapper>
    </AnimatePresence>
)


import { AnimatePresence } from "framer-motion";
import styled from "styled-components";

import LoginTemplate from "./components/LoginTemplate";


const LoginWrapper = styled.div`
    // background-color: ${props => props.theme.secondary.dark};
`;


export default Login;