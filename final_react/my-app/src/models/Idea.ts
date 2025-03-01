export interface IUser{
    id: number;
    email: string;
    lastname: string;
    firstname: string;
    role_id: number;
}

export interface IVacation{
    vacation_id: number;
    country_id: number;
    description: string;
    since: Date | string;
    till: Date | string;
    price: number;
    foldername: string;
    likes: number | null;
    ids:string
    img:string
    country:string
}

export interface ILikes{
    likes:number
}