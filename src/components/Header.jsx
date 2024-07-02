import { Link } from "react-router-dom";

export default function Header({ title }) {
    return (
        <header>
            <h1>{title}</h1>
            <div>
                <Link to="">
                    <button className={title === "單字列表" ? "active" : ""}>
                        單字列表
                    </button>
                </Link>
                <Link to="important">
                    <button className={title === "收藏單字" ? "active" : ""}>
                        收藏單字
                    </button>
                </Link>
                <Link to="test">
                    <button className={title === "隨機測驗" ? "active" : ""}>
                        隨機測驗
                    </button>
                </Link>
            </div>
        </header>
    );
}
