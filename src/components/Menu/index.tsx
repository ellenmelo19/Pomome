import { HistoryIcon, HouseIcon, MoonIcon, SettingsIcon, SunIcon } from "lucide-react";
import styles from "./styles.module.css"
import { useState,useEffect } from "react";

type AvailableThemes = 'dark' | 'light';

export function Menu() {
    const [theme, setTheme] = useState<AvailableThemes>(() => {
        const storedTheme = localStorage.getItem("theme") as AvailableThemes || 'dark';
        return storedTheme;
    });

    const nextThemeIcon = {
        dark: <SunIcon />,
        light: <MoonIcon />
    }

    function handleThemeChange(event : React.MouseEvent<HTMLAnchorElement>) {
        event.preventDefault();
        
        setTheme((prevTheme) => {
            const nextTheme = prevTheme === 'dark' ? 'light' : 'dark';
            return nextTheme;
        });
        
    }

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);  
        localStorage.setItem("theme", theme); 
    }, [theme]);

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
                {nextThemeIcon[theme]}
            </a>
        </nav>
    );
}