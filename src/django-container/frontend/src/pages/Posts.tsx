import React, {useState} from "react";

import Main from "@components/Main.tsx";
import PostsList from "@components/posts/PostsList.tsx";
import Input from "@components/Input.tsx";

import style from "./Posts.module.css";
import Button from "@components/Button.tsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";

export default function Posts() {
    const [search, setSearch] = useState("");

    function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        const form = event.target as HTMLFormElement;
        const data = new FormData(form);
        setSearch(data.get("search") as string);
    }

    return <Main big>
        <form className={style.search} onSubmit={handleSubmit}>
            <Input
                placeholder="Пошук постів"
                className={style.searchbar}
                name="search"
                type="text"
            />
            <Button type="submit">
                <FontAwesomeIcon icon={faSearch}/>
            </Button>
        </form>
        <PostsList search={search}/>
    </Main>
}
