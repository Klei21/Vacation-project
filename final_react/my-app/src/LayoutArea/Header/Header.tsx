import { Link } from "react-router-dom"
import css from "./Header.module.css"
export function Sidebar(): JSX.Element {
    return (
        <div>
            <nav className={css.Menu}>
                <div className={css.menuList}>
                    <p><Link className={css.link} to="/">Home</Link></p>
                    <p><Link className={css.link} to="/Vacations">Vacations</Link></p>
                    <p><Link className={css.link} to="/Users">Users</Link></p>
                </div>
            </nav>
        </div>

    )
}
