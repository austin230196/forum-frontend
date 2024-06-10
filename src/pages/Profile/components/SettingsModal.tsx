const SettingsModal = ({close}: {close: () => void}) => {
    const store = useGlobalContext();
    const settings = useStore(store as StoreApi<GlobalState>, (state) => state?.userdata?.settings);
    const userdata = useStore(store as StoreApi<GlobalState>, (state) => state?.userdata?.userdata);
    const [twoFA, setTwoFA] = useState(settings ? settings?.twoFA : false);
    const [showEnableDialog, setShowEnableDialog] = useState(false);
    const [showDisableDialog, setShowDisableDialog] = useState(false);
    const [showChangePassword, setShowChangePassword] = useState(false);


    useEffect(() => {
        console.log("UPDATED SETTINGS");
        if(settings){
            setTwoFA(() => settings?.twoFA);
        }
    }, [settings])

    function changeSwitchHandler(){
        if(twoFA) setShowDisableDialog(() => true);
        else setShowEnableDialog(() => true);
    }

    function hideShowDisableDialog(){
        setShowDisableDialog(() => false);
    }

    function hideShowEnableDialog(){
        setShowEnableDialog(() => false);
    }

    function showChangePasswordHandler(){
        setShowChangePassword(() => true);
    }

    function hideChangePasswordHandler(){
        console.log("REACHED HERE");
        setShowChangePassword(() => false);
    }

    return (
        <Modal header="Settings" close={close}>
            <SettingsTile>
                <h5>Security</h5>
                <SettingsControls>
                    <SettingsControl>
                        {showEnableDialog ? <EnableGoogleAuthenticator cancel={hideShowEnableDialog} /> : null}
                        {showDisableDialog ? <DisableGoogleAuthenticator cancel={hideShowDisableDialog} /> : null}
                        <p>Google authenticator</p>
                        <span>
                            <Switch checked={twoFA} onChange={changeSwitchHandler} inputProps={{ 'aria-label': 'controlled' }} />
                        </span>
                    </SettingsControl>
                    {
                        userdata?.accountType === 'manual' 
                        ?
                        (
                            <SettingsButton onClick={showChangePasswordHandler}>
                                {showChangePassword ? <ChangePassword close={hideChangePasswordHandler} /> : null}
                                <p>Change Password</p>
                                <span><AiOutlineArrowRight /> </span>
                            </SettingsButton>
                        ) : null
                    }
                </SettingsControls>
            </SettingsTile>
            <SettingsTile>
                <h5>Notifications</h5>
                <SettingsControls>
                    <SettingsControl>
                        <p>Promotions</p>
                        <span>
                            <Switch checked={false} disabled inputProps={{ 'aria-label': 'controlled' }} />
                        </span>
                    </SettingsControl>
                    <SettingsControl>
                        <p>Topics</p>
                        <span>
                            <Switch checked={false} disabled inputProps={{ 'aria-label': 'controlled' }} />
                        </span>
                    </SettingsControl>
                </SettingsControls>
            </SettingsTile>
        </Modal>
    )
}



import styled from "styled-components"
import { Switch } from "@mui/material";
import { useEffect, useState } from "react";

import {EnableGoogleAuthenticator, DisableGoogleAuthenticator} from "./GoogleAuthenticatorDialog";
import Modal from "../../../components/Modal";
import { StoreApi, useStore } from "zustand";
import { useGlobalContext } from "../../../contexts/GlobalContext";
import { GlobalState } from "../../../contexts/store";
import { AiOutlineArrowRight } from "react-icons/ai";
import ChangePassword from "./ChangePassword";

const SettingsTile = styled.div`
    width: 100%;

    > h5 {
        margin-bottom: 10px;
    }
`;
const SettingsControls = styled.ul`
    list-style-type: none;
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 10px;
    color: ${props => props.theme.dark.main};
`;
const SettingsControl = styled.li`
    display: flex;
    padding-left: 10px;
    align-items: center;
    justify-content: space-between;
    
    > p {
        font-size: 0.9rem;
    }
`
const SettingsButton = styled(SettingsControl)`
    padding-right: 10px;
    cursor: pointer;
    padding: 10px;
    border-radius: 8px;

    &:hover {
        background-color: ${props => props.theme.backdrop.main};
    }

    > span {
        color: ${props => props.theme.dark.light};
    }
`;



export default SettingsModal;