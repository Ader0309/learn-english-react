import MemberForm from "../components/MemberForm";
export default function Login() {
    return (
        <>
            <div className="login">
                <MemberForm buttonTitle="登入" apiName="login" />
            </div>
            <h5>測試用信箱:test@test.com</h5>
            <h5>測試用暱稱:測試帳號1</h5>
        </>
    );
}
