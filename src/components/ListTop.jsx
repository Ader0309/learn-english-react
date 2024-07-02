export default function ListTop({ children, children2 }) {
    return (
        <>
            <div className="list-top">
                {children}
                <div className="per-page">
                    <span>每頁顯示:</span>
                    <button>25</button>
                    <button>50</button>
                    <button>100</button>
                </div>
            </div>
            {children2}
        </>
    );
}
