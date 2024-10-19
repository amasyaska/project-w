import {faSpinner} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import styles from './Loading.module.css';
import PageHeader from "@components/PageHeader.tsx";

export default function Loading() {
    return <div className={styles.loading}>
        <PageHeader>Почекайте, сторінка завантажується</PageHeader>
        <FontAwesomeIcon icon={faSpinner} spin className={styles.icon}/>
    </div>;
}
