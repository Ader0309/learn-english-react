import { useEffect, useState } from "react";
import Modal from "../components/Modal";
import { useSelector } from "react-redux";

export default function Test() {
    const [showModal, setShowModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [problem, setProblem] = useState({});
    const [answer, setAnswer] = useState("");
    const [finalAnswer, setFinalAnswer] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const englishList = JSON.parse(localStorage.getItem("allEnglish"));

    const isAuth = useSelector((state) => state.auth.auth);

    function getRandom() {
        return englishList[Math.floor(Math.random() * englishList.length)];
    }

    function handleInputChange(e) {
        const inputValue = e.target.value.toUpperCase();
        const lastChar = inputValue.charAt(inputValue.length - 1);

        if (lastChar && /^[A-Z]$/.test(lastChar)) {
            const newAnswerArray = [...finalAnswer];
            newAnswerArray[currentIndex] = lastChar;
            setFinalAnswer(newAnswerArray);

            if (currentIndex < finalAnswer.length - 1) {
                setCurrentIndex(currentIndex + 1);
            }
        }
    }

    function handleKeyDown(e) {
        if (e.key === "Backspace") {
            e.preventDefault();
            if (currentIndex > 0) {
                const newAnswerArray = [...finalAnswer];
                newAnswerArray[currentIndex - 1] = "";
                setFinalAnswer(newAnswerArray);
                setCurrentIndex(currentIndex - 1);
            }
        } else if (e.key === "Enter") {
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
                setCurrentIndex(0);
            }
        }
    }

    function handleHintClick() {
        const index = finalAnswer.findIndex((answer) => answer === "");
        if (index !== -1) {
            const newAnswerArray = [...finalAnswer];
            newAnswerArray[index] = answer[index];
            setFinalAnswer(newAnswerArray);
            setCurrentIndex(index + 1);
        }
    }

    function handleNextQuestion() {
        let newProblem = getRandom();
        while (newProblem === problem) {
            newProblem = getRandom();
        }
        setProblem(newProblem);
        setAnswer(newProblem.english);
        setFinalAnswer(Array(newProblem.english.length).fill(""));
        setCurrentIndex(0);
    }

    useEffect(() => {
        if (englishList) {
            const initialProblem = getRandom();
            setProblem(initialProblem);
            setAnswer(initialProblem.english);
            setFinalAnswer(Array(initialProblem.english.length).fill(""));
            setCurrentIndex(0);
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
                        <div className="test-zone">
                            <div className="problem">
                                <h2>{problem.chinese}</h2>
                            </div>
                            <div className="answers">
                                {finalAnswer.map((v, i) => {
                                    return (
                                        <h1
                                            key={i}
                                            className={
                                                i === currentIndex
                                                    ? "current"
                                                    : ""
                                            }
                                        >
                                            {v}
                                        </h1>
                                    );
                                })}
                            </div>
                            <input
                                type="text"
                                value=""
                                onChange={handleInputChange}
                                onKeyDown={handleKeyDown}
                                autoFocus
                                style={{
                                    opacity: 0,
                                    position: "absolute",
                                    zIndex: -1,
                                }}
                            />
                        </div>
                    </section>
                ) : (
                    <h1>尚無加入之單字</h1>
                )
            ) : (
                <h1>請先登入</h1>
            )}
        </>
    );
}
