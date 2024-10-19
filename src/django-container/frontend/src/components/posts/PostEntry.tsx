import {Post} from "@context/AuthContext.tsx";
import {Link} from "react-router-dom";

import styles from './PostEntry.module.css';
import PageHeader from "@components/PageHeader.tsx";

export default function PostEntry({post}: { post: Post }) {
    return (
        <Link className={styles.postEntry} to={`/post/${post.id}`}>
            <PageHeader>{post.title}</PageHeader>
        </Link>
    );
}
