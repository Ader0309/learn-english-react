import { useEffect, useRef } from "react";

export default function Modal({
    modalTitle,
    openModal,
    closeModal,
    showCancelButton,
}) {
    const modalRef = useRef();
    useEffect(() => {
        if (openModal) {
            modalRef.current.showModal();
        } else {
            modalRef.current.close();
        }
    }, [openModal]);
    return (
        <>
            <dialog className="modal" ref={modalRef} onCancel={closeModal}>
                <h2>{modalTitle}</h2>
                {!showCancelButton && (
                    <button onClick={closeModal}>確定</button>
                )}
                {showCancelButton && <button>刪除</button>}
                {showCancelButton && <button onClick={closeModal}>取消</button>}
            </dialog>
        </>
    );
}
