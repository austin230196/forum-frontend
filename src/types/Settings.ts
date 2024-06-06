export type ISettings = {
    _id: number;
    user: string;
    twoFA: boolean;
    notifications: any[];
    createdAt: Date;
    twoFASecret: string
}