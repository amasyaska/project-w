import React from "react";

import styles from './PostTag.module.css';

export default function PostTag({children}: { children: React.ReactNode }) {
    return (
        <span className={styles.tag}>{children}</span>
    );
}
