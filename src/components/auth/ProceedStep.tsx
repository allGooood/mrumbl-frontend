import React from 'react';
import { Step } from '../Step';
import { useLoginForm } from '../../hooks/useLoginForm';

interface ProceedStepProps {
    onNext?: () => void;
}

const ProceedStep: React.FC<ProceedStepProps> = ({ onNext }) => {
    const { formData } = useLoginForm();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onNext?.();
    };

    const bodyContent = (
        <div className="text-center">
            <p className="text-xl underline">{formData.email}</p>
            {/* <p>Let&apos;s create an account using your email!</p> */}
        </div>
    );

    return (
        <Step
            title="Looks like you&apos;re new to Mrumbl!"
            heading="Let's create an account using your email"
            body={bodyContent}
            actionLabel="Proceed to create an account"
            onSubmit={(handleSubmit)}
        />
    );
};

export default ProceedStep;