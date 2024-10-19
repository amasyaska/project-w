import styles from './Main.module.css';
import React from "react";

export default function Main({children}: { children: React.ReactNode }) {
    return <div className={styles.outer}>
        <main className={styles.content}>
            {children}
        </main>
    </div>;
}
