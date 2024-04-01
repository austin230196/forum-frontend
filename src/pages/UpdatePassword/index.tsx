const UpdatePassword = () => {
    const location = useLocation();
    const search = location.search.split("=")[1];
    console.log({search});
    return(
        <UpdatePasswordWrapper>
            <UpdatePasswordTemplate />
        </UpdatePasswordWrapper>
    )
}



import { useLocation } from "react-router-dom";
import styled from "styled-components"

import UpdatePasswordTemplate from "./components/UpdatePasswordTemplate";


const UpdatePasswordWrapper = styled.div``;



export default UpdatePassword;