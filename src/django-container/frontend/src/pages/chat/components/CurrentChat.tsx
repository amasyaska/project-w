import { Message as MessageType } from "@/context/AuthContext";

import Message from "./Message";

import styles from "./CurrentChat.module.css";

export default function CurrentChat({ messages }: { messages: MessageType[] }) {
    return (
        <div className={styles.chat}>
            {messages.map((message, index) => (
                <Message key={index} {...message} />
            ))}
        </div>
    );
}
