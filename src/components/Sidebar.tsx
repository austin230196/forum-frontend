const Sidebar = () => {
    // const showDiscussion = useRef(false);
    const [showCreate, setShowCreate] = useState(false);
    const location = useLocation();

    function hideCreateForumHandler(){
        setShowCreate(() => false);
    }

    function showStartDiscussion(){
        setShowCreate(() => true);
    }
    return (
        <SidebarWrapper>
            {
                showCreate && <CreateForum closeModal={hideCreateForumHandler} />
            }
            <Logo />
            <SidebarBody>
                <button onClick={showStartDiscussion}>
                    <pre><IoCreate /></pre>
                    <span>Start new Discussion</span>
                </button>
                <SidebarBodyTop>
                    <li>
                        <NavLink to="/">
                        <pre><IoIosChatbubbles /></pre>
                        <span>All discussions</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/follow">
                        <pre><FaStar /></pre>
                        <span>Following</span>
                        </NavLink>
                    </li>
                </SidebarBodyTop>
                <SidebarBodyMain>
                    {
                        categories.map(({color, name}, i) => (
                            <li key={i}>
                                <NavLink to={`?category=${name}`} className={location?.search?.split("=")[1] === name ? 'active__category' : ''}>
                                    <span style={{backgroundColor: color}}></span>
                                    {name}
                                </NavLink>
                            </li>
                        ))
                    }
                </SidebarBodyMain>
            </SidebarBody>
        </SidebarWrapper>
    )
}



import styled from "styled-components"
import { IoIosChatbubbles } from "react-icons/io";
import { FaStar } from "react-icons/fa";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import {NavLink} from "react-router-dom";
import { IoCreate } from "react-icons/io5";

import Logo from "./Logo"
import CreateForum from "../pages/CreateForum";


export const categories = [
    {
        color: "#4B8FE2",
        name: "general"
    },
    {
        color: "#F6728F",
        name: "news"
    },
    {
        color: "#56D58A",
        name: "sports"
    },
    {
        color: "#FFDC4C",
        name: "algorithms"
    },
    {
        color: "#BF81EC",
        name: "organization"
    },
    {
        color: "#888786",
        name: "project"
    }
]


const SidebarBodyMain = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 25px;
    padding-block: 50px;
    list-style-type: none;

    > li {
        width: 100%;
        > a {
            display: flex;
            align-items: center;
            text-decoration: none;
            gap: 10px;
            color: ${props => props.theme.dark.main};
            transition: all 0.5s ease-out;
            text-transform: uppercase;
            font-weight: 600;
            letter-spacing: 0.6px;

            > span {
                width: 10px;
                height: 10px;
                border-radius: 50px;
            }

            &:hover {
                color: ${props => props.theme.primary.main};
            }
        }

        >a.active__category {
            color: ${props => props.theme.primary.main};
        }
    }


    @media screen and (max-width:875px){
        display: none;
    }
`;
const SidebarBodyTop = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding-block: 50px;
    list-style-type: none;
    border-bottom: 1px solid ${props => props.theme.secondary.dark};

    > li {
        width: 100%;

        @media screen and (max-width:875px){
            display: flex;
            align-items: center;
            justify-content: center;
        }
        > a {
            display: flex;
            align-items: center;
            text-decoration: none;
            gap: 10px;
            color: ${props => props.theme.dark.main};
            transition: all 0.5s ease-out;


            @media screen and (max-width:875px){
                > span {
                    display: none;
                }

                > pre {
                    font-size: 1.75rem;
                }
            }

            &:hover {
                color: ${props => props.theme.primary.main};
                scale: 1.03;
            }
        }

        >a.active {
            color: ${props => props.theme.primary.main};
        }
    }

    @media screen and (max-width:875px){
        border-bottom: none;
    }

    
`
const SidebarWrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    padding: 20px 40px;

    @media screen and (max-width:875px){
        padding: 15px;
    }
`;
const SidebarBody = styled.div`
    margin-top: 50px;

    > button {
        width: 100%;
        background-color: ${props => props.theme.primary.main};
        border: none;
        padding: 10px;
        border-radius: 4px;
        color: #fff;
        font-weight: 500;
        font-size: 0.9rem;
        cursor: pointer;
        outline: none;
        display: flex;
        align-items: center;
        justify-content: center;

        &:hover {
            scale: 1.03;
        }

        > pre {
            display: none;
        }

        @media screen and (max-width:875px){
            > span {
                display: none;
            }

            > pre {
                display: block;
                font-size: 2rem;
            }
        }
    }
`;



export default Sidebar;