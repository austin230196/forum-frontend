const QuickLogin = ({}) => (
    // <AnimatePresence>
        <Backdrop id="login__backdrop" style={{display: 'none'}}>
            <LoginTemplate />
        </Backdrop>
    // </AnimatePresence>
)


import { AnimatePresence } from "framer-motion";

import LoginTemplate from "./components/LoginTemplate";
import Backdrop from "../../components/Backdrop";


export default QuickLogin;