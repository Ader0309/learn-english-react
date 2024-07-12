import { useState } from "react";

function usePagination(allEnglishList) {
    //頁碼用
    const [perPage, setPerPage] = useState(24);
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

    return {
        currentData,
        handlePageClick,
        handleNextPageClick,
        handlePrevPageClick,
        setPerPage,
        perPage,
        currentPage,
        currentEnglishList,
        pageNum,
    };
}
export default usePagination;
