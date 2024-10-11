import { useEffect, useState } from "react";
import { useParams } from "react-router";
import useAuth from "@hooks/auth";
import { Message, Chat as ChatType } from "@context/AuthContext";

import Input from "@components/Input";
import Button from "@components/Button";

import Header from "./components/Header";
import RecentChats from "./components/RecentChats";
import CurrentChat from "./components/CurrentChat";

import styles from "./Chat.module.css";

export default function Chat() {
    const { getMessages, getChats, sendMessage } = useAuth();
    const { chatId } = useParams();
    const [messages, setMessages] = useState<Message[]>([]);
    const [chats, setChats] = useState<ChatType[]>([]);

    const [wombatClicks, setWombatClicks] = useState(0);

    useEffect(() => {
        getChats().then((response) => {
            setChats(response.chats || []);
        });
    }, []);

    useEffect(() => {
        if (!chatId) return;
        getMessages({ chatId }).then((response) => {
            setMessages(response.messages || []);
        });
    }, [chatId]);

    function sendMessageToChat() {
        if (!chatId) return;
        const text = "Hello";
        sendMessage({ chatId, text }).then((response) => {
            setMessages([...messages, response]);
        });
    }

    return (
        <div className={styles.chat}>
            <Header />
            <div className={styles.content}>
                <div className={styles.leftPanel}>
                    <div className={styles.searchBar}>
                        <Button
                            className={styles.logo}
                            primary
                            // add wombat link if user really wants to see a wombat
                            onClick={() => setWombatClicks(wombatClicks + 1)}
                            {...(wombatClicks >= 10
                                ? {
                                      to: "/wombat",
                                  }
                                : {})}
                        >
                            <img src="/womchat.svg" />
                        </Button>

                        <Input placeholder="Пошук користувача за ніком" />
                    </div>

                    <RecentChats chats={chats} />
                </div>

                <div className={styles.rightPanel}>
                    <CurrentChat messages={messages} />
                    <div className={styles.messageBox}>
                        <Input placeholder="Ваше повідомлення..." />
                        <Button primary onClick={sendMessageToChat}>
                            <svg
                                width="36"
                                height="31"
                                viewBox="0 0 36 31"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M22.5 0V8.85714C4.5 8.85714 0 17.9357 0 31C2.34 22.2314 9 17.7143 18 17.7143H22.5V26.5714L36 12.5771L22.5 0Z"
                                    fill="#001721"
                                />
                            </svg>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
