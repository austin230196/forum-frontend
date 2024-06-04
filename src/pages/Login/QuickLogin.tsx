const QuickLogin = ({}) => (
    <Backdrop id="login__backdrop" style={{display: 'none'}}>
        <LoginTemplate />
    </Backdrop>
)


import LoginTemplate from "./components/LoginTemplate";
import Backdrop from "../../components/Backdrop";


export default QuickLogin;