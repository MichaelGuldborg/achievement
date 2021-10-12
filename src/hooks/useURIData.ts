import {useHistory, useLocation} from "react-router-dom";

export const useURIData = <T extends {}>(param: string): [T, (o: T) => void] => {
    const search = useLocation().search;
    const history = useHistory();
    const searchParams = new URLSearchParams(search);

    const setURIData = (o: T) => {
        searchParams.set(param, encodeURI(JSON.stringify(o)));
        history.push({search: searchParams.toString()});
    }

    const raw = searchParams.get(param) ?? "";
    if (raw === "") return [{} as T, setURIData]

    const data: T = JSON.parse(decodeURI(raw));
    return [data, setURIData];
}

export default useURIData;

