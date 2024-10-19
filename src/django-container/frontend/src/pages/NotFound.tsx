import Button from "@components/Button";
import PageHeader from "@components/PageHeader.tsx";
import Main from "@components/Main.tsx";

export default function NotFound() {
    return <Main>
        <PageHeader>404</PageHeader>
        <p>{"Ой! Сторінку не знайдено :<"}</p>
        <Button to="/">На головну</Button>
    </Main>;
}
