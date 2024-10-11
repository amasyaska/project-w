import ChatPreview from "./ChatPreview";
import styles from "./RecentChats.module.css";

import { Chat as ChatType } from "@/context/AuthContext";

export default function RecentChats({ chats }: { chats: ChatType[] }) {
    return (
        <div className={styles.recentChats}>
            <h2>Нещодавні Листування</h2>
            <div className={styles.chats}>
                {chats.length === 0 ? (
                    <p>Якось тут пусто...</p>
                ) : (
                    chats.map((chat, index) => (
                        <ChatPreview key={index} {...chat} active={index === 0} onClick={() => {}} />
                    ))
                )}
            </div>
        </div>
    );
}
