// src/components/SettingsForm.js
import { useEffect, useState } from 'react';
import { IUser } from '../../models/Idea';
import { getCurrentUser } from '../../api/authApi';
import { useNavigate } from 'react-router-dom';
import CSS from "./Myuser.module.css"
const Myuser = () => {
    const [user, setUser] = useState<IUser | null>(null);
    const navigate = useNavigate()
    useEffect(() => {
        const myuser = getCurrentUser()
        if (!myuser) {
            navigate("/login")
        }
        if (myuser !== null) {
            setUser(myuser)
        }
    }, [])

    return (
        <div className={CSS.usercard}>
            <h1>Your information</h1>
            <div>
                <h2>User ID:{user?.id}</h2>
            </div>
            <div>
                <h2>Name:</h2>
                <p>{user?.lastname}, {user?.firstname}</p>
            </div>
            <div>
                <h2>Email:</h2>
                    <p>{user?.email}</p>
            </div>
        </div>
    );
};

export default Myuser;