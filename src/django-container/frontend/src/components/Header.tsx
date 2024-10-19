import {Link} from "react-router-dom";
import styles from "./Header.module.css";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faUserCircle} from '@fortawesome/free-solid-svg-icons'
import BurgerMenu from "@components/BurgerMenu.tsx";

export default function Header() {
    return <header className={styles.header}>
        <div className={styles.left}>
            <BurgerMenu/>
        </div>
        <div className={styles.center}>
            <Link to="/">
                <h1>Project W</h1>
            </Link>
        </div>
        <div className={styles.right}>
            <Link to={"/account"} className={styles.account}>
                <FontAwesomeIcon icon={faUserCircle}/>
            </Link>
        </div>
    </header>;
}
