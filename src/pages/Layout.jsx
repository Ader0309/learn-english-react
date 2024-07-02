import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header";

export default function Layout() {
    const location = useLocation();
    let title = "";
    switch (location.pathname) {
        case "/":
            title = "單字列表";
            break;
        case "/important":
            title = "收藏單字";
            break;
        case "/test":
            title = "隨機測驗";
            break;
        default:
            title = "無此頁面";
            break;
    }
    return (
        <>
            <Header title={title} />
            <Outlet />
        </>
    );
}
