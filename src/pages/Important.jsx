import ListTop from "../components/ListTop";
import List from "../components/List";
import { useState, useEffect } from "react";

const path = "http://localhost:3000";

export default function Important() {
    const [fetching, setFetching] = useState(true);
    const [allEnglishList, setAllEnglishList] = useState([]);

    //取所有英文單字 API
    const getData = async () => {
        const response = await fetch(`${path}/api/important-english-list`).then(
            (res) => res.json()
        );
        try {
            if (response.status === "success") {
                setAllEnglishList(response.message);
                setFetching(false);
            } else {
                return "取得資料失敗";
            }
        } catch (err) {
            return "取得資料失敗";
        }
    };

    useEffect(() => {
        getData();
    }, []);
    return (
        <section>
            <ListTop />
            <List
                fetching={fetching}
                currentEnglishList={allEnglishList}
            ></List>
        </section>
    );
}
