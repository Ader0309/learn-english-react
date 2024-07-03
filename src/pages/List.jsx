import { useEffect, useState } from "react";
import AddEnglish from "../components/AddEnglish";
import Card from "../components/Card";
import Modal from "../components/Modal";

const path = "http://localhost:3000";

export default function List() {
    const [fetching, setFetching] = useState(true);
    const [englishList, setEnglishList] = useState([]);
    const [addData, setAddData] = useState({ english: "", chinese: "" });
    const [showModal, setShowModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    // 新增單字input
    function handleInputChange(e) {
        setAddData((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value,
            };
        });
    }
    // 新增單字api
    const addEnglish = async (data) => {
        const response = await fetch(`${path}/api/english`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }).then((res) => res.json());
        try {
            if (response.status === "success") {
                setModalTitle(response.message);
                setShowModal(true);
            } else if (response.status === "error") {
                setModalTitle(response.message);
                setShowModal(true);
            }
        } catch (err) {
            return "取得資料失敗";
        }
    };
    function handleAddData() {
        addEnglish(addData);
    }

    //取所有英文單字
    const getData = async () => {
        const response = await fetch(`${path}/api/english-list`).then((res) =>
            res.json()
        );
        try {
            if (response.status === "success") {
                setEnglishList(response.message);
                setFetching(false);
            } else {
                return "取得資料失敗";
            }
        } catch (err) {
            return "取得資料失敗";
        }
    };
    // useEffect(() => {
    //     getData();
    // }, []);

    return (
        <>
            <Modal
                openModal={showModal}
                closeModal={() => setShowModal(false)}
                showCancelButton={false}
                modalTitle={modalTitle}
            />
            {/* <button onClick={() => setShowModal(true)}>開</button> */}
            <section>
                <AddEnglish
                    handleInputChange={handleInputChange}
                    handleAddData={handleAddData}
                />
                <div className="list">
                    {fetching ? (
                        <h3>取得資料中..</h3>
                    ) : englishList.length > 0 ? (
                        englishList.map((v, i) => {
                            return (
                                <Card
                                    key={i}
                                    english={v.english}
                                    chinese={v.chinese}
                                />
                            );
                        })
                    ) : (
                        <>
                            <h3>目前無儲存單字</h3>
                            <h3>請點擊上方按鈕新增</h3>
                        </>
                    )}
                </div>
            </section>
        </>
    );
}
