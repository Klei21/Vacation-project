import { Key, useEffect, useState } from "react";
import { fetchUsers, getCurrentUser, all_likes } from "../../api/authApi"
import { getVacationStatus } from "../../api/vctApi";
import { useNavigate } from "react-router-dom";
import { IUser, IVacation, ILikes } from "../../models/Idea";
import './Home.css';

export function Home(): JSX.Element {

    const [user, setUser] = useState<IUser | null>(null);
    const [ovct, setOvct] = useState<IVacation[]>([])
    const [fvct, setFvct] = useState<IVacation[]>([])
    const [evct, setEvct] = useState<IVacation[]>([])
    const [showOnvct, setShowOnvct] = useState(false)
    const [showFuvct, setShowFuvct] = useState(false)
    const [showEnvct, setShowEnvct] = useState(false)
    const [users, setUsers] = useState<IUser[]>()
    const [showUsers, setShowUsers] = useState(false)
    const [likes, setLikes] = useState<ILikes>();

    const navigate = useNavigate()
    useEffect(() => {
        async function fetchAllData() {
            try {
                const user = getCurrentUser()
                const prueba = await getVacationStatus()
                if (!user) {
                    navigate("/Login")
                    return;
                }
                const like: ILikes = await all_likes()
                const users = await fetchUsers()
                setLikes(like)
                setUser(user)
                setUsers(users)
                setEvct(prueba[0]["past"])
                setOvct(prueba[0]["ongoing"])
                setFvct(prueba[0]["future"])

            } catch (error) {
                console.error("Error fetching data:", error)
            }

        }
        fetchAllData();

    }, [])

    const handleOngoingClick = () => {
        setShowOnvct(!showOnvct);
    };

    const handleFutureClick = () => {
        setShowFuvct(!showFuvct);
    };

    const handleExpiredClick = () => {
        setShowEnvct(!showEnvct);
    };
    const handleUsersClick = () => {
        setShowUsers(!showUsers);
    };
    const handleVctsClick = () => {
        navigate("/Grafics")
    };

    return (
        <div className="homeContainer">
            <h1 className="Welcome">Welcome {user?.firstname} {user?.lastname}</h1>
            <p>Here you can see all the statistics about the vacations and users</p>

            <div className="vacation-sections">
                <div className="vacation-column">
                    <button onClick={handleOngoingClick}>Ongoing Vacations ({ovct.length})</button>
                    {showOnvct && (
                        <div className="vacation-box">
                            {ovct.map((vacation: IVacation, index: Key | null | undefined) => (
                                <div key={index}>
                                    <p>{vacation.vacation_id}) {vacation.country}</p>
                                    <p>-{new Date(vacation.since).toLocaleDateString()}- {new Date(vacation.till).toLocaleDateString()}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="vacation-column">
                    <button onClick={handleFutureClick}>Future Vacations ({fvct.length})</button>
                    {showFuvct && (
                        <div className="vacation-box">
                            {fvct.map((vacation: IVacation, index: Key | null | undefined) => (
                                <div key={index}>
                                    <p>{vacation.vacation_id}) {vacation.country}</p>
                                    <p>-{new Date(vacation.since).toLocaleDateString()}- {new Date(vacation.till).toLocaleDateString()}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="vacation-column">
                    <button onClick={handleExpiredClick}>Expired Vacations ({evct.length})</button>
                    {showEnvct && (
                        <div className="vacation-box">
                            {evct.map((vacation: IVacation, index: Key | null | undefined) => (
                                <div key={index}>
                                    <p>{vacation.vacation_id}) {vacation.country}</p>
                                    <p>-{new Date(vacation.since).toLocaleDateString()}- {new Date(vacation.till).toLocaleDateString()}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div>
                    <button className="vacation-column" onClick={handleUsersClick}>Users registered ({users?.length})</button>
                    {showUsers && (
                        <div className="vacation-box">
                            {users?.map((user: IUser, index: Key | null | undefined) => (
                                <div key={index}>
                                    <p>{user.id}) {user.lastname}, {user.firstname}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                
                <button className="vacation-column" onClick={handleVctsClick}> amount of likes: ({likes?.likes})</button>
            </div>

        </div>
    )
}