const Details = () => {
    const params = useParams();
    // const _ = useNavigate();

    console.log({params});
    //Now search the database with the params.id
    return (
        <MainLayout showSidebar={false} showSearchBar={false}>
            <DetailsWrapper>
                <DetailsInfo>
                    <span>
                        <FaComment />
                        <p>{10}</p>
                    </span>
                    <span>
                        <FaUserPlus />
                        <p>{2000}</p>
                    </span>
                </DetailsInfo>

                <DetailsMain>
                    <h1>This is the post</h1>
                    <DetailsBody>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis ad nisi totam, tempore ut earum exercitationem, dicta autem, iste est quam. Tempore vel aspernatur neque temporibus ducimus magni. Iure, fuga.</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis ad nisi totam, tempore ut earum exercitationem, dicta autem, iste est quam. Tempore vel aspernatur neque temporibus ducimus magni. Iure, fuga.</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis ad nisi totam, tempore ut earum exercitationem, dicta autem, iste est quam. Tempore vel aspernatur neque temporibus ducimus magni. Iure, fuga.</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis ad nisi totam, tempore ut earum exercitationem, dicta autem, iste est quam. Tempore vel aspernatur neque temporibus ducimus magni. Iure, fuga.</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis ad nisi totam, tempore ut earum exercitationem, dicta autem, iste est quam. Tempore vel aspernatur neque temporibus ducimus magni. Iure, fuga.</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis ad nisi totam, tempore ut earum exercitationem, dicta autem, iste est quam. Tempore vel aspernatur neque temporibus ducimus magni. Iure, fuga.</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis ad nisi totam, tempore ut earum exercitationem, dicta autem, iste est quam. Tempore vel aspernatur neque temporibus ducimus magni. Iure, fuga.</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis ad nisi totam, tempore ut earum exercitationem, dicta autem, iste est quam. Tempore vel aspernatur neque temporibus ducimus magni. Iure, fuga.</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis ad nisi totam, tempore ut earum exercitationem, dicta autem, iste est quam. Tempore vel aspernatur neque temporibus ducimus magni. Iure, fuga.</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis ad nisi totam, tempore ut earum exercitationem, dicta autem, iste est quam. Tempore vel aspernatur neque temporibus ducimus magni. Iure, fuga.</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis ad nisi totam, tempore ut earum exercitationem, dicta autem, iste est quam. Tempore vel aspernatur neque temporibus ducimus magni. Iure, fuga.</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis ad nisi totam, tempore ut earum exercitationem, dicta autem, iste est quam. Tempore vel aspernatur neque temporibus ducimus magni. Iure, fuga.</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis ad nisi totam, tempore ut earum exercitationem, dicta autem, iste est quam. Tempore vel aspernatur neque temporibus ducimus magni. Iure, fuga.</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis ad nisi totam, tempore ut earum exercitationem, dicta autem, iste est quam. Tempore vel aspernatur neque temporibus ducimus magni. Iure, fuga.</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis ad nisi totam, tempore ut earum exercitationem, dicta autem, iste est quam. Tempore vel aspernatur neque temporibus ducimus magni. Iure, fuga.</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis ad nisi totam, tempore ut earum exercitationem, dicta autem, iste est quam. Tempore vel aspernatur neque temporibus ducimus magni. Iure, fuga.</p>
                    </DetailsBody>
                </DetailsMain>
            </DetailsWrapper>
        </MainLayout>
    )
}



import styled from "styled-components";
import { useParams } from "react-router-dom";

import MainLayout from "../../layout/MainLayout";
import { FaComment } from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa6";



const DetailsWrapper = styled.div`
    display: grid;
    grid-template-columns: 150px 1fr;
    gap: 40px;
    height: 100%;
    margin-inline: auto;
    overflow-y: hidden;

    @media screen and (max-width: 768px){
        grid-template-columns: 1fr;
        gap: 10px;
    }
`;
const DetailsInfo = styled.div`
    // background-color: ${props => props.theme.secondary.light};
    border-radius: 16px;
    padding: 20px;
    padding-top: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;
    color: ${props => props.theme.dark.main};

    > span {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;

        > svg {
            font-size: 2rem;
        }
    }

    @media screen and (max-width: 768px){
        flex-direction: row;
        padding-top: 20px;
        padding-left: 40px;
        gap: 40px;
    }
`;
const DetailsMain = styled.div`
    width: 100%;
    padding: 20px;
    padding-top: 30px;
    overflow-y: hidden;

    > h1 {
        margin-bottom: 15px;
    }
`;
const DetailsBody = styled.div`
    width: 100%;
    padding: 20px;
    height: 100%;
    padding-top: 40px;
    overflow-y: scroll;
`;

export default Details;