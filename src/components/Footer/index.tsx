import { Link } from "react-router";
import styles from "./styles.module.css"

export function Footer(){
    return (
        <footer className={styles.footer}>
            <Link to="/about-pomodoro"> Entenda como funciona a técnica Pomodoro </Link>
            <Link to="/"> Pomome &copy; {new Date().getFullYear()} - Feito com ❤️ </Link>
        </footer>
    );
}