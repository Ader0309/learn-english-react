import { useState, useEffect } from "react";
import ListTop from "../components/ListTop";
import List from "../components/List";
import Modal from "../components/Modal";
import PageList from "../components/PageList";
import usePagination from "../hooks/usePagination";

const path = "http://localhost:3000";

export default function Important() {
    const [fetching, setFetching] = useState(true);
    const [allEnglishList, setAllEnglishList] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [searchInput, setSearchInput] = useState("");
    const [searchChinese, setSearchChinese] = useState("");
    const [showSearch, setShowSearch] = useState(false);

    const {
        setPerPage,
        setCurrentPage,
        currentData,
        currentPage,
        perPage,
        currentEnglishList,
        pageNum,
        handlePageClick,
        handleNextPageClick,
        handlePrevPageClick,
    } = usePagination(allEnglishList);

    function handleShowSearch() {
        setShowSearch((prev) => !prev);
    }

    //點擊每頁幾筆
    function handlePerPage(num) {
        setPerPage(num);
        setCurrentPage(1);
    }

    //依連線狀況 開啟modal
    function responseStatus(response) {
        if (response.status === "success") {
            setModalTitle(response.message);
            setShowModal(true);
            setSearchChinese("");
            getImportantData();
        } else if (response.status === "error") {
            setModalTitle(response.message);
            setShowModal(true);
            setSearchChinese("");
        }
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

    //查詢單字用
    function handleSearchChange(e) {
        setSearchInput(e.target.value);
    }

    // 查詢單字 API
    const searchEnglish = async (data) => {
        const response = await fetch(
            `${path}/api/english?english=${searchInput}`
        ).then((res) => res.json());
        try {
            if (response.status === "success") {
                setModalTitle(response.message.english);
                setSearchChinese(response.message.chinese);
                setShowModal(true);
            } else if (response.status === "error") {
                setModalTitle(response.message);
                setShowModal(true);
                setSearchChinese("");
            }
        } catch (err) {
            return "取得資料失敗";
        }
    };
    function handleDoSearch() {
        searchEnglish(searchInput);
        setSearchInput("");
    }

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

    //取所有重要英文單字 API
    const getImportantData = async () => {
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
        getImportantData();
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
                searchChinese={searchChinese}
            />
            <List
                fetching={fetching}
                currentEnglishList={currentEnglishList}
                addImportant={addImportant}
                deleteEnglish={deleteEnglish}
            >
                <ListTop
                    handleSearchChange={handleSearchChange}
                    handleDoSearch={handleDoSearch}
                    handlePerPage={handlePerPage}
                    perPage={perPage}
                    showSearch={showSearch}
                    handleShowSearch={handleShowSearch}
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
