import {useEffect, useState} from "react";
import {Post} from "@context/AuthContext.tsx";
import useAuth from "@hooks/auth.ts";

import PostEntry from "@components/posts/PostEntry.tsx";

import styles from './PostsList.module.css';

export default function PostsList({limit, search}: { limit?: number, search?: string }) {
    const {getPosts} = useAuth();

    const [posts, setPosts] = useState<Post[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getPosts({search}).then((response) => {
            if (response.error) {
                setError(response.error);
            } else {
                const posts = limit ? response.posts.slice(0, limit) : response.posts;
                setPosts(posts);
            }
            setLoading(false);
        });
    }, [getPosts, limit, search]);

    return <div className={styles.outer}>
        {loading && <div>Loading...</div>}
        {error && <div>Error: {error}</div>}
        {posts && <div className={styles.list}>
            {posts.map((post) => <PostEntry post={post} key={post.id}/>)}
        </div>}
        {posts && posts.length === 0 && <div>Список постів порожній</div>}
    </div>;
}
