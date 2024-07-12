import MemberForm from "../components/MemberForm";
export default function Login() {
    return (
        <>
            <div className="login">
                <MemberForm buttonTitle="登入" apiName="login" />
            </div>
        </>
    );
}
