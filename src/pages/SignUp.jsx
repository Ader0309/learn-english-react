import MemberForm from "../components/MemberForm";

export default function SignUp() {
    return (
        <div className="sign-up">
            <MemberForm buttonTitle="註冊" apiName="signup" />
        </div>
    );
}
