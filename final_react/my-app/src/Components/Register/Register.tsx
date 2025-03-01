import { useState } from 'react';
import CSS from './Register.module.css';
import { login, register } from '../../api/authApi';
import { useNavigate } from 'react-router-dom';

export function Register() {
    const [firstname, setFirstname] = useState<string>("");
    const [lastname, setLastname] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();

    // Función para validar el formato del correo electrónico
    const validateEmail = (email: string) => {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return regex.test(email);
    };

    // Función para manejar el envío del formulario
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null); // Reseteamos el error

        // Validamos el formato del correo electrónico antes de proceder
        if (!validateEmail(email)) {
            setError('The mail entered doesn´t have a valid format');
            return;
        }
        if (!password || password.length<4){
            setError("Your password must be at least 4 characters")
        }
        else{
            try {
            const response = await register(email, password, firstname, lastname);
            console.log(response);

            console.log("Registered successfully:", firstname);
            alert(`Welcome, ${firstname}!`);
            const user = login(email, password);
            console.log("Login successful:", user);
            localStorage.setItem("user", JSON.stringify(user));
            navigate('/vacations');
            window.location.reload();

        } catch (err) {
            console.error('Registration error:', err);
            setError("Invalid parameters");
        }
        }
        
    };

    return (
        <div className={CSS.cardcontainer}>
            <div className={CSS.updcard}>
                <h2>Register</h2>
                <form onSubmit={handleSubmit} id='registerForm'>
                    <div className={CSS.formgroup}>
                        <label htmlFor="firstname">First Name:</label>
                        <input
                            type="text"
                            id="firstname"
                            placeholder="First Name"
                            value={firstname}
                            onChange={(e) => setFirstname(e.target.value)}
                            required
                        />
                    </div>

                    <div className={CSS.formgroup}>
                        <label htmlFor="lastname">Last Name:</label>
                        <input
                            type="text"
                            id="lastname"
                            placeholder="Last Name"
                            value={lastname}
                            onChange={(e) => setLastname(e.target.value)}
                            required
                        />
                    </div>

                    <div className={CSS.formgroup}>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className={CSS.formgroup}>
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button className={CSS.btn} type="submit">Register</button>
                    {error && <div className={CSS.error}>{error}</div>}
                </form>
                <div className={CSS.loginLink}>
                    <a href="http://localhost:5173/Login">You already have an account? Click here</a>
                </div>
            </div>
        </div>
    );
}

export default Register;
