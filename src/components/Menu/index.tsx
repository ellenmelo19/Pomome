import { HistoryIcon, HouseIcon, SettingsIcon, SunIcon } from "lucide-react";
import styles from "./styles.module.css"
import { useState } from "react";

type AvailableThemes = 'dark' | 'light';

export function Menu() {
    const [theme, setTheme] = useState<AvailableThemes>('dark');

    function handleThemeChange(event : React.MouseEvent<HTMLAnchorElement>) {
        event.preventDefault();
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
    }

    return (
        <nav className={styles.menu}>
            <a className ={styles.menuLink} href="#" aria-label="Home" title="Home">
                <HouseIcon  />
            </a>
            <a className ={styles.menuLink} href="#" aria-label="Ver Histórico" title="Ver Histórico">
                <HistoryIcon  />
            </a>
            <a className ={styles.menuLink} href="#" aria-label="Configurações" title="Configurações">
                <SettingsIcon  />
            </a>
            <a className ={styles.menuLink} href="#" aria-label="Mudar Tema" title="Mudar Tema"
                onClick={handleThemeChange}>
                <SunIcon  />
            </a>
        </nav>
    );
}