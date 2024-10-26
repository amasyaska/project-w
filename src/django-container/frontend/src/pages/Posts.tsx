import Main from "@components/Main.tsx";
import PostsList from "@components/posts/PostsList.tsx";
import PostsSearch from "@components/posts/PostsSearch.tsx";
import PostsFilter from "@components/posts/PostsFilter.tsx";

import style from "./Posts.module.css";

export default function Posts() {
    return <Main big>
        <div className={style.search}>
            <PostsSearch/>
            <PostsFilter/>
        </div>
        <PostsList/>
    </Main>
}
