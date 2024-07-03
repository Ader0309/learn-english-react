import { useState } from "react";
import ListTop from "./ListTop";

const path = "http://localhost:3000";

export default function AddEnglish({ handleInputChange, handleAddData }) {
    const [showAddEnglish, setShowAddEnglish] = useState(false);

    function handleShowAddEnglish() {
        setShowAddEnglish((prev) => !prev);
    }

    return (
        <>
            <ListTop
                children2={
                    showAddEnglish && (
                        <div className="addEnglish">
                            <input
                                type="text"
                                placeholder="請輸入英文"
                                name="english"
                                onChange={handleInputChange}
                            />
                            <input
                                type="text"
                                placeholder="請輸入中文"
                                name="chinese"
                                onChange={handleInputChange}
                            />
                            <button onClick={handleAddData}>新增</button>
                        </div>
                    )
                }
            >
                <div className="list-top">
                    <button onClick={handleShowAddEnglish}>
                        {showAddEnglish ? "取消新增" : "新增單字"}
                    </button>
                </div>
            </ListTop>
        </>
    );
}
