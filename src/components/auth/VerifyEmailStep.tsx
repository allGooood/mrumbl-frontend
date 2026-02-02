import React, { useEffect, useState } from 'react';
import { Step } from '../Step';
import TextInput from '../atom/TextInput';
import { useLoginForm } from '../../hooks/useLoginForm';
import { useAuthActions } from '../../api/authService';
import { formatTimer } from '../../utils/timerFormatter';
import { getErrorMessage } from '../../utils/errorHandler';

interface VerifyEmailStepProps {
    onNext: () => void;
}

const VerifyEmailStep: React.FC<VerifyEmailStepProps> = ({
    onNext,
}) => {
    const {formData, updateField} = useLoginForm();
    const { sendSecurityCode, verifySecurityCode, signup } = useAuthActions();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [securityCode, setSecurityCode] = useState('');
    const [count, setCount] = useState(formData.securityCodeTtl || 0);

    useEffect(() => {      
        const job = setInterval(() => {
            setCount((prevCount) => prevCount - 1);
        }, 1000);

        if(count === 0){
            clearInterval(job);
        }
        return () => clearInterval(job);
    }, [count]);

    const handleSubmit = async() => {
        setError('');
        setLoading(true);

        try{
            await verifySecurityCode({email: formData.email, verificationCode: securityCode});
            await signup({email: formData.email, password: formData.password || '', name: formData.name || ''})
            onNext();
        } catch (err: unknown) {
            setError(getErrorMessage(err, 'Failed to verify code. Please try again.'));
        } finally {
            setLoading(false);
        }
    };

    const handleResendCode = async() => {
        if (count > 0) {
            return;
        }

        setError('');
        setLoading(true);

        try {
            const data = await sendSecurityCode(formData.email);
            // 타이머 리셋
            const newTtl = data.ttlSeconds;
            setCount(newTtl);
            updateField('securityCodeTtl', newTtl);
        } catch (err: unknown) {
            setError(getErrorMessage(err, 'Failed to resend code. Please try again.'));
        } finally {
            setLoading(false);
        }
    };


    const bodyContent = (
        <>
            <TextInput
                label="Enter security code"
                type="text"
                value={securityCode}
                onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, ''); // 숫자만 허용
                    setSecurityCode(value);
                    setError(''); // 입력 시 에러 메시지 제거
                }}
                placeholder="000000"
                maxLength={6}
                inputMode="numeric"
                pattern="[0-9]*"
                required
                className="text-center text-2xl tracking-widest font-semibold"
                autoFocus
            />
            
            <div className="mt-4 flex flex-col items-center gap-2">
                {count > 0 ? (
                    <div className="text-sm text-gray-600">
                        Didn't receive the code? Resend in{' '}
                        <span className="font-semibold text-gray-900">{formatTimer(count)}</span>
                    </div>
                ) : (
                    <div className="text-sm text-gray-600">
                        Didn't receive the code?{' '}
                        <a 
                            className="text-blue-700 cursor-pointer font-semibold hover:text-blue-800 underline" 
                            onClick={handleResendCode}
                        >
                            Resend code
                        </a>
                    </div>
                )}
            </div>
        </>
    );
    
    return (
        <Step
            title="Verify email address"
            heading={`To verify your email, we've sent a One Time Password (OTP) to ${formData.email}`}
            body={bodyContent}
            actionLabel="Verify"
            loading={loading}
            onSubmit={handleSubmit}
            error={error}
        />
    );
};

export default VerifyEmailStep;