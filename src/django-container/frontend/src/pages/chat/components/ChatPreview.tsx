import Button from "@components/Button";

import style from "./ChatPreview.module.css";

export default function ChatPreview({
    name,
    lastMessage,
    active,
    onClick,
}: {
    name: string;
    lastMessage: string;
    active: boolean;
    onClick: () => void;
}) {
    return (
        <Button primary={active} className={[style.chat, active && style.active].join(" ")} onClick={onClick}>
            <div className={style.rect}></div>
            <div className={style.content}>
                <h3>{name}</h3>
                <p>{lastMessage}</p>
            </div>
        </Button>
    );
}
