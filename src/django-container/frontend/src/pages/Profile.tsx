import {useNavigate} from "react-router-dom";
import useAuth from "@hooks/auth.ts";

import PageHeader from "@components/PageHeader.tsx";
import Button from "@components/Button.tsx";

import styles from "./Profile.module.css";
import {useEffect} from "react";

export default function Profile() {
    const {user} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user, navigate]);

    if (!user) {
        return null;
    }

    return <div className={styles.profile}>
        <PageHeader>Профіль</PageHeader>
        <div>Вітаємо, {user.username}!</div>

        <div className={styles.achievements}>
            Тут відображатимуться ваші досягнення та статистика.
        </div>

        <Button onClick={() => navigate("/logout")}>Вийти</Button>
    </div>;
}
