import styles from './PageHeader.module.css';
import React from "react";


export default function PageHeader({children}: { children: React.ReactNode }) {
    return <h2 className={styles.pageHeader}>{children}</h2>;
}
