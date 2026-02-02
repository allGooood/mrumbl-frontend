import { useState, useMemo } from "react";
import { Step } from "../Step";
import TextInput from "../atom/TextInput";
import { useLoginForm } from "../../hooks/useLoginForm";
import { useAuthActions } from "../../api/authService";
import { getErrorMessage } from "../../utils/errorHandler";

interface CreateAccountStepProps {
    onNext: () => void;
}

interface PasswordRequirement {
    label: string;
    isValid: boolean;
}

const CreateAccountStep: React.FC<CreateAccountStepProps> = ({ onNext }) => {
    const { formData, updateField } = useLoginForm();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { sendSecurityCode } = useAuthActions();

    // 비밀번호 정책 검증
    const passwordRequirements: PasswordRequirement[] = useMemo(() => {
        const password = formData.password || '';
        return [
            {
                label: '8 characters or more',
                isValid: password.length >= 8,
            },
            {
                label: 'At least 1 uppercase letter',
                isValid: /[A-Z]/.test(password),
            },
            {
                label: 'At least 1 special character',
                isValid: /[!@#$%^&*(),.?":{}|<>]/.test(password),
            },
        ];
    }, [formData.password]);

    // 비밀번호 일치 확인
    const passwordsMatch = useMemo(() => {
        return formData.password === formData.confirmPassword && formData.password !== '';
    }, [formData.password, formData.confirmPassword]);

    // 모든 조건 만족 여부
    const isPasswordValid = useMemo(() => {
        return passwordRequirements.every(req => req.isValid) && passwordsMatch;
    }, [passwordRequirements, passwordsMatch]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setError('');
        setLoading(true);

        if (!isPasswordValid) {
            setError('Please satisfy all password policies.');
            setLoading(false);
            return;
        }

        try{
            const data = await sendSecurityCode(formData.email);
            updateField('securityCodeTtl', data.ttlSeconds);
            onNext();

        } catch (err: unknown) {
            setError(getErrorMessage(err, 'Something went wrong.'));
        } finally {
            setLoading(false);
        }

    };

    const bodyContent = (
        <>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <p className="w-full rounded-xl bg-gray-50 px-4 py-3 text-sm text-gray-700">
                    {formData.email || ''}
                </p>
            </div>
            <TextInput
                label="Your name"
                type="text"
                value={formData.name || ''}
                onChange={(e) => updateField('name', e.target.value)}
                placeholder="Jane Doe"
                required
            />
            <div>
                <TextInput
                    label="Password"
                    type="password"
                    value={formData.password || ''}
                    onChange={(e) => updateField('password', e.target.value)}
                    placeholder="Enter your password"
                    required
                />
                {/* 비밀번호 정책 표시 */}
                {formData.password && (
                    <div className="mt-2 space-y-1">
                        {passwordRequirements.map((req, index) => (
                            <div key={index} className="flex items-center gap-2 text-xs">
                                <span className={req.isValid ? 'text-green-600' : 'text-gray-400'}>
                                    {req.isValid ? '✓' : '○'}
                                </span>
                                <span className={req.isValid ? 'text-green-600' : 'text-gray-500'}>
                                    {req.label}
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div>
                <TextInput
                    label="Re-enter password"
                    type="password"
                    value={formData.confirmPassword || ''}
                    onChange={(e) => updateField('confirmPassword', e.target.value)}
                    placeholder="Enter your password"
                    required
                />
                {/* 비밀번호 일치 확인 */}
                {formData.confirmPassword && (
                    <div className="mt-2 flex items-center gap-2 text-xs">
                        <span className={passwordsMatch ? 'text-green-600' : 'text-red-600'}>
                            {passwordsMatch ? '✓' : '○'}
                        </span>
                        <span className={passwordsMatch ? 'text-green-600' : 'text-red-600'}>
                            {passwordsMatch ? 'Passwords match' : 'Passwords do not match'}
                        </span>
                    </div>
                )}
            </div>
        </>
    );


    return (
        <Step 
            title="Create account"
            body={bodyContent}
            actionLabel="Verify email"
            loading={loading}
            onSubmit={handleSubmit}
            error={error}
        />
    );
};

export default CreateAccountStep;