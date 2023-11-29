export interface IsUser{
    isuser:boolean;
}

export interface IsSubscriber{
    issubscriber:boolean;
}

export interface IsAdmin{
    isadmin:boolean;
}

export interface loginvm{
    username:string;
    email:string;
    role:string;
}

export interface User{
    username:string,
    email:string,
    roles?:string[]
}