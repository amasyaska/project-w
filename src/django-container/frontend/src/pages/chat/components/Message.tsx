import { Message as MessageType } from "@/context/AuthContext";

import styles from "./Message.module.css";

export default function Message({ text, username, isOwn, timestamp }: MessageType) {
    return (
        <div className={styles.message + (isOwn ? " " + styles.own : "")}>
            <div className={styles.content}>
                <p>{text}</p>
                <span className={styles.author}>{username}</span>
            </div>
            <span className={styles.time}>{new Date(timestamp).toLocaleTimeString()}</span>
        </div>
    );
}
