import {FormEvent} from "react";
import {useNavigate} from "react-router-dom";

import Button from "@components/Button";
import Input from "@components/Input";
import PageHeader from "@components/PageHeader.tsx";
import Main from "@components/Main";

import styles from "./Creation.module.css";
import useAuth from "@hooks/auth.ts";
import {Post} from "@context/AuthContext.tsx";


export default function Creation() {
    const navigate = useNavigate();
    const {createPost} = useAuth();

    async function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        // get form elements
        const form = event.target as HTMLFormElement;
        const data = new FormData(form);

        // get form values
        const title = data.get("title") as string;
        const description = data.get("description") as string;
        const tags = data.get("tags") as string;

        createPost({title, description, tags} as Post).then(({postId}) => {
            navigate(`/post/${postId}`);
        });
        return;
    }

    return (
        <Main>
            <div className={styles.creation}>
                <form onSubmit={submit}>
                    <PageHeader>Створення оголошення</PageHeader>
                    <div className={styles.creationFields}>
                        <Input
                            label="Назва оголошення"
                            type="text"
                            name="title"
                            required
                        />
                        <Input
                            label="Опис"
                            type="text"
                            name="description"
                            className={styles.description}/>
                        <Input
                            label="Теги"
                            type="text"
                            name="tags"
                        />
                    </div>
                    <div className={styles.create}>
                        <Button type="submit" primary> Створити </Button>
                    </div>
                </form>
            </div>
        </Main>
    );
}
