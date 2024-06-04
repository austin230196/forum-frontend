const QuickRegister = ({}) => (
    <Backdrop id="register__backdrop" style={{display: 'none'}}>
        <RegisterTemplate />
    </Backdrop>
)


import Backdrop from "../../components/Backdrop";
import RegisterTemplate from "./components/RegisterTemplate";


export default QuickRegister;