import styles from './PageHeader.module.css';

type PageHeaderProps = {
    text: string;
};

export default function PageHeader({text}: PageHeaderProps) {
    return <h2 className={styles.pageHeader}>{text}</h2>;
}
