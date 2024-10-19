import styles from './Home.module.css';
import Button from "@components/Button.tsx";
import PageHeader from "@components/PageHeader.tsx";

export default function Home() {
    return <div className={styles.mainPage}>
        <PageHeader text={"Типу головна сторінка Project W"}/>
        <p>Шось дуже розумне про волонтерів і які ми круті</p>

        <div>
            <Button to="/posts/new">Конпка А</Button>
            <Button to="/posts" primary>Кнопка Б</Button>
        </div>

    </div>;
}
