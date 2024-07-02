import { RxCross2 } from "react-icons/rx";
import { AiFillStar } from "react-icons/ai";
import { useState } from "react";

export default function Card({ english, chinese }) {
    const [hover, setHover] = useState(false);
    const [visibleChinese, setVisibleChinese] = useState(false);
    function handleMouseEnter() {
        setHover(true);
    }
    function handleMouseLeave() {
        setHover(false);
    }
    function handleChineseVisible() {
        setVisibleChinese((prev) => !prev);
    }
    return (
        <div
            className="card"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleChineseVisible}
        >
            <h3 className="english">{english}</h3>
            <div className="line"></div>
            {visibleChinese && <h4 className="chinese">{chinese}</h4>}
            {hover && (
                <>
                    <button className="delete">
                        <RxCross2 />
                    </button>
                    <button className="star">
                        <AiFillStar />
                    </button>
                </>
            )}
        </div>
    );
}
