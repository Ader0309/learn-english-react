import { useState } from "react";
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

    function handleShowSearch() {
        setShowSearch((prev) => !prev);
        setShowAddEnglish(false);
    }

    function handleShowAddEnglish() {
        setShowAddEnglish((prev) => !prev);
        setShowSearch(false);
    }

    return (
        <>
            <ListTop
                children2={
                    showAddEnglish && (
                        <div className="add-english">
                            <input
                                type="text"
                                placeholder="請輸入英文"
                                name="english"
                                value={addData.english}
                                onChange={handleInputChange}
                            />
                            <input
                                type="text"
                                placeholder="請輸入中文"
                                name="chinese"
                                value={addData.chinese}
                                onChange={handleInputChange}
                            />
                            <button onClick={handleAddData}>新增</button>
                        </div>
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
                    {showAddEnglish ? "取消新增" : "新增單字"}
                </button>
            </ListTop>
        </>
    );
}
