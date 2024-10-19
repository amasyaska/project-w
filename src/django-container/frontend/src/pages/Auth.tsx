import { FormEvent } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import useAuth from "@hooks/auth";

import Button from "@components/Button";
import Input from "@components/Input";
import PageHeader from "@components/PageHeader.tsx";
import Main from "@components/Main";   

import styles from "./Auth.module.css";

export default function Auth({ registering = false }) {
    const { redirectTo } = useParams();
    const { user, login, register } = useAuth();
    const navigate = useNavigate();

    async function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        // get form elements
        const form = event.target as HTMLFormElement;
        const data = new FormData(form);

        // get form values
        const email = data.get("email") as string;
        const password = data.get("password") as string;
        const password2 = data.get("password2") as string;
        const name = data.get("name") as string;

        // call the appropriate function
        if (registering) {
            if (password !== password2) {
                alert("Паролі не співпадають!");
                return;
            }
            await register({ email, password, username: name });
        } else {
            await login({ username: name, password });
        }

        // redirect to the specified URL
        navigate(redirectTo ?? "/");
        return;
    }

    // redirect if the user is already logged in
    if (user) {
        navigate("/");
        return;
    }

    return (
        <Main>
        <div className={[styles.auth, registering ? styles.register : ""].join(" ")}>
            <form onSubmit={submit}>
                <PageHeader>{registering ? "Реєстрація" : "Вхід у обліковий запис"}</PageHeader>
                <div className={styles.formFields}>
                    <Input
                        label="Ім'я користувача"
                        type="text"
                        name="name"
                        required
                    />

                    {registering && <Input label="Електронна пошта" type="text" name="email"/>}

                    <Input
                        label="Пароль"
                        type="password"
                        name="password"
                        required
                    />

                    {registering && <Input label="Підтвердження паролю" type="password" name="password2"/>}
                </div>
                <div className={styles.controls}>
                    <Link to={registering ? "/login" : "/register"} className={styles.link}>
                        {registering ? "Вже зареєстровані? Зайдіть у обліковий запис" : "Немає облікового запису? Зареєструйтеся"}
                    </Link>
                    <Button type="submit" primary>
                        {registering ? "Зареєструватись" : "Увійти"}
                    </Button>
                </div>
            </form>
        </div>
        </Main>
    );
}
