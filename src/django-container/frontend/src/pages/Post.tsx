import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

import PageHeader from "@components/PageHeader.tsx";
import PostProgress, {PostProgressProps} from "@components/PostProgress.tsx";
import Loading from "@components/Loading.tsx";
import useAuth from "@hooks/auth.ts";
import Main from "@components/Main.tsx";
import Button from "@components/Button.tsx";

import styles from './Post.module.css';

type PostProps = {
    title: string;
    description: string;
    progress?: PostProgressProps;
};

export default function Post() {
    const {postId} = useParams() as { postId: string };
    const {getPost} = useAuth()

    const [post, setPost] = useState<PostProps | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getPost({postId}).then((response) => {
            if (response.error) {
                setError(response.error);
            } else {
                if (response.post === undefined) {
                    setError("Post not found");
                } else {
                    setPost(response.post);
                }
            }
            setLoading(false);
        });
    });

    return <Main big>
        <div className={styles.postOuter}>
            <div className={styles.postInner}>
                {loading && <Loading/>}
                {error && <div>Error: {error}</div>}
                {post && <>
                    <Button back>Назад</Button>
                    <PageHeader>{post.title}</PageHeader>
                    <p>{post.description}</p>
                    <Button primary>Переказати кошти</Button>
                </>
                }
            </div>
            {post?.progress && <PostProgress {...post.progress} />}
        </div>
    </Main>;
}
