import React, { useState } from 'react';
import { useAuthActions } from '../api/authService';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { signin } = useAuthActions();
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setError('');
        setLoading(true);

        try{
            await signin({ email, password });
            navigate('/');

        } catch(error: any){
            const errorMessage = error.response?.data?.message || error.message || '로그인 중 오류가 발생했습니다.';
            setError(errorMessage);

        } finally {
          setLoading(false);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="이메일"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="비밀번호"
                    required
                />
                <button type="submit" disabled={loading}>
                    {loading ? '로그인 중...' : '로그인'}
                </button>
                {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
            </form>
        </>
    );
};

export default Login;