import { get_my_vacations } from "../../api/vctApi";
import { getCurrentUser } from "../../api/authApi";
import { useEffect, useState } from "react";
import { IVacation } from "../../models/Idea";
import CSS from "./Vacations.module.css";
import { useNavigate } from 'react-router-dom';

export function MyVacations() {
    const [vacations, setVacations] = useState<IVacation[]>([]);
    const [, setError] = useState<boolean>(false);
    const user = getCurrentUser();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchMyVacations() {
            if (user) {
                const vcts = await get_my_vacations(user.id);
                if (vcts && Array.isArray(vcts)){
                    setVacations(vcts);
                    setError(false);
                } else {
                    setVacations([]);
                    setError(true);
                }
            }
        }
        fetchMyVacations();
    }, []);

    return (
        <div className={CSS.vctContainer}>
            {Array.isArray(vacations) && vacations.length === 0 ? (
                <div className={CSS.noVacations}>
                    <h2>You have no vacations yet</h2>
                    <p>Add some to your list!</p>
                </div>
            ) : (
                Array.isArray(vacations) && vacations.map((v: IVacation) => {
                    v.since = new Date(v.since);
                    v.till = new Date(v.till);
                    const sinceFormatted = v.since.toLocaleDateString('es-ES');
                    const tillFormatted = v.till.toLocaleDateString('es-ES');
                    return <div className={CSS.vctCard} key={v.vacation_id}>
                        <img src={v.img} alt={v.country} className={CSS.imgs}/>
                        <h2>{v.vacation_id}. country: {v.country}</h2>
                        <div>{v.description}</div>
                        <div>Since: {sinceFormatted}</div>
                        <div>Until: {tillFormatted}</div>
                        <div>price: ₪{v.price}</div>
                    </div>
                })
            )}
            <button className={CSS.btn} onClick={() => navigate('/linkvacations')}>
                Add vacation to your list
            </button>
        </div>
    )
}