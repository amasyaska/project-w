import {useEffect, useState} from "react";
import {Post} from "@context/AuthContext.tsx";
import useAuth from "@hooks/auth.ts";

import PostEntry from "@components/posts/PostEntry.tsx";

import style from './PostsList.module.css';

export default function PostsList({limit}: { limit?: number }) {
    const {getPosts} = useAuth();

    const [posts, setPosts] = useState<Post[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getPosts().then((response) => {
            if (response.error) {
                setError(response.error);
            } else {
                const posts = limit ? response.posts.slice(0, limit) : response.posts;
                setPosts(posts);
            }
            setLoading(false);
        });
    }, [getPosts, limit]);

    return <div className={style.outer}>
        {loading && <div>Loading...</div>}
        {error && <div>Error: {error}</div>}
        {posts && <div className={style.list}>
            {posts.map((post) => <PostEntry post={post} key={post.id}/>)}
        </div>}
        {posts && posts.length === 0 && <div>Список постів порожній</div>}
    </div>;
}
