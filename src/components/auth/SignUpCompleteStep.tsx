import React from 'react';
import { Step } from '../Step';
import { useLoginForm } from '../../hooks/useLoginForm';
import { useNavigate } from 'react-router-dom';

const SignUpCompleteStep = () => {
    const { formData } = useLoginForm();
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        navigate('/');
    };

    const bodyContent = (
        <div className="text-center space-y-6">
            {/* Success Icon */}
            <div className="flex justify-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <svg 
                        className="w-8 h-8 text-green-600" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                    >
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M5 13l4 4L19 7" 
                        />
                    </svg>
                </div>
            </div>

            {/* Success Message */}
            <div className="space-y-2">
                <h2 className="text-2xl font-semibold text-gray-900">
                    Welcome to Mrumbl!
                </h2>
                <p className="text-gray-600">
                    Your account has been successfully created.
                </p>
            </div>

            {/* User Info */}
            <div className="pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-500 mb-2">Account Details</p>
                <div className="space-y-1">
                    <p className="text-gray-700">
                        <span className="font-medium">Email:</span> {formData.email}
                    </p>
                    {formData.name && (
                        <p className="text-gray-700">
                            <span className="font-medium">Name:</span> {formData.name}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );

    return (
        <Step
            title="Account Created Successfully"
            heading="You're all set! Start exploring Mrumbl now."
            body={bodyContent}
            actionLabel="Get Started"
            onSubmit={handleSubmit}
        />
    );
};

export default SignUpCompleteStep;
