import Button from "@components/Button.tsx";
import PageHeader from "@components/PageHeader.tsx";
import Main from "@components/Main.tsx";

export default function Home() {
    return <Main>
        <PageHeader>Типу головна сторінка Project W</PageHeader>
        <p>Шось дуже розумне про волонтерів, вомбатів і які ми круті</p>

        <div>
            <Button to="/posts/new">Конпка А</Button>
            <Button to="/posts" primary>Кнопка Б</Button>
        </div>
    </Main>;
}
