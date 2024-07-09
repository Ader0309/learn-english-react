import { useEffect, useState } from "react";
import AddEnglish from "../components/AddEnglish";
import Modal from "../components/Modal";
import List from "../components/List";
import PageList from "./PageList";

const path = "http://localhost:3000";

export default function ListIndex() {
    const [fetching, setFetching] = useState(true);
    const [allEnglishList, setAllEnglishList] = useState([]);
    const [addData, setAddData] = useState({ english: "", chinese: "" });
    const [showModal, setShowModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    //頁碼用
    const [perPage, setPerPage] = useState(25);
    const [currentPage, setCurrentPage] = useState(1);
    const pageNum = Math.ceil(allEnglishList.length / perPage);
    const indexOfSplic = perPage * (currentPage - 1);
    const [currentEnglishList, setCurrentEnglishList] = useState([]);

    //取得每頁資料
    function currentData() {
        const copyList = [...allEnglishList];
        setCurrentEnglishList(copyList.splice(indexOfSplic, perPage));
    }
    //點擊頁碼
    function handlePageClick(e) {
        setCurrentPage(Number(e.target.name));
    }
    //下一頁
    function handleNextPageClick() {
        if (currentPage < pageNum) {
            setCurrentPage(currentPage + 1);
        }
    }
    //上一頁
    function handlePrevPageClick() {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    }
    //點擊每頁幾筆
    function handlePerPage(num) {
        setPerPage(num);
        setCurrentPage(1);
    }
    // 新增單字input
    function handleInputChange(e) {
        setAddData((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value,
            };
        });
    }
    //依連線狀況 開啟modal
    function responseStatus(response) {
        if (response.status === "success") {
            setModalTitle(response.message);
            setShowModal(true);
            getData();
        } else if (response.status === "error") {
            setModalTitle(response.message);
            setShowModal(true);
        }
    }

    // 新增單字 API
    const addEnglish = async (data) => {
        const response = await fetch(`${path}/api/english`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }).then((res) => res.json());
        try {
            responseStatus(response);
        } catch (err) {
            return "取得資料失敗";
        }
    };
    function handleAddData() {
        addEnglish(addData);
        setAddData({ english: "", chinese: "" });
    }

    // 加入/取消收藏 API
    const addImportant = async (data) => {
        const response = await fetch(`${path}/api/important`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }).then((res) => res.json());
        try {
            responseStatus(response);
        } catch (err) {
            return "取得資料失敗";
        }
    };

    //刪除單字 API
    const deleteEnglish = async (data) => {
        const response = await fetch(`${path}/api/english`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }).then((res) => res.json());
        try {
            responseStatus(response);
        } catch (err) {
            return "取得資料失敗";
        }
    };

    //取所有英文單字 API
    const getData = async () => {
        const response = await fetch(`${path}/api/english-list`).then((res) =>
            res.json()
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
    useEffect(() => {
        if (!fetching) {
            currentData();
        }
    }, [allEnglishList, currentPage, perPage]);

    return (
        <>
            <Modal
                openModal={showModal}
                closeModal={() => setShowModal(false)}
                showCancelButton={false}
                modalTitle={modalTitle}
            />
            <List
                fetching={fetching}
                currentEnglishList={currentEnglishList}
                addImportant={addImportant}
                deleteEnglish={deleteEnglish}
            >
                <AddEnglish
                    handleInputChange={handleInputChange}
                    handleAddData={handleAddData}
                    addData={addData}
                    handlePerPage={handlePerPage}
                    perPage={perPage}
                />
            </List>
            <PageList
                pageNum={pageNum}
                handlePageClick={handlePageClick}
                currentPage={currentPage}
                handleNextPageClick={handleNextPageClick}
                handlePrevPageClick={handlePrevPageClick}
            />
        </>
    );
}
