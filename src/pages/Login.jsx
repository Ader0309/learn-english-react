import MemberForm from "../components/MemberForm";
export default function Login() {
    return (
        <>
            <section className="login">
                <MemberForm buttonTitle="登入" apiName="login" />
            </section>
        </>
    );
}
