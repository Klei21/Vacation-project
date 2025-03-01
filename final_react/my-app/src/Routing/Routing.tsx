import {  Routes, Route } from 'react-router-dom';
import { Home } from '../Components/Home/Home';
import { Register } from '../Components/Register/Register';
import {Login} from '../Components/Login/Login';
import { Vacations } from '../Components/Vacations/Vacations';
import { Users } from '../Components/User/User';
import { NewVacation } from '../Components/Vacations/NewVacation/NewVacation';
import { MyVacations } from '../Components/Vacations/MyVacations';
import { LinkVacations } from '../Components/Vacations/LinkVacation';
import { UpdateVacation } from '../Components/Vacations/UpdateVacations/UpdateVacation';
import ErrorPage from '../Components/Error/Error'
import Grafics from '../Components/Statistics/Statistics';
import Myuser from '../Components/MyUser/Myuser';

export function Routing(): JSX.Element {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/Register" element={<Register />} />
                <Route path="/Vacations" element={<Vacations />} />
                <Route path="/Users" element={<Users />} />
                <Route path="/New-Vacation" element={<NewVacation />} />
                <Route path="/myvacations" element={<MyVacations />} />
                <Route path="/linkvacations" element={<LinkVacations />} />
                <Route path="/updatevacations/:id" element={<UpdateVacation />} />
                <Route path="/Grafics" element={<Grafics />} />
                <Route path="/MyUser" element={<Myuser />} />
                <Route path="*" element={<ErrorPage />} />

            </Routes>
        </div>
    );
};