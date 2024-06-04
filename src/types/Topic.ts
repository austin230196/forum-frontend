import ICategory from "./Category";
import Category from "./Category";
import { IFollower } from "./Follower";
import { IReply } from "./Reply";
import { IUserdata } from "./User";


export type ICreateTopic = {
    title: string, 
    message: string, 
    category: Category
}


export type ITopic = {
    _id: string;
    title: string;
    creator: IUserdata;
    category: ICategory;
    message: string;
    replies: IReply[];
    followers: IFollower[];
}