import { Outlet, useLocation } from "react-router-dom";
import Auth from "../components/Auth";

export default function MemberLayout() {
    const location = useLocation();
    let title = "";
    switch (location.pathname) {
        case "/member/signup":
            title = "會員註冊";
            break;
        case "/member/login":
            title = "會員登入";
            break;
        default:
            title = "無此頁面";
            break;
    }
    return (
        <>
            <header>
                <Auth />
                <h1>{title}</h1>
            </header>
            <Outlet />
        </>
    );
}
