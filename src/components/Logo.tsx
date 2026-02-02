import React from 'react';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link to="/" className="bg-brand-primary inline-flex items-center justify-center">
      <h1 className="text-2xl font-bold text-black">Mrumbl</h1>
    </Link>
  );
};

export default Logo;