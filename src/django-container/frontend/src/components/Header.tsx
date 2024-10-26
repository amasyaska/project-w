import {useState} from "react";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faUserCircle} from '@fortawesome/free-solid-svg-icons'

import styles from "./Header.module.css";

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
    const [splash] = useState(getRandomSplash);

    return <header className={styles.header}>
        <div className={styles.center}>
            <Link to="/">
                <h1>Project W</h1>
            </Link>
        </div>
        <div className={styles.splash}>
            {splash}
        </div>
        <div className={styles.right}>
            <Link to={"/profile"} className={styles.account}>
                <FontAwesomeIcon icon={faUserCircle}/>
            </Link>
        </div>
    </header>;
}
