import React, { useState } from 'react';
import { Step } from '../Step';
import TextInput from '../atom/TextInput';
import { useLoginForm } from '../../hooks/useLoginForm';
import { useAuthActions } from '../../api/authService';
import { useNavigate } from 'react-router-dom';
import { getErrorMessage } from '../../utils/errorHandler';

const SignInStep: React.FC = () => {
    const { formData, updateField } = useLoginForm();
    const { signin } = useAuthActions();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setError('');
        setLoading(true);

        try {
            await signin({ email: formData.email, password: formData.password || '' });
            navigate('/');
        } catch (err: unknown) {
            setError(getErrorMessage(err, 'Login failed. Please check your email and password.'));
        } finally {
            setLoading(false);
        }
    };

    const bodyContent = (
        <>
            <TextInput
                label="Email"
                type="email"
                value={formData.email}
                onChange={(e) => updateField('email', e.target.value)}
                placeholder="Enter your email"
                required
            />
            <TextInput
                label="Password"
                type="password"
                value={formData.password || ''}
                onChange={(e) => updateField('password', e.target.value)}
                placeholder="Enter your password"
                required
            />
        </>
    );

    return (
        <Step
            title="Sign in"
            heading="Welcome back! Please sign in to your account."
            body={bodyContent}
            actionLabel="Sign in"
            loading={loading}
            onSubmit={handleSubmit}
            error={error}
        />
    );
};

export default SignInStep;
