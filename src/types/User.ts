export type IRegister = {
    email: string, 
    password: string, 
    name: string
}


export type ILogin = {
    email: string, 
    password: string
}


export type IUserdata = {
    accountType: 'google' | 'manual' | 'twitter' | 'apple';
    avatar: string | null;
    createdAt: Date;
    email: string;
    name: string;
    updatedAt: string;
    id: string
}