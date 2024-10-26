import Button from "@components/Button.tsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFilter} from "@fortawesome/free-solid-svg-icons";

export default function PostsFilter() {
    //TODO: Implement filters
    return <Button>
        <FontAwesomeIcon icon={faFilter}/>
    </Button>;
}
