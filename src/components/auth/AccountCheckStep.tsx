import React, { useState } from 'react';
import { Step } from '../Step';
import TextInput from '../atom/TextInput';
import { useUserService } from '../../api/userService';
import { useLoginForm } from '../../hooks/useLoginForm';
import { getErrorMessage } from '../../utils/errorHandler';

interface AccountCheckStepProps {
  onNext: () => void;
  onAccountExists: () => void;
}

const AccountCheckStep: React.FC<AccountCheckStepProps> = ({ onNext, onAccountExists }) => {
  const { formData, updateField } = useLoginForm();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { isAvailableEmail } = useUserService();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await isAvailableEmail(formData.email);
      
      // API가 true를 반환하면 이메일이 사용 가능 (계정 없음) -> 회원가입 플로우
      // API가 false를 반환하면 이메일이 사용 불가능 (계정 존재) -> 로그인 플로우
      if (response === true) {
        onNext();
      } else {
        // 계정이 존재하는 경우 로그인 플로우로 이동
        onAccountExists();
      }
    } catch (err: unknown) {
      setError(getErrorMessage(err, 'Something went wrong.'));
    } finally {
      setLoading(false);
    }
  };

  const bodyContent = (
    <>
      <TextInput
          label="Enter your email"
          type="email"
          value={formData.email}
          onChange={(e) => updateField('email', e.target.value)}
          placeholder="Mrumbl@gmail.com"
          required
      />
    </>
  );

  return (
    <Step
      title="Sign in or create account"
      body={bodyContent}
      actionLabel="Continue"
      loading={loading}
      onSubmit={handleSubmit}
      error={error}
    />
  );
};

export default AccountCheckStep;