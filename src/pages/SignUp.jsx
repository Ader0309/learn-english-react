import MemberForm from "../components/MemberForm";

export default function SignUp() {
    return (
        <section className="sign-up">
            <MemberForm buttonTitle="註冊" apiName="signup" />
        </section>
    );
}
