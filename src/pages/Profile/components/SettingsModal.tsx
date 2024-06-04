const SettingsModal = ({close}: {close: () => void}) => {
    return (
        <Modal header="Settings" close={close}>
            <SettingsTile>
                <h5>Security</h5>
                <SettingsControls>
                    <SettingsControl>
                        <p>Two factor authentication</p>
                        <span>
                            <Switch />
                        </span>
                    </SettingsControl>
                </SettingsControls>
            </SettingsTile>
        </Modal>
    )
}



import styled from "styled-components"
import Modal from "../../../components/Modal";
import { Switch } from "@mui/material";


const SettingsTile = styled.div`
    width: 100%;

    > h5 {
        margin-bottom: 10px;
    }
`;
const SettingsControls = styled.ul`
    list-style-type: none;
    padding-left: 10px;
`;
const SettingsControl = styled.li`
    display: flex;
    align-items: center;
    justify-content: space-between;

    > p {
        font-size: 0.9rem;
    }
`



export default SettingsModal;