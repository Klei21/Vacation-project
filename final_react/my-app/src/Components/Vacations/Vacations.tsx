import { fetchVacations, addLike, delLike, deleteVacations } from "../../api/vctApi";
import { useEffect, useState } from "react";
import { IVacation } from "../../models/Idea";
import { useNavigate } from "react-router-dom"
import { getCurrentUser } from "../../api/authApi";
import CSS from "./Vacations.module.css";

export function Vacations() {
    const [vacations, setVacations] = useState<IVacation[]>([]);
    const [isActivated, setIsActivated] = useState<{ [key: number]: boolean }>({});
    const [admin, setAdmin] = useState<boolean>(false);
    const [user, setUser] = useState<boolean>(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);  
    const [vacationToDelete, setVacationToDelete] = useState<number | null>(null);
    const navigate = useNavigate();
    
    const redirectToNewVct = () => {
        navigate(`/New-Vacation`);
    };

    function redirectToEdit(vacationId: number) {
        navigate(`/updatevacations/${vacationId}`);
    };

    function handleDeleteClick(vacationId: number) {
        setVacationToDelete(vacationId);
        setShowConfirmModal(true);
    }

    function handleConfirmDelete() {
        if (vacationToDelete !== null) {
            deleteVacations(vacationToDelete);
            setVacations(prevVacations => prevVacations.filter(vacation => vacation.vacation_id !== vacationToDelete));
            setShowConfirmModal(false); 
        }
    }

    function handleCancelDelete() {
        setShowConfirmModal(false); 
    }

    useEffect(() => {
        async function fetchVacationsData() {
            const user = getCurrentUser();
            if (user?.role_id === 1) {
                setAdmin(false);
                if (!user){
                    setUser(false)
                }
                else{
                    setUser(true)
                }
            }
            else if(!user){
                navigate('/Login')
            }
            else {
                setAdmin(true);
                setUser(true)
            }
            const vcts = await fetchVacations();
            if (user) {
                vcts.map((vacation: any) => {
                    if (vacation.ids && vacation.ids.includes(user.id)) {
                        setIsActivated(prev => ({
                            ...prev,
                            [vacation.vacation_id]: true
                        }))
                    }
                })

            }
            setVacations(vcts);
        }
        fetchVacationsData();
    }, []);

    async function sumLike(vacation_id: number, user_id: number) {
        await addLike(user_id, vacation_id);
        const vcts = await fetchVacations();
        setVacations(vcts);
    }

    async function lessLike(vacation_id: number, user_id: number) {
        await delLike(user_id, vacation_id);
        const vcts = await fetchVacations();
        setVacations(vcts);
    }

    const handleButtonClick = (vacationId: number, isActivated: boolean) => {
        const user = getCurrentUser();
        if (user) {
            console.log('User:', user.email);
        }
        if (!user) {
            alert("You must be logged in to like a vacation");
            return;
        }
        else {
            if (isActivated === false) {
                sumLike(vacationId, user.id);
            } else {
                lessLike(vacationId, user.id);
            }
        }
    };

    return (
        <div className={CSS.vctContainer}>
            {vacations.map((vacation) => {
                vacation.since = new Date(vacation.since);
                vacation.till = new Date(vacation.till);
                const sinceFormatted = vacation.since.toLocaleDateString('es-ES');
                const tillFormatted = vacation.till.toLocaleDateString('es-ES');
                return (
                    <div className={CSS.vctCard} key={vacation.vacation_id}>
                        {admin && <button className={CSS.btnadm} onClick={() => redirectToEdit(vacation.vacation_id)}>✒️ Edit</button>}
                        {admin && <button className={CSS.btnadm1} onClick={() => handleDeleteClick(vacation.vacation_id)}>🗑️Delete</button>}
                        <img src={vacation.img} alt={vacation.description} className={CSS.imgs} />
                        <h2>{vacation.vacation_id}. {vacation.country}</h2>
                        <p className={CSS.traveling}>{sinceFormatted} - {tillFormatted}</p>
                        <div> {vacation.description} </div>
                        <div>folder: {vacation.foldername}</div>
                        <div> price: ₪{vacation.price}</div>
                        <br/>
                        {user && !admin && <button className={`${CSS.btnlike} ${isActivated[vacation.vacation_id] ? CSS.btnlikeActive : ''}`}
                            onClick={() => {
                                handleButtonClick(vacation.vacation_id, isActivated[vacation.vacation_id] || false);
                                setIsActivated(prev => ({
                                    ...prev,
                                    [vacation.vacation_id]: !prev[vacation.vacation_id]
                                }));
                            }}
                        >
                            👍 {vacation.likes}
                        </button>}
                    </div>
                );
            })}

            {admin && <button className={CSS.btn2} onClick={redirectToNewVct}>Create Vacation</button>}
            {user && <button className={CSS.btn} onClick={() => navigate('/myvacations')}>My Vacations</button>}

            {showConfirmModal && (
                <div className={CSS.modal}>
                    <div className={CSS.modalContent}>
                        <p>Sure you want to DELETE this vacation?</p>
                        <button onClick={handleConfirmDelete}>YES</button>
                        <button onClick={handleCancelDelete}>NO</button>
                    </div>
                </div>
            )}
        </div>
    );
}
