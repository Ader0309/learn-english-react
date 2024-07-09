import ListTop from "../components/ListTop";
import List from "../components/List";
import { useState } from "react";

export default function Important() {
    const [fetching, setFetching] = useState(true);
    const [englishList, setEnglishList] = useState([]);
    return (
        <section>
            <ListTop />
            <List fetching={fetching}></List>
        </section>
    );
}
