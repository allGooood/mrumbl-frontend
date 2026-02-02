import { useCallback } from "react";
import Button from "./atom/Button";
import Logo from "./Logo";

interface StepProps {
    loading?: boolean;
    title?: string;
    heading?: string;
    body?: React.ReactElement;
    actionLabel: string;
    disabled?: boolean;
    onSubmit?: (e: React.FormEvent) => void;
    error?: string;
}

export const Step: React.FC<StepProps> = ({
    loading,
    title,
    heading,
    body,
    actionLabel,
    disabled,
    onSubmit,
    error,
}) => {

    const handleSubmit = useCallback((e: React.FormEvent) => {
        e.preventDefault();
        if (onSubmit) {
            onSubmit(e);
        }
    }, [onSubmit]);

    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-brand-primary px-4">
                <div className="w-full max-w-md bg-white rounded-2xl shadow-md px-8 py-10">
                    {/* Title */}
                    <h1 className="text-3xl font-bold text-center mb-4">{title}</h1>
                    
                    {/* Heading */}
                    <p className="text-center text-gray-600 mb-8 text-sm">{heading}</p>
                    
                    {/* Body */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {body}
                        {error && (
                            <div className="text-sm text-red-600 mt-2">
                                {error}
                            </div>
                        )}

                        <div className="pt-4">
                            <Button
                            type="submit"
                            disabled={loading || disabled}
                            className="w-full justify-center"
                            >
                            {loading ? 'Progressing...' : actionLabel}
                            </Button>
                        </div>

                        {/* Footer */}
                        <hr className="gray my-10" />
                        <div className="flex flex-col items-center text-center gap-5">
                            <span className="text-gray-500 italic text-sm">
                            By proceeding you agree to our Terms and Conditions and confirm you have read and understand our Privacy policy
                            </span>
                            <Logo />
                        </div>
                    </form>
                    
                </div>
            </div>
        
        </>
    )
};

