import { BrowserRouter } from "react-router-dom";
import { Routing } from "../../Routing/Routing";
import styles from './Layout.module.css';
import { Sidebar } from "../Header/Header";
import { NavButtons } from "./NavButtons";
export function Layout(): JSX.Element {
  document.title = "WanderLike";
  return (
    <BrowserRouter>
    <NavButtons/>
      <div className={styles.Layout}>
        <header>
        <Sidebar />
        </header>
        <menu>
          <Routing />
        </menu>
      </div>
    </BrowserRouter>

  );
}