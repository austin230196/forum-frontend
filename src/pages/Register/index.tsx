const Login = ({}) => (
    <AnimatePresence>
        <RegisterWrapper>
            <RegisterTemplate canClose={false} />
        </RegisterWrapper>
    </AnimatePresence>
)


import { AnimatePresence } from "framer-motion";
import styled from "styled-components";

import RegisterTemplate from "./components/RegisterTemplate";


const RegisterWrapper = styled.div`
    // background-color: ${props => props.theme.secondary.dark};
`;


export default Login;