const CreateForum = ({closeModal}: ICreateForum) => {
    const isCreating = useRef(false);
    const flag = useRef(true);
    const {isAuth} = useGlobalContext();
    const navigate = useNavigate();
    const [formstate, setFormstate] = useState({
        title: '',
        category: '',
        message: ''
    })
    const [feedback, setFeedback] = useState({
        title: '',
        category: '',
        message: ''
    })
    const topicCreator = useCreateTopic();

    useEffect(() => {
        if(flag.current && !isAuth){
            setTimeout(async () => {
                await showLoginHandler()
            }, 2000);
            flag.current = false;
        }
    }, [])

    function showLoginHandler(){
        document.getElementById("login__backdrop")!.style.display = 'block';
    }

    function changeHandler(e: ChangeEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>): void{
        const {name, value} = e.target;
        if(name === 'title'){
            let val = '';
            if(!Regex.isValidForumTitle(value))  val = 'Invalid forum title';
            setFeedback((old) => {
                return {
                    ...old,
                    [name]:  val
                }
            })
        }else if(name === 'message'){
            let val = '';
            if(!Regex.isValidMessage(value)) val = 'Message must be atleast 20 characters';
            setFeedback((old) => {
                return {
                    ...old,
                    [name]:  val
                }
            })
        }
        setFormstate(old => {
            return {
                ...old,
                [name]: value
            }
        })
    }

    async function createTopicHandler(){
        isCreating.current = true;
        try{
            if(!isAuth) navigate("/login");
            const res = await topicCreator.mutateAsync({...formstate, category: formstate.category as Category});
            console.log({res});
            const data = await res.data;
            if(!data.success) throw new Error(data.message);
            toast(data.message);
            closeModal();
        }catch(e: any){
            toast(e.message, {type: 'error'});
        }finally {
            isCreating.current = false;
        }
    }

    return (
        <Backdrop>
            <CreateForumWrapper>
                <motion.span whileHover={{scale: 1.2, color: 'red'}} transition={{duration: 0.8, type: 'tween'}}>
                    <MdClear onClick={closeModal} />
                </motion.span>
                <CreateForumTop>
                    <Logo />
                </CreateForumTop>
                <CreateForumForm>
                    <div>
                        <label>Title</label>
                        <input type="title" style={{borderColor: feedback["title"] ? 'red' : ''}} value={formstate.title} onChange={changeHandler} name="title" placeholder="What's the title" />
                        {feedback["title"] && <motion.i initial={{opacity: 0, x: -100}} transition={{stiffness: 0.5}} exit={{opacity: 0, x: -100}} animate={{opacity: 1, x:0}}><MdInfo /> {feedback["title"]}</motion.i>}
                    </div>
                    <div>
                        <label>Category</label>
                        <select value={formstate.category} onChange={changeHandler} name="category" style={{ borderColor: categories.find(c => c.name === formstate.category)?.color ?? ''}}>
                            <option value="">Pick a category</option>
                            {
                                categories.map((c, i) => (<option key={i} value={c.name}>{c.name}</option>))
                            }
                        </select>
                    </div>
                    <div>
                        <label>Message</label>
                        <textarea rows={5} style={{borderColor: feedback["message"] ? 'red' : ''}} value={formstate.message} onChange={changeHandler} name="message" placeholder="Enter your message" />
                        {feedback["message"] && <motion.i initial={{opacity: 0, x: -100}} transition={{stiffness: 0.5}} animate={{opacity: 1, x:0}} exit={{opacity: 0, x: -100}}><MdInfo /> {feedback["message"]}</motion.i>}
                    </div>
                    <section>
                        <motion.button
                        onClick={createTopicHandler}
                        whileHover={{scale: 1.1}}
                        transition={{stiffness: 0.5, type:'inertia'}}
                        disabled={!!feedback.message || !!feedback.category || !!feedback.title || isCreating.current}
                        >
                            {
                                isCreating.current ? <Loader /> : <span>Create Discussion</span>
                            }
                        </motion.button>
                    </section>
                </CreateForumForm>
            </CreateForumWrapper>
        </Backdrop>
    )
}



import styled from "styled-components";
import {motion} from "framer-motion";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { MdClear, MdInfo } from "react-icons/md";
import {toast} from "react-toastify";

import Backdrop from "../../components/Backdrop";
import Logo from "../../components/Logo";
import Loader from "../../components/Loader";
import Regex from "../../utils/Regex";
import { categories } from "../../components/Sidebar";
import Category from "../../types/Category";
import { useCreateTopic } from "../../store/mutations/topic";
import { useGlobalContext } from "../../contexts/GlobalContext";
import { useNavigate } from "react-router-dom";


type ICreateForum = {
    closeModal: () => void
}


const CreateForumForm = styled.div`
    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    gap: 20px;
    margin-top: 40px;

    > div {
        width: 100%;
        display:flex;
        gap: 5px;
        flex-direction: column;

        > label {
            font-size: 0.85rem;
            font-weight: 600;
        }

        > input, select, textarea {
            line-height: 2;
            padding: 4px;
            outline: none;
            border: 1px solid ${props => props.theme.secondary.dark};
            border-radius: 4px;
            transition: all 0.6s ease-out;
        }

        > select {
            padding: 8px;
            text-transform: capitalize;
        }

        >textarea {
            resize: none;
        }

        > i {
            display: flex;
            align-items: center;
            font-size: 0.7rem;
            gap: 3px;
            color: red;

            > svg {
                font-size: 0.9rem;
            }
        }
    }

    > section {
        width: 100%;

        > button {
            width: 100%;
            background-color: ${props => props.theme.primary.main};
            border: none;
            color: ${props => props.theme.secondary.main};
            padding: 10px;
            border-radius: 4px;
            cursor: pointer;
            opacity: 1;

            &:disabled {
                cursor: not-allowed;
                opacity: 0.5;
            }
        }
    }
`;
const CreateForumWrapper = styled(motion.div)`
    background-color: ${props => props.theme.secondary.main};
    width: min(100% - 0.5rem, 500px);
    margin-inline: auto;
    margin-top: 100px;
    padding: 20px;
    border-radius: 8px;
    position: relative;
    box-shadow: 0px 2px 5px #ccc;
    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    > span {
        position: absolute;
        top: 20px;
        right: 20px;
        cursor: pointer
    }
`;

const CreateForumTop = styled(motion.div)``;


export default CreateForum;