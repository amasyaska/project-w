import {useState} from "react";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlusCircle, faUserCircle} from '@fortawesome/free-solid-svg-icons'

import styles from "./Header.module.css";
import useAuth from "@hooks/auth.ts";

// Мотивашки для користувачів
const SPLASHES = [
    "На волонтерах тримається світ!",
    "Волонтерство це круто!",
    "Твоя допомога - внесок у майбутнє!",
    "Маленькими кроками до великих змін!",
    "Твій час може змінити чиєсь життя",

    "Щось щось, вомбати 😎",
    "Потужно!!",
];

function getRandomSplash() {
    return SPLASHES[Math.floor(Math.random() * SPLASHES.length)];
}

export default function Header() {
    const {user} = useAuth();
    const [splash] = useState(getRandomSplash);

    return <header className={styles.header}>
        <div className={styles.center}>
            <Link to="/">
                <img src="/assets/text-logo.svg" alt="logo"/>
            </Link>
        </div>
        <div className={styles.splash}>
            {splash}
        </div>
        <div className={styles.right}>
            {user && <Link to={"/creation"} className={styles.createButton}>
                <FontAwesomeIcon icon={faPlusCircle}/>
            </Link>}
            <Link to={"/profile"} className={styles.account}>
                <FontAwesomeIcon icon={faUserCircle}/>
            </Link>
        </div>
    </header>;
}
