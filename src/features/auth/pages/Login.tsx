import { useState } from 'react';
import { LoginFormProvider } from '../context/LoginFormProvider';
import AccountCheckStep from '../../../components/features/auth/AccountCheckStep';
import ProceedStep from '../../../components/features/auth/ProceedStep';
import CreateAccountStep from '../../../components/features/auth/CreateAccountStep';
import VerifyEmailStep from '../../../components/features/auth/VerifyEmailStep';
import SignUpCompleteStep from '../../../components/features/auth/SignUpCompleteStep';
import SignInStep from '../../../components/features/auth/SignInStep';

const STEPS = {
    ACCOUNT_CHECK: 0,
    PROCEED: 1,
    CREATE_ACCOUNT: 2,
    VERIFY_EMAIL: 3,
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

    switch (step) {
        case STEPS.ACCOUNT_CHECK:
            return <AccountCheckStep onNext={onNext} onAccountExists={onAccountExists} />;
        case STEPS.PROCEED:
            return <ProceedStep onNext={onNext} />;
        case STEPS.CREATE_ACCOUNT:
            return <CreateAccountStep onNext={onNext}/>;
        case STEPS.VERIFY_EMAIL:
            return <VerifyEmailStep onNext={onNext}/>;
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
