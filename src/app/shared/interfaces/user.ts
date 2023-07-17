export interface IUserReq {
    name: string,
    surname: string,
    email: string,
    tel: string,
    role: ROLE,
    birthday?: string
}

export interface IUser extends IUserReq {
    id: string
}

export enum ROLE {
    USER = 'USER',
    ADMIN = 'ADMIN'
}