import { useState } from 'react';
import { LoginFormProvider } from '../context/LoginFormProvider';
import AccountCheckStep from '../components/auth/AccountCheckStep';
import ProceedStep from '../components/auth/ProceedStep';
import CreateAccountStep from '../components/auth/CreateAccountStep';
import VerifyEmailStep from '../components/auth/VerifyEmailStep';
import SignUpCompleteStep from '../components/auth/SignUpCompleteStep';
import SignInStep from '../components/auth/SignInStep';

const STEPS = {
    ACCOUNT_CHECK: 0,
    PROCEED: 1,
    CREATE_ACCOUNT: 2,
    VERIFY_EMAIL: 3,
    // ADD_MOBILE: 4,
    SIGN_UP_COMPLETE: 4,

    SIGN_IN: -1,
};

const LoginContent = () => {
    const [step, setStep] = useState<number>(STEPS.ACCOUNT_CHECK);

    const onNext = () => {
        setStep((value) => value + 1);
    };

    const onAccountExists = () => {
        setStep(STEPS.SIGN_IN);
    };

    // Step에 따라 다른 컴포넌트 렌더링
    switch (step) {
        case STEPS.ACCOUNT_CHECK:
            return <AccountCheckStep onNext={onNext} onAccountExists={onAccountExists} />;
        case STEPS.PROCEED:
            return <ProceedStep onNext={onNext} />;
        case STEPS.CREATE_ACCOUNT:
            return <CreateAccountStep onNext={onNext}/>;
        case STEPS.VERIFY_EMAIL:
            return <VerifyEmailStep onNext={onNext}/>;
        // case STEPS.ADD_MOBILE:
        //     return <div>Add Mobile Step (Coming soon)</div>;
        case STEPS.SIGN_UP_COMPLETE:
            return <SignUpCompleteStep />;
        case STEPS.SIGN_IN:
            return <SignInStep />;
        default:
            return <AccountCheckStep onNext={onNext} onAccountExists={onAccountExists} />;
    }
};

const Login = () => {
    return (
        <LoginFormProvider>
            <LoginContent />
        </LoginFormProvider>
    );
};

export default Login;