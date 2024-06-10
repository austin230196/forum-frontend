const MainLayout = ({children, showSidebar=true, showSearchBar=true}: IMainLayout) => {
    return (
        <MainLayoutWrapper $showSidebar={showSidebar}>
            {showSidebar ? <Sidebar /> : null}
            <MainLayoutBody>
                <Nav showLogo={!showSidebar} showSearchBar={showSearchBar} />
                <MainLayoutContent>
                    {children}
                </MainLayoutContent>
            </MainLayoutBody>
            <MainLayoutFooter>
                <p>Programmables</p> | <span>{new Date().getFullYear()}</span>
            </MainLayoutFooter>
        </MainLayoutWrapper>
    )
}


type IMainLayout = {
    children: ReactNode;
    showSidebar?: boolean;
    showSearchBar?: boolean;
};

import styled from "styled-components"
import { ReactNode } from "react";


import Sidebar from "../components/Sidebar"
import Nav from "../components/Nav"


const MainLayoutFooter = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 20px;
    background-color: ${props => props.theme.secondary.light};
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    font-size: 0.8rem;
    letter-spacing: 0.4px;
    color: ${props => props.theme.dark.main};
`;
const MainLayoutWrapper = styled.div<{$showSidebar: Boolean}>`
    width: 100%;
    height: 100%;
    min-height: 100vh;
    display: grid;
    grid-template-columns: ${props => props.$showSidebar ? '300px 1fr' : '1fr'};
    background-color: ${props => props.theme.secondary.main};


    @media screen and (max-width:875px){
        grid-template-columns: ${props => props.$showSidebar && '100px 1fr !important'};
        gap: 20px;
    }

    @media screen and (max-width:595px){
        grid-template-columns: ${props => props.$showSidebar && '1fr !important'};
        grid-template-rows: ${props => props.$showSidebar && '100px 1fr !important'};
        gap: 0px;
    }
`;
const MainLayoutBody = styled.div`
    width: 100%;
    height: 100vh;
    overflow-y: hidden;
    max-width: 1200px;
    margin-inline: auto;
    padding-inline: 20px;
    padding-bottom: 200px;
    
`;
const MainLayoutContent = styled.div`
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    margin-top: 10px;

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