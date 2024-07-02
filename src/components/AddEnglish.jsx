import { useState } from "react";
import ListTop from "./ListTop";

export default function AddEnglish() {
    const [showAddEnglish, setShowAddEnglish] = useState(false);
    const [addData, setAddDate] = useState({ english: "", chinese: "" });
    function handleShowAddEnglish() {
        setShowAddEnglish((prev) => !prev);
    }
    function handleInputChange(e) {
        setAddDate((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value,
            };
        });
    }
    function handleAddData() {
        console.log(addData);
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
