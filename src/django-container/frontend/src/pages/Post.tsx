import PageHeader from "@components/PageHeader.tsx";
import PostProgress, {PostProgressProps} from "@components/PostProgress.tsx";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";

import styles from './Post.module.css';

type PostProps = {
    title: string;
    description: string;
    progress?: PostProgressProps;
};

export default function Post() {
    const {postId} = useParams();

    const [post, setPost] = useState<PostProps | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // TODO: Fetch the post from the backend
    });

    return <div className={styles.postOuter}>
        <PageHeader>Post</PageHeader>

        <div className={styles.postInner}>
            {loading &&
                <FontAwesomeIcon icon={faSpinner} spin/>
            }
            {error && <div>Error: {error}</div>}
            {post && <>

                <PageHeader>{post.title}</PageHeader>
                <p>{post.description}</p>
            {post.progress && <PostProgress {...post.progress} />}
            </>
            }
        </div>
    </div>;
}
