import styles from './PostsSearch.module.css';
import Input from "@components/Input.tsx";

export default function PostsSearch() {
    return <div className={styles.search}>
        <Input placeholder="Пошук постів"/>
    </div>;
}
