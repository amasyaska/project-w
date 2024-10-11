import Button from "@components/Button";

import styles from "./Header.module.css";
import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header className={styles.header}>
            <Link to="/" className={styles.h}>
                <h1>Womchat:</h1>
                <h2>[слово не горобець, вилетить - не спіймаєш]</h2>
            </Link>
            <nav>
                <Button to="/about">Про нас</Button>
                {/* <Button to="/settings">Налаштування</Button> */}
                <Button to="/logout">Вийти</Button>
            </nav>
        </header>
    );
}
