import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store";
import { useEffect, useState } from "react";
import Modal from "./Modal";
export default function Auth() {
    const [showModal, setShowModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");

    const isAuth = useSelector((state) => state.auth.auth);
    const authName = useSelector((state) => state.auth.name);
    const dispatch = useDispatch();
    function handleLogout() {
        setModalTitle("登出成功");
        setShowModal(true);
        localStorage.clear();
        dispatch(authActions.logout());
    }
    useEffect(() => {
        const isAuthLocalStorage = localStorage.getItem("isAuth");
        if (isAuthLocalStorage) {
            try {
                const authData = JSON.parse(isAuthLocalStorage);
                if (authData.name && authData.email) {
                    dispatch(authActions.login(authData));
                }
            } catch (error) {
                console.error("error");
                localStorage.removeItem("isAuth");
            }
        }
    }, [dispatch]);
    return (
        <>
            <div className="auth">
                {isAuth ? (
                    <div>
                        <Link to="/">
                            <span>{authName}</span>
                        </Link>
                        <button onClick={() => handleLogout()}>登出</button>
                    </div>
                ) : (
                    <div>
                        <Link to="/member/signup">
                            <button>註冊</button>
                        </Link>
                        <Link to="/member/login">
                            <button>登入</button>
                        </Link>
                    </div>
                )}
            </div>
            <Modal
                openModal={showModal}
                closeModal={() => setShowModal(false)}
                showCancelButton={false}
                modalTitle={modalTitle}
            />
        </>
    );
}
