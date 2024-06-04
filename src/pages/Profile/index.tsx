
const Profile = () => {
    const store = useGlobalContext();
    const userdata = useStore(store as StoreApi<GlobalState>, (state) => state?.userdata);
    const inputRef = useRef<HTMLInputElement>(null);
    const [preview, setPreview] = useState<string|null>(null);
    const [file, setFile] = useState<File|null>(null);
    const [showSettings, setShowSettings] = useState(false);
    const uploadFile = useUploadFile();

    console.log({userdata});
    function triggerUpload(){
        inputRef.current?.click();
    }

    function previewProfileAvatar(e: ChangeEvent<HTMLInputElement>){
        let f = (e.target.files as FileList)[0];
        setPreview(() => URL.createObjectURL(f));
        setFile(() => f);
    }


    function showSettingsHandler(){
        setShowSettings(() => true);
    }

    function hideSettingsHandler(){
        setShowSettings(() => false);
    }

    async function uploadFileHandler(){
        let reader = new FileReader();
        reader.onload = async e => {
            console.log({e});
            const result: ArrayBuffer | null | string | undefined = e.target?.result;
            console.log({result});
            //now we send this data to the backend in chunk
            // let totalLength = (result! as ArrayBuffer).byteLength;
            const res = await uploadFile.mutateAsync({
                filesize: file?.size!,
                filename: file?.name!,
                file: result as ArrayBuffer
            })
            console.log({res});
            await store?.getState().updateUserdata();
        }
        reader.readAsArrayBuffer(file!);
        setFile(() => null);
    }
    return (
        <MainLayout showSidebar={false}>
            {
                showSettings ? <SettingsModal  close={hideSettingsHandler}  /> : null
            }
            <ProfileWrapper>
                <ProfileLayout>
                    <span onClick={showSettingsHandler}><IoSettings /></span>
                    <ProfileInfo>
                        <section>
                            <ProfileAvatar src={preview ? preview : userdata?.avatar ? userdata?.avatar : avatar} alt="Avatar" />
                            <input type="file" style={{display: "none"}} accept="image/*" onChange={previewProfileAvatar} ref={inputRef} />
                            <span onClick={triggerUpload}>
                                <MdEdit />
                            </span>
                            {file ? 
                            (<span className="upload" onClick={uploadFileHandler}>
                                <FaFileUpload />
                            </span>) : null}
                        </section>
                        <h3>{userdata?.name}</h3>
                    </ProfileInfo>
                    <ProfileForm>
                        <FormContainer>
                            <label>Account Type</label>
                            <input type="text" value={userdata?.accountType?.toLocaleUpperCase()} readOnly />
                        </FormContainer>
                        <FormContainer>
                            <label>Your Email</label>
                            <input type="email" value={userdata?.email} readOnly />
                        </FormContainer>
                        <FormContainer>
                            <label>Phone Number</label>
                            <input type="text" value="(214) 9803 2345" readOnly />
                        </FormContainer>
                    </ProfileForm>
                </ProfileLayout>
            </ProfileWrapper>
        </MainLayout>
    )
}
    
    
    

import styled from "styled-components"
import { IoSettings } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import { FaFileUpload } from "react-icons/fa";

import MainLayout from "../../layout/MainLayout"
import { useGlobalContext } from "../../contexts/GlobalContext";
import avatar from "../../assets/images/avatar.jpeg";
import { ChangeEvent, useRef, useState } from "react";
import { useUploadFile } from "../../store/mutations/user";
import { StoreApi, useStore } from "zustand";
import { GlobalState } from "../../contexts/store";
import SettingsModal from "./components/SettingsModal";


const ProfileWrapper = styled.div`
    width; 100%;
    height: 100%;
`;

const ProfileLayout = styled.div`
    width: min(100% - 0.25rem, 550px);
    margin-inline: auto;
    box-shadow: 0px 2px 5px #ccc;
    border-radius: 16px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
    justify-content: center;
    position: relative;

    svg {
        color: ${props => props.theme.primary.main};
    }

    > span {
        position: absolute;
        padding: 10px;
        border-radius: 8px;
        box-shadow: 1px 2px 5px #ccc;
        top: 20px;
        right: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.6s ease-out;

        &:hover {
            scale: 1.04;
        }

        > svg {
            font-size: 1.3rem;
        }
    }
`;

const ProfileInfo = styled.div`
    margin-top: 70px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;

    > h3 {
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }

    > section {
        position: relative;

        > span {
            position: absolute;
            padding: 10px;
            border-radius: 8px;
            box-shadow: 1px 2px 5px #ccc;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.6s ease-out;
            bottom: 20px;
            right: 0px;

            &.upload {
                bottom: 20px;
                left: 0px;
                right: calc(100% - 43px);
            }

            
            &:hover {
                scale: 1.04;
            }
    
            > svg {
                font-size: 1.3rem;
            }
        }
    }
`;

const ProfileAvatar = styled.img`
    width: 220px;
    height: 220px;
    border-radius: 50%;
`;

const ProfileForm = styled.div`
    margin-block: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
    width: min(100% - 0.25rem, 450px);
`;

const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 7px;
    width: 100%;

    > label {
        font-size: 0.8rem;
        font-weight: 600;
    }

    > input {
        width: 100%;
        // border: none;
        padding: 4px;
        border-radius: 8px;
        line-height: 2;
    }
`;




export default Profile;