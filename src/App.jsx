import "normalize.css";
import { RxCross2 } from "react-icons/rx";
import { AiFillStar } from "react-icons/ai";
export default function App() {
    return (
        <>
            <header>
                <h1>單字列表</h1>
                <div>
                    <button>新增單字</button>
                    <button>隨機測驗</button>
                    <button>收藏單字</button>
                </div>
            </header>
            <section>
                <div className="list-top">
                    <button>A</button>
                    <div className="per-page">
                        <span>每頁顯示:</span>
                        <button>25</button>
                        <button>50</button>
                        <button>100</button>
                    </div>
                </div>
                <div className="list">
                    <div className="card">
                        <h3 className="english">Apple555 5555555</h3>
                        <h3 className="chinese">蘋果</h3>
                        <button className="delete">
                            <RxCross2 />
                        </button>
                        <button className="star">
                            <AiFillStar />
                        </button>
                    </div>
                    <div className="card">
                        <h4 className="english">Apple</h4>
                        <h4 className="chinese">
                            蘋果蘋果蘋果蘋果蘋果蘋果蘋果蘋果蘋果
                        </h4>
                        <button className="delete">
                            <RxCross2 />
                        </button>
                        <button className="star">
                            <AiFillStar />
                        </button>
                    </div>
                    <div className="card">
                        <h4 className="english">Apple</h4>
                        <h4 className="chinese">蘋果</h4>
                        <button className="delete">
                            <RxCross2 />
                        </button>
                        <button className="star">
                            <AiFillStar />
                        </button>
                    </div>
                    <div className="card">
                        <h4 className="english">Apple</h4>
                        <h4 className="chinese">蘋果</h4>
                        <button className="delete">
                            <RxCross2 />
                        </button>
                        <button className="star">
                            <AiFillStar />
                        </button>
                    </div>
                    <div className="card">
                        <h4 className="english">Apple</h4>
                        <h4 className="chinese">蘋果</h4>
                        <button className="delete">
                            <RxCross2 />
                        </button>
                        <button className="star">
                            <AiFillStar />
                        </button>
                    </div>
                </div>
            </section>
        </>
    );
}
