import styles from "./BurgerMenu.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars} from "@fortawesome/free-solid-svg-icons";

export default function BurgerMenu() {
    return <div className={styles.burger}>
        <FontAwesomeIcon icon={faBars}/>
    </div>;
}
