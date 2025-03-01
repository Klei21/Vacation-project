import { fetchUsers, getCurrentUser } from "../../api/authApi";
import { useEffect,useState } from "react";
import { IUser } from "../../models/Idea";
import CSS from "./User.module.css";
import { useNavigate } from "react-router-dom";

export function Users(){
    const [users,setUsers] = useState<IUser[]>([]);
    const navigate = useNavigate()
    useEffect(()=>{
        async function fetchUsersData(){
            const user = getCurrentUser()
            if (!user){
                navigate("/Login")
            }
            const users = await fetchUsers();
            setUsers(users);
        }
        fetchUsersData();
    },[])
    return(
        <div className={CSS.userContainer}>
            {users.map((user)=>{
                return(
                    <div className={CSS.userCard}key={user.id}>
                        <div>ID: {user.id}</div>
                        <div>{user.lastname}, {user.firstname}</div>
                        <div className={CSS.mail}> {user.email}</div>
                        <br/>
                    </div>
                )
            })}
        </div>
    )
}