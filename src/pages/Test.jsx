import { useEffect, useRef, useState } from "react";
import Modal from "../components/Modal";
import { useSelector } from "react-redux";

export default function Test() {
    const [showModal, setShowModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [problem, setProblem] = useState({});
    const [answer, setAnswer] = useState({});
    const [finalAnswer, setFinalAnswer] = useState([]);
    const englishList = JSON.parse(localStorage.getItem("allEnglish"));

    const sectionRef = useRef(null);
    const inputRef = useRef(null);

    const isAuth = useSelector((state) => state.auth.auth);

    //隨機數，取得單字清單內的某筆資料
    function getRandom() {
        return englishList[Math.floor(Math.random() * englishList.length)];
    }
    // 控制鍵盤輸入
    function handleKeyDown(e) {
        //輸入為英文時才能輸入
        if (e.keyCode >= 65 && e.keyCode <= 90) {
            const index = finalAnswer.findIndex((answer) => answer === "");
            if (index !== -1) {
                const newAnswerArray = [...finalAnswer];
                newAnswerArray[index] = e.key;
                setFinalAnswer(newAnswerArray);
            }
        }
        // 按倒退鍵刪除
        else if (e.key === "Backspace") {
            const lastIndex = finalAnswer.reduceRight(
                (prev, current, index) => {
                    return prev === -1 && current !== "" ? index : prev;
                },
                -1
            );
            if (lastIndex !== -1) {
                const newAnswerArray = [...finalAnswer];
                newAnswerArray[lastIndex] = "";
                setFinalAnswer(newAnswerArray);
            }
        }
        // enter送出
        else if (e.key === "Enter") {
            // 當為onKeyDown時，會預設是提交表單，所以要阻止
            e.preventDefault();
            const finalAnswerStr = finalAnswer.join("");
            if (finalAnswerStr === answer) {
                setModalTitle("恭喜答對!");
                setShowModal(true);
                handleNextQuestion();
            } else {
                setModalTitle("答錯!");
                setShowModal(true);
                setFinalAnswer(Array(problem.english.length).fill(""));
            }
        }
        return;
    }

    function handleHintClick() {
        const index = finalAnswer.findIndex((answer) => answer === "");
        if (index !== -1) {
            const newAnswerArray = [...finalAnswer];
            newAnswerArray[index] = answer[index];
            setFinalAnswer(newAnswerArray);
        }
    }
    // 下一題
    function handleNextQuestion() {
        let newProblem = getRandom();
        // 若跟上一題一樣的話就再隨機取
        while (newProblem === problem) {
            newProblem = getRandom();
        }
        setProblem(newProblem);
        setAnswer(newProblem.english);
        setFinalAnswer(Array(newProblem.english.length).fill(""));
    }

    const handleFocus = () => {
        if (sectionRef.current) {
            sectionRef.current.classList.add("focused");
        }
    };

    const handleBlur = () => {
        if (sectionRef.current) {
            sectionRef.current.classList.remove("focused");
        }
    };

    useEffect(() => {
        if (englishList) {
            const initialProblem = getRandom();
            setProblem(initialProblem);
            setAnswer(initialProblem.english);
            setFinalAnswer(Array(initialProblem.english.length).fill(""));

            // 進入頁面時，focus在section
            if (sectionRef.current) {
                sectionRef.current.focus();
            }
        }
    }, []);
    return (
        <>
            <Modal
                openModal={showModal}
                closeModal={() => setShowModal(false)}
                showCancelButton={false}
                modalTitle={modalTitle}
            />
            {isAuth ? (
                englishList ? (
                    <section className="test">
                        <div className="top">
                            <button onClick={handleHintClick}>提示一字</button>
                            <button onClick={handleNextQuestion}>下一題</button>
                        </div>
                        <div
                            className="test-zone"
                            ref={sectionRef}
                            onKeyDown={showModal ? "" : handleKeyDown}
                            onClick={() => inputRef.current.focus()}
                            tabIndex={0}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                        >
                            <input
                                type="text"
                                ref={inputRef}
                                style={{
                                    opacity: 0,
                                    position: "absolute",
                                    zIndex: -1,
                                }}
                                onKeyDown={handleKeyDown}
                            />
                            <div className="problem">
                                <h2>{problem.chinese}</h2>
                            </div>
                            <div className="answers">
                                {finalAnswer.map((v, i) => {
                                    return <h1 key={i}>{v}</h1>;
                                })}
                            </div>
                        </div>
                    </section>
                ) : (
                    <h1>尚無加入之單字</h1>
                )
            ) : (
                <h1>請先登入</h1>
            )}
            {}
        </>
    );
}
