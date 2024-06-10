const Nav = ({showLogo=false, showSearchBar}: INav) => {
    const queryClient = new QueryClient();
    const [showDropdown, setShowDropDown] = useState(false);
    const store = useGlobalContext();
    const userdata = useStore(store as StoreApi<GlobalState>, (state) => state?.userdata?.userdata);
    const logout = useLogout();
    const [loading, setLoading] = useState(true);
    const theme = useStore(store as StoreApi<GlobalState>, (state) => state.theme);
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const clearer = useRef<number|null>(null);
    const [searchResults, setSearchResults] = useState<ITopic[]|null>(null);

    useEffect(() => {
        (async() => {
            try{
                await store?.getState().updateUserdata();
            }catch(e: any){
                // toast(e.message, {type: 'error'})
            }finally {
                setLoading(() => false);
            }
        })()
    }, [])

    async function searchTopicsHandler(searchStr: string){
        try{
            console.log({searchStr});
            const res = await queryClient.fetchQuery(searchTopics(searchStr));
            console.log({res});
            if(!res?.success) throw new Error(res?.message);
            setSearchResults(() => res?.data);
        }catch(e: any){
            toast(e.message, {type: 'error'})
        }
    }

    function changeHandler(e: ChangeEvent<HTMLInputElement>){
        setSearch(() => e.target.value);
        if(!clearer.current){
            clearer.current = setTimeout(async() => {
                await searchTopicsHandler(e.target.value);
                clearer.current = null;
            }, 2000);
        }
    }

    function toggleThemeHandler(){
        store?.getState().toggleTheme();
    }

    function toggleDropdown(){
        setShowDropDown(old => !old);
    }

    async function logoutHandler() {
        setLoading(() => true);
        try{
            await logout.mutateAsync();
            window.localStorage.removeItem(STORE_KEY);
            setTimeout(() => {
                navigate("/login");
            }, 1000);
        }catch(e: any){
            toast(e.message, {
                type: 'error'
            })
        }finally {
            setLoading(() => false);
        }
    }

    return (
        <NavWrapper $showLogo={showLogo}>
            <QuickLogin />
            <QuickRegister />
            {showLogo ? <Logo /> : null}
            {
                showSearchBar ? 
                (
                    <SearchInput>
                        <FiSearch />
                        <input type="text" placeholder="Search forum.." value={search} onChange={changeHandler} />
                        {
                            searchResults !== null ? searchResults?.length ? 
                            (
                                <SearchResults>
                                    {
                                        searchResults?.map((t, i) => (
                                            <SearchResult key={i}>
                                                <p>{t?.title}</p>
                                                <span>{t?.message?.substring(0, 70) + '....'}</span>
                                            </SearchResult>
                                        ))
                                    }
                                </SearchResults>
                            ) : 
                            (
                                <SearchResults>
                                    <h4>No results.</h4>
                                </SearchResults>
                            ) : null
                        }
                    </SearchInput>
                ) : null
            }
            <NavRight>
                {/* <Bell>
                    <span></span>
                    <FaBell />
                </Bell> */}
                <ThemeController onClick={toggleThemeHandler}>
                    {
                        theme === 'light' ? <BiMoon /> : <BiSun />
                    }
                </ThemeController>
                <span onClick={toggleDropdown}>
                    <Avatar width={40} height={40} image={userdata?.avatar!} />
                    {
                        showDropdown ? 
                        (
                            userdata ? 
                            (<section>
                                <li>
                                    <NavLink to="/profile"><CgProfile />  Profile</NavLink>
                                </li>
                                <li>
                                    <a onClick={logoutHandler}><RiLogoutCircleLine />  Logout</a>
                                </li>
                            </section>) : 
                            (<section>
                                <li>
                                    <NavLink to="/login"><RiLoginCircleLine />  Login</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/register"><SiGnuprivacyguard />  Register</NavLink>
                                </li>
                            </section>)
                        ) : null
                    }
                </span>
            </NavRight>
        </NavWrapper>
    )
}


import styled from "styled-components"
// import { FaBell } from "react-icons/fa";
import { SiGnuprivacyguard } from "react-icons/si";
import { FiSearch } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { RiLogoutCircleLine, RiLoginCircleLine } from "react-icons/ri";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import Avatar from "./Avatar"
import QuickLogin from "../pages/Login/QuickLogin";
import QuickRegister from "../pages/Register/QuickRegister";
import { useGlobalContext } from "../contexts/GlobalContext";
import Logo from "./Logo";
import { useLogout } from "../store/mutations/user";
import { toast } from "react-toastify";
import { STORE_KEY } from "../constants";
import { StoreApi, useStore } from "zustand";
import { GlobalState } from "../contexts/store";
import { BiMoon, BiSun } from "react-icons/bi";
import { QueryClient } from "@tanstack/react-query";
import { searchTopics } from "../store/queries/topic";
import { ITopic } from "../types/Topic";

type INav = {
    showLogo: boolean;
    showSearchBar: boolean
}



const SearchResult = styled.div`
    padding: 10px;
    border-radius: 8px;
    cursor: pointer;
    border: 1px solid ${props => props.theme.secondary.dark};

    &:hover {
        background-color: ${props => props.theme.secondary.light};
    }
    
    > p {
        font-weight: 600;
        margin-bottom: 5px;
    }

    > span {
        font-size: 0.7rem;
    }
`;
const SearchResults = styled.div`
    position: absolute;
    top: 45px;
    right: 0;
    left: 0;
    z-index: 1200;
    background-color: ${props => props.theme.secondary.main};
    color: ${props => props.theme.dark.main};
    display: flex;
    flex-direction: column;
    gap: 5px;
    max-height: 25vh;
    overflow-y: scroll;

    > h4 {
        text-align: center;
        margin-block: 10px;
    }
`;
const ThemeController = styled.span`
    font-size: 2rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px;
    border-radius: 50px;
    color: ${props => props.theme.dark.main};

    &:hover {
        background-color: ${props => props.theme.backdrop.main};
    }
`;
const SearchInput = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    position: relative;
    width: 60%;
    padding: 5px;
    border-radius: 4px;
    padding-left: 10px;
    background-color: ${props => props.theme.secondary.light};
    color: ${props => props.theme.dark.main};

    > input {
        outline: none;
        line-height: 2;
        border: none;
        flex: 1;
        text-indent: 10px;
        background-color: ${props => props.theme.secondary.main};
        color: ${props => props.theme.dark.main};
    }
`;
const NavWrapper = styled.nav<{$showLogo: Boolean}>`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    gap: 30px;
    padding-block: ${props => props.$showLogo ? '20px' : '40px'};
    @media screen and (max-width:595px){
        padding-bottom: 10px;
        padding-top: 5px;
    }
`;
const NavRight = styled.div`
    display: flex;
    align-items: center;
    gap: 15px;

    > span {
        position: relative;

        > section {
            position: absolute;
            top: 100%;
            right: 0px;
            background-color: ${props => props.theme.secondary.main};
            box-shadow: 0px 2px 5px #ccc;
            list-style-type: none;
            border-radius: 8px;
            z-index: 101;
            
            > li {
                cursor: pointer;
                padding: 5px 15px;
                line-height: 3;
                width: 100%;
                transition: all 0.6s ease-out;
                border-radius: 8px;

                &:hover {
                    background-color: ${props => props.theme.primary.main};
                }
            }
            
            a {
                text-decoration: none;
                font-size: 0.8rem;
                font-weight: 600;
                color: ${props => props.theme.dark.main};
                transition: all 0.6s ease-out;
                display: flex;
                align-items: center;
                gap: 10px;
                
                &:hover {
                    color: ${props => props.theme.secondary.main};
                }
                
                > svg {
                    font-size: 1rem;
                }
            }

        }
    }
`;
// const Bell = styled.span`
//     position: relative;
//     cursor: pointer;
    
//     > span {
//         width: 6px;
//         height: 6px;
//         background-color: red;
//         border-radius: 50%;
//         position: absolute;
//         right: 2px;
//         top: -2px;
//     }

//     > svg {
//         font-size: 1.2rem;
//         color: ${props => props.theme.secondary.light}
//     }
// `;


export default Nav;