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
    function handleSubmit(e) {
        e.preventDefault();
        handleDoSearch();
    }
    return (
        <>
            <div className="list-top">
                {children}
                <button onClick={handleShowSearch}>
                    {showSearch ? "關閉" : "搜尋"}
                </button>
                <div className="per-page">
                    <span>每頁:</span>
                    <div>
                        <button
                            onClick={() => {
                                handlePerPage(24);
                            }}
                            className={perPage === 24 ? "active" : ""}
                        >
                            24
                        </button>
                        <button
                            onClick={() => {
                                handlePerPage(48);
                            }}
                            className={perPage === 48 ? "active" : ""}
                        >
                            48
                        </button>
                        <button
                            onClick={() => {
                                handlePerPage(72);
                            }}
                            className={perPage === 72 ? "active" : ""}
                        >
                            72
                        </button>
                    </div>
                </div>
            </div>
            {showSearch && (
                <form onSubmit={handleSubmit} className="search-english">
                    <input
                        type="text"
                        placeholder="請輸入完整英文單字"
                        value={searchInput}
                        onChange={handleSearchChange}
                    />
                    <button>送出</button>
                </form>
            )}
            {children2}
        </>
    );
}
