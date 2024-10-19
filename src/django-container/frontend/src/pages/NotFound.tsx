import Button from "@components/Button";
import PageHeader from "@components/PageHeader.tsx";

export default function NotFound() {
    return <>
        <PageHeader>404</PageHeader>
        <p>{"Ой! Сторінку не знайдено :<"}</p>
        <Button to="/">На головну</Button>
    </>;
}
