export default function PageList({
    pageNum,
    handlePageClick,
    currentPage,
    handleNextPageClick,
    handlePrevPageClick,
}) {
    const page = Array(pageNum).fill(0);

    return (
        <div className="page-list">
            <button onClick={handlePrevPageClick}>{"<"}</button>
            {page.map((v, i) => {
                return (
                    <button
                        key={i}
                        name={i + 1}
                        onClick={handlePageClick}
                        className={currentPage === i + 1 ? "active" : ""}
                    >
                        {i + 1}
                    </button>
                );
            })}
            <button onClick={handleNextPageClick}>{">"}</button>
        </div>
    );
}
