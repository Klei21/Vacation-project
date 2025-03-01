import { useState } from 'react';
import CSS from './Login.module.css';
import { login, getCurrentUser } from '../../api/authApi';
import { useNavigate } from 'react-router-dom';

export function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null);

        if (!email || !password) {
            setError("Email and password are required");
            localStorage.removeItem("user")
            localStorage.removeItem("token")
            return;
        }
        try {
            const response = await login(email, password);
            console.log(response);
            const user = getCurrentUser();
            if (!user || user === null) {
                setError("Login failed - Please try again");
                localStorage.removeItem("user")
                localStorage.removeItem("token")
                return;
            }

            console.log("Login successful:", user);

            navigate('/vacations');
            window.location.reload();

        } catch (err) {
            console.error('Login error:', err);
            setError("Invalid email or password");
            alert("Error: " + "Invalid email or password");
        }
    };

    return (
        <div className={CSS.cardcontainer}>
            <div className={CSS.updcard}>
                <h2>Login</h2>
                <form onSubmit={handleSubmit} id='loginForm'>
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

                    <button className={CSS.btn} type="submit">Login</button>
                    {error && <div className={CSS.error}>{error}</div>}
                    <div className={CSS.registerLink}>
                        <a href="http://localhost:5173/register">You are new here? Click here</a>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
