import axios from "axios";
import { IUser } from "../models/Idea";


export const login = async (email:string, password: string) => {
    const response = await axios.post("http://127.0.0.1:5000/login",{ email, password });
    const user: IUser = response.data[1];
    localStorage.setItem("token", response.data[0]);
    localStorage.setItem("user", JSON.stringify(user));
    return response.data
}


export const register = async (email: string, password: string, first_name: string, last_name: string) => {
    const response = await axios.post("http://127.0.0.1:5000/register", { email, password, first_name, last_name });
    return response.data
}

export const fetchUsers = async (): Promise<IUser[]> => {
    const response = await axios.get("http://127.0.0.1:5000/users");
    return response.data
}

export const getCurrentUser = (): IUser | null => {
    const userStr = localStorage.getItem("user");
    if (!userStr || userStr === "undefined") {
        return null;
    }
    
    try {
        const user = JSON.parse(userStr);
        const iuser:IUser = {
            id: user.user.id,
            email: user.user.email,
            firstname: user.user.firstname,
            lastname: user.user.lastname,
            role_id: user.user.role_id,
        }
        if (isValidUser(iuser)) {
            return iuser;
        } else {
            console.warn('User data in localStorage is invalid');
            return null;
        }
    } catch (error) {
        console.error('Error parsing user from localStorage:', error);
        return null;
    }
}

const isValidUser = (user: any): user is IUser => {
    return user && typeof user === 'object' && 'id' in user && 'firstname' in user; // Ajusta esta validación según tu modelo
}

export const getToken = (): string | null => {
    return localStorage.getItem("token");
}

export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
}

export const conectVacation = async (user_id:number, vct_id: number) => {
    const response = await axios.post("http://127.0.0.1:5000/conection", { user_id, vct_id });
    return response.data
}

export const disconectVacation = async (user_id:number, vct_id: number) => {
    const response = await axios.delete("http://127.0.0.1:5000/delconection", { data: { user_id, vct_id } });
    return response.data
}

export const all_likes = async () => {
    const response = await axios.get("http://127.0.0.1:5000/likes")
    return response.data
}