import { useState } from "react";

export default function ListTop({
    children,
    children2,
    handlePerPage,
    perPage,
    handleShowSearch,
    showSearch,
    searchInput,
    handleSearchChange,
    handleDoSearch,
}) {
    return (
        <>
            <div className="list-top">
                {children}
                <button onClick={handleShowSearch}>
                    {showSearch ? "關閉搜尋" : "搜尋單字"}
                </button>
                <div className="per-page">
                    <span>每頁顯示:</span>
                    <button
                        onClick={() => {
                            handlePerPage(25);
                        }}
                        className={perPage === 25 ? "active" : ""}
                    >
                        25
                    </button>
                    <button
                        onClick={() => {
                            handlePerPage(50);
                        }}
                        className={perPage === 50 ? "active" : ""}
                    >
                        50
                    </button>
                    <button
                        onClick={() => {
                            handlePerPage(100);
                        }}
                        className={perPage === 100 ? "active" : ""}
                    >
                        100
                    </button>
                </div>
            </div>
            {showSearch && (
                <div className="search-english">
                    <input
                        type="text"
                        placeholder="請輸入完整英文單字"
                        value={searchInput}
                        onChange={handleSearchChange}
                    />
                    <button onClick={handleDoSearch}>送出</button>
                </div>
            )}
            {children2}
        </>
    );
}
