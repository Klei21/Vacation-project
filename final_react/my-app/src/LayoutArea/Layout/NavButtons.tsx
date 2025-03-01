import { useNavigate } from "react-router-dom";
import styles from './Layout.module.css';
import { getCurrentUser } from "../../api/authApi";

export function NavButtons(): JSX.Element {
    const navigate = useNavigate();
    const user = getCurrentUser()
    const redirectToLogin = () => {
        navigate("/Login");
    };

    const redirectToRegister = () => {
        navigate("/Register");
    };

    const logout=()=>{
        localStorage.clear()
        window.location.reload()
        navigate('/Login')
    }

    const redirecttomyuser = () => {
        navigate("/myuser")
    }

    const botones = () => {
        if (!user) {
            return (
            <><button className={styles.btn} onClick={redirectToLogin}>Login</button><button className={styles.btn2} onClick={redirectToRegister}>Register</button></> 
        )
        }
        else {
            return(<>
            <button className={styles.btn} onClick={logout}>Logout</button>
            <button className={styles.myuserbutton} onClick={redirecttomyuser}> Welcome {user?.lastname}, {user?.firstname}</button>
            </>
            )
        }
    }
    return (
        <div>
            {botones()}
        </div>
    );
}
