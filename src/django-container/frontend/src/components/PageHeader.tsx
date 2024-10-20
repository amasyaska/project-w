import styles from './PageHeader.module.css';
import React from "react";


export default function PageHeader({children, size}: { children: React.ReactNode, size?: "h2" | "h3" | "h4" }) {
    return size === "h3" ? <h3 className={styles.pageHeader}>{children}</h3> :
        size === "h4" ? <h4 className={styles.pageHeader}>{children}</h4> :
            <h2 className={styles.pageHeader}>{children}</h2>;
}
