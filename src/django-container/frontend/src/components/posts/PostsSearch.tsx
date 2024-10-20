import Input from "@components/Input.tsx";

import styles from "./PostsSearch.module.css";

export default function PostsSearch() {
    return <Input placeholder="Пошук постів" className={styles.search}/>;
}
