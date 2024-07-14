import { useState } from "react";
import Modal from "./Modal";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store";
import { useNavigate } from "react-router-dom";
const path = "https://us-central1-learn-english-abf46.cloudfunctions.net/api";

export default function MemberForm({ buttonTitle, apiName }) {
    const [memberData, setMemberData] = useState({ email: "", name: "" });
    const [showModal, setShowModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");

    const navigate = useNavigate();
    const isAuth = useSelector((state) => state.auth.auth);

    const dispatch = useDispatch();
    function handleLogin(userData) {
        dispatch(authActions.login(userData));
        setTimeout(() => {
            navigate(`/`);
        }, 2000);
    }

    function handleMemberChange(e) {
        setMemberData({ ...memberData, [e.target.name]: e.target.value });
    }

    const fetchApi = async () => {
        const response = await fetch(`${path}/api/member/${apiName}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(memberData),
        }).then((res) => res.json());
        if (response.status === "success") {
            setModalTitle(response.message);
            setShowModal(true);
            if (apiName === "login") {
                localStorage.setItem("isAuth", JSON.stringify(memberData));
                handleLogin(memberData);
            }
            if (apiName === "signup") {
                setTimeout(() => {
                    navigate("/member/login");
                }, 2000);
            }
        } else {
            setModalTitle(response.message);
            setShowModal(true);
        }
    };

    function handleSubmit(e) {
        e.preventDefault();
        fetchApi();
    }
    return (
        <>
            <Modal
                openModal={showModal}
                closeModal={() => setShowModal(false)}
                showCancelButton={false}
                modalTitle={modalTitle}
            />
            {!isAuth && (
                <form onSubmit={handleSubmit} className="member-form">
                    <input
                        type="text"
                        name="email"
                        placeholder="請輸入電子信箱"
                        onChange={handleMemberChange}
                    />
                    <input
                        type="text"
                        name="name"
                        placeholder="請輸入暱稱"
                        onChange={handleMemberChange}
                    />
                    <button>{buttonTitle}</button>
                </form>
            )}
        </>
    );
}
