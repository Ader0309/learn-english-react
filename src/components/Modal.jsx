import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function Modal({
    modalTitle,
    openModal,
    closeModal,
    showCancelButton,
    searchChinese = "",
}) {
    const modalRef = useRef();
    useEffect(() => {
        if (openModal) {
            modalRef.current.showModal();
        } else {
            modalRef.current.close();
        }
    }, [openModal]);
    return createPortal(
        <dialog
            className={`modal ${searchChinese === "" ? "" : "search"}`}
            ref={modalRef}
            onCancel={closeModal}
        >
            <h2>{modalTitle}</h2>
            <hr />
            <h3>{searchChinese}</h3>
            {!showCancelButton && <button onClick={closeModal}>確定</button>}
            {showCancelButton && <button>刪除</button>}
            {showCancelButton && <button onClick={closeModal}>取消</button>}
        </dialog>,
        document.getElementById("modal")
    );
}
