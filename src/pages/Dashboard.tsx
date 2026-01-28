import React from 'react';
import { useAuthStore } from '../stores/useAuthStore';

const Dashboard = () => {
    const user = useAuthStore((state) => state.user);

    return (
        <>
            <h1>Dash Board</h1>
            <h3>{user?.username || user?.email || 'Guest'} 님 환영합니다!</h3>
        </>
    );
};

export default Dashboard;