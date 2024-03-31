const MainLayout = ({children, showSidebar=true}: IMainLayout) => {

    return (
        <MainLayoutWrapper $showSidebar={showSidebar}>
            {showSidebar ? <Sidebar /> : null}
            <MainLayoutBody>
                <Nav showLogo={!showSidebar} />
                <MainLayoutContent>
                    {children}
                </MainLayoutContent>
            </MainLayoutBody>
        </MainLayoutWrapper>
    )
}


type IMainLayout = {
    children: ReactNode;
    showSidebar?: Boolean;
};

import styled from "styled-components"
import { ReactNode } from "react";


import Sidebar from "../components/Sidebar"
import Nav from "../components/Nav"


const MainLayoutWrapper = styled.div<{$showSidebar: Boolean}>`
    width: 100%;
    height: 100%;
    min-height: 100vh;
    display: grid;
    grid-template-columns: ${props => props.$showSidebar ? '300px 1fr' : '1fr'};


    @media screen and (max-width:875px){
        grid-template-columns: ${props => props.$showSidebar && '100px 1fr !important'};
        gap: 20px;
    }
`;
const MainLayoutBody = styled.div`
    width: 100%;
    height: 100vh;
    overflow-y: hidden;
    max-width: 1200px;
    padding-inline: 20px;
    padding-bottom: 200px;
`;
const MainLayoutContent = styled.div`
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    margin-top: 50px;

    &::-webkit-scrollbar {
        /* Hide scrollbar for Chrome, Safari and Opera */
    
        display: none !important;
    
        /* Hide scrollbar for IE, Edge and Firefox */
        -ms-overflow-style: none !important;
        /* IE and Edge */
        scrollbar-width: none !important;
        /* Firefox */
    }
`;




export default MainLayout;