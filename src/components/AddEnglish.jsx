import { useRef, useState } from "react";
import ListTop from "./ListTop";

export default function AddEnglish({
    handleInputChange,
    handleAddData,
    addData,
    handlePerPage,
    perPage,
    searchInput,
    handleSearchChange,
    handleDoSearch,
}) {
    const [showAddEnglish, setShowAddEnglish] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const englishRef = useRef();

    function handleShowSearch() {
        setShowSearch((prev) => !prev);
        setShowAddEnglish(false);
    }

    function handleShowAddEnglish() {
        setShowAddEnglish((prev) => !prev);
        setShowSearch(false);
    }

    function handleSubmit(e) {
        e.preventDefault();
        handleAddData();
        if (englishRef.current) {
            englishRef.current.focus();
        }
    }

    return (
        <>
            <ListTop
                children2={
                    showAddEnglish && (
                        <form onSubmit={handleSubmit} className="add-english">
                            <input
                                type="text"
                                placeholder="請輸入英文"
                                name="english"
                                value={addData.english}
                                onChange={handleInputChange}
                                ref={englishRef}
                            />
                            <input
                                type="text"
                                placeholder="請輸入中文"
                                name="chinese"
                                value={addData.chinese}
                                onChange={handleInputChange}
                            />
                            <button>新增</button>
                        </form>
                    )
                }
                handlePerPage={handlePerPage}
                perPage={perPage}
                showSearch={showSearch}
                handleShowSearch={handleShowSearch}
                searchInput={searchInput}
                handleSearchChange={handleSearchChange}
                handleDoSearch={handleDoSearch}
            >
                <button onClick={handleShowAddEnglish}>
                    {showAddEnglish ? "取消" : "新增"}
                </button>
            </ListTop>
        </>
    );
}
