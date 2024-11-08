import { useSearchParams  } from "react-router-dom";

const UseUrlQueryParams = () => {
    const [ query, setQuery ] = useSearchParams();
    return [query.get('lat'), query.get('lng')];
}

export default UseUrlQueryParams;
