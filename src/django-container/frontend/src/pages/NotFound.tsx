import Button from "@components/Button";

export default function NotFound() {
    return (
        <div>
            <h1>404</h1>
            <p>{"Ой! Сторінку не знайдено :<"}</p>
            <Button to="/">На головну</Button>
        </div>
    );
}
