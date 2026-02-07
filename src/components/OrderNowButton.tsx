import React from 'react';
import Button from './atom/Button';
import { useNavigate } from 'react-router-dom';

export const OrderNowButton = () => {
    const navigate = useNavigate();

    const handleOrderButton = () => {
        navigate('/order');
    };

    return (
        <Button onClick={handleOrderButton}>
            <span>Order Now</span>
        </Button>
    );
};

