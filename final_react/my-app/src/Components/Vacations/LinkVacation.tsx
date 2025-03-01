import { fetchVacations, get_my_vacations } from "../../api/vctApi";
import { useEffect, useState } from "react";
import { IVacation } from "../../models/Idea";
import { getCurrentUser, conectVacation, disconectVacation } from "../../api/authApi";
import CSS from "./Vacations.module.css";

export function LinkVacations() {
    const [vacations, setVacations] = useState<IVacation[]>([]);
    const [isActivated, setIsActivated] = useState<{ [key: number]: boolean }>({});
    const user = getCurrentUser();

    useEffect(() => {
        async function fetchVacationsData() {
            try {
                const vcts = await fetchVacations();
                setVacations(vcts);

                if (user) {
                    const myvcts = await get_my_vacations(user.id);
                    const activatedMap = myvcts.reduce((acc: any, vct: { vacation_id: any; }) => ({
                        ...acc,
                        [vct.vacation_id]: true
                    }), {});
                    setIsActivated(activatedMap);
                }
            } catch (error) {
                console.error('Error fetching vacations:', error);
            }
        }
        fetchVacationsData();
    }, []);

    const handleButtonClick = async (vacationId: number) => {
        if (!user) {
            alert("You must be logged in to link to a vacation");
            return;
        }

        try {
            if (isActivated[vacationId]) {
                await disconectVacation(user.id, vacationId);
            } else {
                await conectVacation(user.id, vacationId);
            }
            
            const vcts = await fetchVacations();
            setVacations(vcts);
            setIsActivated(prev => ({
                ...prev,
                [vacationId]: !prev[vacationId],
            }));
        } catch (error) {
            console.error('Error handling connection:', error);
        }
    };

    const renderVacationCard = (vacation: IVacation) => {
        const sinceFormatted = new Date(vacation.since).toLocaleDateString('es-ES');
        const tillFormatted = new Date(vacation.till).toLocaleDateString('es-ES');

        return (
            <div className={CSS.vctCard} key={vacation.vacation_id}>
                <img src={vacation.img} alt={vacation.description} className={CSS.imgs} />
                <h2>ID:{vacation.vacation_id}- Country: {vacation.country}</h2>
                <div>{vacation.description}</div>
                <div>from: {sinceFormatted}</div>
                <div>until: {tillFormatted}</div>
                <div className={CSS.mail}>
                    price: ₪{vacation.price}, foldername: {vacation.foldername}
                </div>
                <button onClick={() => handleButtonClick(vacation.vacation_id)}>
                    {isActivated[vacation.vacation_id] ? 'Disconnect' : 'Connect'}
                </button>
            </div>
        );
    };

    return (
        <div className={CSS.vctContainer}>
            {vacations.map(renderVacationCard)}
        </div>
    );
}