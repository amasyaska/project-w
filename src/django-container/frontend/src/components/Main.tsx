import React from "react";

import styles from './Main.module.css';

export default function Main({children, big}: { children: React.ReactNode, big?: boolean }) {
    return <div className={styles.outer}>
        <main className={[styles.content, big ? styles.big : ''].join(' ')}>
            {children}
        </main>
    </div>;
}
