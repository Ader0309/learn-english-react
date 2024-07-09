import { RxCross2 } from "react-icons/rx";
import { AiFillStar } from "react-icons/ai";
import { useEffect, useState } from "react";

const path = "http://localhost:3000";

export default function Card({
    english,
    chinese,
    important,
    addImportant,
    deleteEnglish,
}) {
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

    function handleButtonStar(e) {
        e.stopPropagation();
        addImportant({ english });
    }
    function handleButtonDelete(e) {
        e.stopPropagation();
        deleteEnglish({ english });
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
            {(important || hover) && (
                <button className="star" onClick={handleButtonStar}>
                    <AiFillStar />
                </button>
            )}
            {hover && (
                <button className="delete" onClick={handleButtonDelete}>
                    <RxCross2 />
                </button>
            )}
        </div>
    );
}
