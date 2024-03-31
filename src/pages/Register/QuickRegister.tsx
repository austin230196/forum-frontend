const QuickRegister = ({}) => (
    // <AnimatePresence>
        <Backdrop id="register__backdrop" style={{display: 'none'}}>
            <RegisterTemplate />
        </Backdrop>
    // </AnimatePresence>
)


import { AnimatePresence } from "framer-motion";

import Backdrop from "../../components/Backdrop";
import RegisterTemplate from "./components/RegisterTemplate";


export default QuickRegister;