import PageHeader from "@components/PageHeader.tsx";
import Main from "@components/Main.tsx";
import PostsList from "@components/posts/PostsList.tsx";
import Button from "@components/Button.tsx";

export default function Home() {
    return <Main big>
        <PageHeader>Project W</PageHeader>
        <p>Вомбати це добре, а волонтери - ще краще!</p>

        <p>Декілька останніх постів:</p>
        <PostsList limit={4}/>
        <br/>
        <Button to="/posts">Переглянути всі пости</Button>
    </Main>;
}
