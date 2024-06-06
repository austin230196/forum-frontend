const UpdatePassword = () => {
    const location = useLocation();
    const search = location.search.split("=")[1];
    console.log({search});
    return(
        <UpdatePasswordWrapper>
            <UpdatePasswordTemplate main />
        </UpdatePasswordWrapper>
    )
}



import { useLocation } from "react-router-dom";
import styled from "styled-components"

import UpdatePasswordTemplate from "./components/UpdatePasswordTemplate";
import { LoginWrapper } from "../Login";


const UpdatePasswordWrapper = styled(LoginWrapper)``;



export default UpdatePassword;